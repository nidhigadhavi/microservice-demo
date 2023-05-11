
const passport = require("passport");
const GITHUB_CLIENT_ID = "5f731f125d74ef7d80d8";
const GITHUB_CLIENT_SECRET = "7bf02b5b82b47b2f6607a4983100ee315279217a";

const Router = require("express").Router;
const gitRouter = new Router();

var userProfile;
console.log("github renders");

/*** */

/** GITHUB login */
var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: "http://localhost:3010/auth/github/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			console.log("@#@#@#@#@#@##@ into git auth stretegy!!");
			return done(null, userProfile);
		}
	)
);

gitRouter.get(
	"/",
	passport.authenticate("github", { scope: ["user:email"] })
);

gitRouter.get(
	"/callback",
	passport.authenticate("github", { failureRedirect: "/error" }),
	(req, res) => {
		console.log("into github login callback!!", req);
		res.redirect("/success" , {user: "nidhi"});
	}
);
/** */
module.exports = gitRouter;