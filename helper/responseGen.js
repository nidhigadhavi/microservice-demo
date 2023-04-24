/** Generte Generic Response */

function HttpResponseGen(res, param, status) {
	console.log("http response", param);
	// const response = {
	//     message : param.message,
	//     status :param.status || 200,
	//     data : data
	// }
	return res.status(status).json({
		data: param.data,
		message: param.message,
		status,
	});
}
