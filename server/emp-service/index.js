const express = require("express");
const app = express();
const PORT = process.env.PORT || 4501;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes/employee.route");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:4200",
	})
);

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


app.use(express.static("public"));

app.get("/", (req, res) => {
	console.log("get api call");
	res.sendFile(__dirname + "/index.html");
});
app.use("/employee", router);
console.log("Employee service initialized", process.env.DB_URL);

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Auth-Service Connected to MongoDB"))
	.catch((e) => console.log(e));

app.listen(PORT, () => {
	console.log(`Auth-Service listening on port ${process.env.PORT}`);
});
