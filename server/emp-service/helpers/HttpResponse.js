/**
 * generic http response
 */

function sendHttpResponse({ status = 200, ...data }) {
	console.log("send  http res");
	//send wrappered response
	return data.res.sendStatus(status).json({
		data: data.data,
		message: data.message,
		status,
	});
}

function sendHttpError({ status = 500, ...error }) {
	console.log("into error");
	return error.res.sendStatus(status).json({
		error: error,
		message: error.message,
		status,
	});
}

module.exports = { sendHttpResponse, sendHttpError };
