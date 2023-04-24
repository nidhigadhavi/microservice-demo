const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const amqp = require("amqplib");
const Order = require("./models/Order");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var channel, connection;

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Order-Service Connected to MongoDB"))
	.catch((e) => console.log(e));

// RabbitMQ connection
async function connectToRabbitMQ() {
	const amqpServer = process.env.MQTT_URL;
	connection = await amqp.connect(amqpServer);
	channel = await connection.createChannel();
	console.log("channel create channel : order-service-queue");
	await channel.assertQueue("order-service-queue");
}

createOrder = (products, userEmail) => {
	console.log("intot the create order");
	let total = 0;
	products.forEach((product) => {
		total += product.price;
	});

	const order = new Order({
		user: userEmail,
		products,
		total,
	});
	order.save();
	return order;
};
console.log("Order service");
connectToRabbitMQ().then(() => {
	console.log("into the connect rabbitMQ Order Service ::");
	channel.consume("order-service-queue", (data) => {
		console.log("inot order service consume", data);
		// order service queue listens to this queue
		const { products, userEmail } = JSON.parse(data.content);
		const newOrder = createOrder(products, userEmail);
		channel.ack(data);
		console.log("into the create order ACK::::");
		channel.sendToQueue(
			"product-service-queue",
			Buffer.from(JSON.stringify(newOrder))
		);
	});
});

app.listen(PORT, () => {
	console.log(`Order-Service listening on port ${PORT}`);
});
