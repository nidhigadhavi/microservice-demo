/** controllers */

const { login, finduser, saveUser } = require("../service/user.service");

async function LoginUser(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send({
				message: "Please provide email and password",
			});
		}
		const user = await login(req.body);
		console.log("user from service in login", user);
		res.send(user);
	} catch (error) {
		res.send(error);
	}
}

function GoogleLoginUser(req, res, next) {
	try {
		console.log("Facebook login");		

	} catch (error) {
		res.send(error);
	}
}

function LogoutUser(req, res, next) {
	try {
		console.log("logout controlle");
	} catch (error) {
		res.send(error);
	}
}

async function Register(req, res, next) {
	try {
		const { username, password, email } = req.body;
		if (!email || !password) {
			return res.status(400).send({
				message: "Please provide email and password",
			});
		}

		const user = await finduser("email", email);

		if (user)
			return res
				.status(400)
				.json({ error: true, message: "User already exists" });

		const salt = await bcrypt.genSalt(Number(10));
		const hashedPassword = await bcrypt.hash(password, salt);
		// await new User({ ...req.body, password: hashedPassword }).save();
		await saveUser({ ...req.body, password: hashedPassword });
		return res
			.status(201)
			.json({ error: false, message: "User created successfully" });
	} catch (error) {
		res.send(error);
	}
}

module.exports = { LoginUser, LogoutUser, Register, GoogleLoginUser };
