/** Generate Generic Response */

function HttpResponseGen(res, param, status) {
	console.log("http response", param);	
	return res.status(status).json({
		data: param.data,
		message: param.message,
		status,
	});
}
