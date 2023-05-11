/** controllers */

const { login, finduser, saveUser } = require("../service/employee.service");
const bcrypt = require("bcrypt");
const { sendHttpResponse, sendHttpError } = require("../helpers/HttpResponse");

async function Register(req, res, next) {
	console.log("register controller initialise !!!!!");
	try {
		const { username, password, email } = req.body;
		if (!email || !password) {
			return res.status(400).send({
				message: "Please provide email and password",
			});
		}
		const salt = await bcrypt.genSalt(Number(10));
		const hashedPassword = await bcrypt.hash(password, salt);
		let data = await saveUser({ ...req.body, password: hashedPassword });
		console.log("saved user", data);
		return sendHttpResponse({
			res,
			data: data,
			message: "Employee Saved!!",
		});
		// res.send({
		// 	status: 200,
		// 	data: data,
		// });
	} catch (error) {
		console.log("inot error", error.errors);
		// return res.sendStatus(400).json({ error: true, message: error });
		return sendHttpError({
			res,
			data: error,
			message: "Something Went Wrong!!",
		});
	}
}

async function EmployeeDetails(req, res, next) {
	console.log("register controller initialise !!!!!");
	res.send("Employeee Details");
}

async function DeleteEmployee(req, res, next) {
	console.log("register controller initialise !!!!!");
	res.send("Employeee Delete");
}

module.exports = { Register, EmployeeDetails, DeleteEmployee };
