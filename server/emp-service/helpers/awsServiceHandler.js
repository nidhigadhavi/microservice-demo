/**
 * Aws Service to Create New Code Base
 */

const { sendHttpError } = require("./HttpResponse");

function AWSService(params) {
	try {
		console.log("aws service handler involked!!!!!");
	} catch (error) {
		return sendHttpError(error);
	}
}
