const express = require("express");
const app = express();
const PORT = process.env.PORT || 3010;
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const {
	Register,
	LoginUser,
	LogoutUser,
} = require("./controller/auth.controller");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static("public"));

app.get("/", (req, res) => {
	console.log("get api call");
	res.sendFile(__dirname + "/index.html");
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
	"147737003183-6vsu446gtiu1lt9ru4adulaeh2hi1pj9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

//add github credentials
const GithubStrategy = require("passport-github").Strategy;
const GITHUB_CLIENT_ID = "5f731f125d74ef7d80d8";
const GITHUB_CLIENT_SECRET = "0f03f5e60154dafb4eb37bb18a9e0fee3d2f2b97";

passport.use(
	new GithubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL:
				"https://8b26-219-91-134-123.ngrok-free.app/auth/github/callback",
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log("github login successfull!!!", profile);
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL:
				"https://8b26-219-91-134-123.ngrok-free.app/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			console.log(
				"stretegy goole>>>>",
				accessToken,
				refreshToken,
				profile
			);
			userProfile = profile;
			return done(null, userProfile);
		}
	)
);

const Router = require("express").Router;
const router = new Router();
router.get("/login-page", (req, res, next) => {
	// app.get("/", (req, res) => {
	console.log("render auth ....");
	console.log("file to load auth page!!");
	console.log(__dirname + "/views/auth.ejs");
	res.render(__dirname + "/views/auth.ejs");
	// });
	// res.render("auth");
});

router.get("/success", (req, res, next) => {
	res.send(userProfile);
});

router.get("/error", (req, res, next) => {
	res.send("error in login");
});

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

router.post("/register", Register);

router.post("/login", LoginUser);

router.post("/logout", LogoutUser);

router.get("/google", () => {
	console.log("into the google get api call!!!");
	passport.authenticate("google", ["profile", "email"]);
});

router.post("/google/callback", function (req, res, next) {
	console.log("into the google callback call!!!");
	passport.authenticate("google", { failureRedirect: "/error" }),
		function (req, res) {
			// Successful authentication, redirect success.
			console.log("signin successfull");
			res.redirect("/success");
		};
});

router.get("/github", () => {
	console.log("into the github api call!!!");
	passport.authenticate("github" ,  { scope: ["user:email"] });
});

router.post("/github/callback", function (req, res, next) {
	console.log("into the github callback call!!!");
	passport.authenticate("github", { failureRedirect: "/error" }),
		function (req, res) {
			// Successful authentication, redirect success.
			console.log("signin successfull!!!!!");
			res.redirect("/success");
		};
});

app.use("/auth", router);

console.log("auth service initialized");
mongoose
	.connect("mongodb://0.0.0.0:27017/auth-service", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Auth-Service Connected to MongoDB"))
	.catch((e) => console.log(e));

app.listen(PORT, () => {
	console.log(`Auth-Service listening on port ${PORT}`);
});
