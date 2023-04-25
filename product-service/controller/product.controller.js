/** Functions to operate Product Data */

const { consumeFromRabbitMQ, publishToRabbitMQ } = require("../mqttWorker");
const {
	addProductService,
	getProductService,
} = require("../service/product.service");

async function addProduct(req, res) {
	console.log("into the add product");
	try {
		const { name, price, description } = req.body;
		// verify if name and price are not empty
		if (!name || !price || !description) {
			return res.status(400).json({
				message: "Please provide name, price and description",
			});
		} else {
			console.log("add productts");
			addProductService(req.body).then((product) => {
				return res.status(201).json({
					message: "Product created successfully",
					product,
				});
			});
		}
	} catch (error) {
		return res.send(error);
	}
}

async function getProduct(req, res) {
	try {
		const { productId } = req.params;
		const product = await getProductService(productId);
		return res.status(200).json({
			message: "Product fetched successfully",
			product,
		});
	} catch (error) {
		return res.send(error);
	}
}

async function buyProduct(req, res) {
	try {
		const { productIds } = req.body;
		// Get products from database with the given ids
		// const products = await Product.find({ _id: { $in: productIds } });
		const products = await getProductService(productIds);

		publishToRabbitMQ(
			"order-service-queue",
			{
				products,
				userEmail: req.user.email,
			},
			(data) => {
				console.log("subscribe order service channel", data);
			}
		);

		// // Send to RabbitMQ
		// channel.sendToQueue(
		// 	"order-service-queue",
		// 	Buffer.from(
		// 		JSON.stringify({
		// 			products,
		// 			userEmail: req.user.email,
		// 		})
		// 	)
		// );

		// Consume from RabbitMQ
		// channel.consume("product-service-queue", (data) => {
		// 	console.log("Consumed from product-service-queue");
		// 	order = JSON.parse(data.content);
		// 	channel.ack(data);
		// });

		consumeFromRabbitMQ("product-service-queue", (data) => {
			console.log(
				"order from order service to product service",
				data
			);
		});

		return res.status(201).json({
			message: "Order placed successfully",
			
		});
	} catch (error) {
		console.log("into the error in buy product", error);
		return res.status(500).json(error);
	}
}

module.exports = { addProduct, getProduct, buyProduct };
