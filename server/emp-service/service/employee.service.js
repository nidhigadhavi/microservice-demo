/** service to save the user and get user's details */

const bcrypt = require("bcrypt");
const User = require("../models/Employee");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

async function saveUser(user) {
	try {
		const newUser = await Employee.create(user);
		return newUser;
	} catch (error) {
		console.log("error in the save", error);
		return error;
	}
}

async function editUser(params) {
	try {
		const updatedUser = await Employee.updateOne(params);
		return updatedUser;
	} catch (error) {
		console.log("Error in edit user!!", error);
		return error;
	}
}

module.exports = { saveUser };
