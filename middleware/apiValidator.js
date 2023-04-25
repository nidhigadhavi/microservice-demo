const Joi = require("joi");
const requestValidationSchema = require("./requestSchemaValidator");

export function LoginSchemaValidator(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	});
	requestValidationSchema(schema, req, res, next);
}

export function RegisterSchemaValidator(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().trim().email().required(),
		username: Joi.string().trim().required(),
		password: Joi.string().trim().required(),
	});
	requestValidationSchema(schema, req, res, next);
}

export function AddProductSchemaValidator(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().trim().required(),
		price: Joi.string().trim().required(),
		description: Joi.string().trim().require(),
	});
	requestValidationSchema(schema, req, res, next);
}
