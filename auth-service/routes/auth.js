const Router = require("express").Router;
const router = new Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const {
	Register,
	LoginUser,
	LogoutUser,
} = require("../controller/auth.controller");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
	"147737003183-6vsu446gtiu1lt9ru4adulaeh2hi1pj9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL:
				" https://9f3f-219-91-134-123.ngrok-free.app/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			console.log("stretegy google >>>>");
			userProfile = profile;
			return done(null, userProfile);
		}
	)
);

router.get("/", (req, res, next) => {
	// app.get("/", (req, res) => {
	let file = __dirname.split("/");
	console.log("render auth ", file);
	res.sendFile(__dirname + "../views/auth.ejs");
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

router.post("/google", passport.authenticate("google", ["profile", "email"]));

router.post("/google/callback", function (req, res, next) {
	passport.authenticate("google", { failureRedirect: "/error" }),
		function (req, res) {
			// Successful authentication, redirect success.
			res.redirect("/success");
		};
});
module.exports = router;
