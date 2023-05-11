/** service to save the user and get user's details */

const bcrypt = require("bcrypt");
const User = require("../models/Project");
const jwt = require("jsonwebtoken");

async function finduser(findBy, identifier) {
	console.log("into service", findBy , identifier);
	try {
		const user = await User.findOne({ [findBy]: identifier });
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	} catch (error) {
		return error;
	}
}

async function login(user) {
	console.log("into user service::: ", user);
	try {
		const userdata = await User.findOne({ email: user.email });
		if (!userdata) {
			throw new Error("User not found");
		}
		const isValidPassword = await bcrypt.compare(
			user.password,
			userdata.password
		);

		if (!isValidPassword)
			return { error: true, message: "Invalid password", status: 400 };
		// create token
		const payload = {
			email: userdata.email,
			username: userdata.username,
		};
		console.log("login payload::", payload);

		const token = jwt.sign(payload, "secret", { expiresIn: "1h" });
		return {
			message: "User logged in",
			token: token,
		};
	} catch (error) {
		return { error: true, data: error };
	}
}

async function saveUser(user) {
	try {
		const newUser = await User.create(user);
		return newUser;
	} catch (error) {
		return error;
	}
}

module.exports = { login, saveUser, finduser };
