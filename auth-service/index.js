const express = require("express");
const app = express();
const PORT = process.env.PORT || 3010;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const router = require("./routes/auth");
const googlRouter = require("./routes/google");
const gitRouter = require("./routes/github");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "SECRET",
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "SECRET",
	})
);

app.use(express.static("public"));

app.get("/", (req, res) => {
	console.log("get api call");
	res.sendFile(__dirname + "/index.html");
});

app.get("/login-page", (req, res, next) => {
	console.log(__dirname + "/views/auth.ejs");
	res.render(__dirname + "/views/auth.ejs");
});
app.get("/success", (req, res) => {
	res.render("views/success", { user: req.params.user });
});
app.get("/error", (req, res) => res.send("error logging in"));

app.get("/google", googlRouter);

app.get("/github", gitRouter);

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
