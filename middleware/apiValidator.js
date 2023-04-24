import Joi from "joi";

const joi = require("joi");
const Express = require("express");
const requestValidationSchema = require("./requestSchemaValidator");

export const LoginSchemaValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	});
	requestValidationSchema(schema, req, res, next);
};

export const RegisterSchemaValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().trim().email().required(),
		username: Joi.string().trim().required(),
		password: Joi.string().trim().required(),
	});
	requestValidationSchema(schema, req, res, next);
};

export const AddProductSchemaValidator = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().trim().required(),
		price: Joi.string().trim().required(),
		description: Joi.string().trim().require(),
	});
	requestValidationSchema(schema, req, res, next);
};
