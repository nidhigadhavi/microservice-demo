/**validate the request with schema */
var Joi = require("joi");
var express = require("express");

export async function requestValidationSchema(
	schema,
	req,
	res,
	next,
	valiadationMode
) {
	try {
		console.log("went to validate the schema");
		var data = {};
		switch (valiadationMode) {
			case "body":
				data = req.body;
				break;

			case "header":
				data = req.headers;
				break;

			case "query":
				data = data.query;
				break;

			case "param":
				data = data.params;
				break;

			default:
				throw new Error("something went wrong.");
		}
		await schema.valiadateAsync(data);
        next();
	} catch (error) {
		console.log("into the catch of error", error);
		return error;
	}
}
