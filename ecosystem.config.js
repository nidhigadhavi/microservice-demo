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
	],
};
