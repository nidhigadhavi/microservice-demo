const express = require("express");
const passport = require("passport");
const GOOGLE_CLIENT_ID =
	"147737003183-sg690jj13ceul080g3b0eian76cr8bjr.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const Router = require("express").Router;
const googlRouter = new Router();

var userProfile;

/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:3010/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			console.log("into google stretegy!!");
			userProfile = profile;
			return done(null, userProfile);
		}
	)
);

googlRouter.get(
	"/",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

googlRouter.get(
	"/callback",
	passport.authenticate("google", { failureRedirect: "/error" }),
	function (req, res) {
		// Successful authentication, redirect success.
		console.log("into the google callback");
		res.redirect("/success", { user: res.userProfile });
	}
);


module.exports = googlRouter;
