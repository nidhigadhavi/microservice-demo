module.exports = {
	apps: [
		{
			name: "order-service :3020",
			script: "nodemon ./order-service/index.js",
		},
		{
			name: "product-service :3030",
			script: "nodemon ./product-service/index.js",
		},
		{
			name: "auth-service :3010",
			script: "nodemon ./auth-service/index.js",
		},
		{
			name: "employee-service :4501",
			script: "nodemon ./employee-service/index.js",
		},
		{
			name: "project-service :4502",
			script: "nodemon ./project-service/index.js",
		},
	],
};
