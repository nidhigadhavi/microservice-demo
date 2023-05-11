/** Functions to operate Product Data */

const { consumeFromRabbitMQ, publishToRabbitMQ } = require("../mqttWorker");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const amqp = require("amqplib");
const {
	addProductService,
	getProductService,
	deleteProductService,
} = require("../service/product.service");

var order, channel, connection;
let MQTT_URL =
	"amqps://kydjgoop:36uhKqPFFNPhrQnyNHKycEuw5DKe4GYd@shrimp.rmq.cloudamqp.com/kydjgoop";

// RabbitMQ connection
async function connectToRabbitMQ() {
	const amqpServer = MQTT_URL;
	connection = await amqp.connect(amqpServer);
	channel = await connection.createChannel();
	await channel.assertQueue("product-service-queue");
}

connectToRabbitMQ();

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

async function removeProduct(req, res) {
	try {
		const { productId } = req.body;
		let d = productId.map((val) => mongoose.Types.ObjectId(val));
		console.log("product to delete", d);
		try {
			let dd = await deleteProductService(d);
			return res.status(200).json({
				message: "Product deleted successfully",
				dd,
			});
		} catch (error) {
			console.log("inot error 1:", error);
			throw error;
		}
	} catch (error) {
		console.log("error 2", error);
		return error;
	}
}

async function getProduct(req, res) {
	console.log("into get porduct");
	try {
		const { productId } = req.params;
		const { page, limit } = req.query;
		console.log("get product detail", productId, req.query);
		const product = await getProductService(productId, req.query || {});

		return res.status(200).json({
			message: "Product fetched successfully",
			product,
		});
	} catch (error) {
		console.log("error", error);
		return res.send(error);
	}
}

async function buyProduct(req, res) {
	try {
		const { productIds } = req.body;
		// Get products from database with the given ids
		// const products = await Product.find({ _id: { $in: productIds } });
		const products = await getProductService(productIds);

		// publishToRabbitMQ(
		// 	"order-service-queue",
		// 	{
		// 		products,
		// 		userEmail: req.user.email,
		// 	},
		// 	(data) => {
		// 		console.log(">>>>subscribe order service channel<<<<", data);
		// 	}
		// );

		// Send to RabbitMQ
		await channel.sendToQueue(
			"order-service-queue",
			Buffer.from(
				JSON.stringify({
					products,
					userEmail: req.user.email,
				})
			)
		);

		// Consume from RabbitMQ
		await channel.consume("product-service-queue", (data) => {
			console.log("Consumed from product-service-queue");
			order = JSON.parse(data.content);
			channel.ack(data);
		});

		// consumeFromRabbitMQ("product-service-queue", (data) => {
		// 	console.log(
		// 		"order from order service to product service",
		// 		data
		// 	);
		// });

		return res.status(201).json({
			order: order,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.log("into the error in buy product", error);
		return res.status(500).json(error);
	}
}

module.exports = { addProduct, getProduct, buyProduct, removeProduct };
