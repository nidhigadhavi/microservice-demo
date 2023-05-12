
const {
	Register, EmployeeDetails, DeleteEmployee
} = require("../controller/employee.controller");

const Router = require("express").Router;
const router = new Router();
console.log("router employee");
router.post("/register", Register);
router.post("/detail", EmployeeDetails);
router.post("/delete", DeleteEmployee);

module.exports = router;
