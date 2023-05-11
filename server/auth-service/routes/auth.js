
const {
	Register,
	LoginUser,
	LogoutUser,
} = require("../controller/auth.controller");
const gitRouter = require("./github");
const googlRouter = require("./google");

const Router = require("express").Router;
const router = new Router();


router.post("/register", Register);

router.post("/login", LoginUser);

router.post("/logout", LogoutUser);

router.use("/google", googlRouter);

router.use("/github", gitRouter);

module.exports = router;
