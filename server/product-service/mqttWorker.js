/** Worker for working with mqtt events and controller */
const dotenv = require("dotenv");
const amqp = require("amqplib");
var order, channel, connection;
console.log("process is :", process.env.MQTT_URL);
// RabbitMQ connection
async function connectToRabbitMQ() {
	const amqpServer = process.env.MQTT_URL;
	connection = await amqp.connect(amqpServer);
	channel = await connection.createChannel();
	await channel.assertQueue("product-service-queue");
}

/**
 * disconnect Mqtt
 */
async function disconnectFromRabbitMQ() {
	await connection.close();
}

/** consume or subscribe data from chennel */
async function consumeFromRabbitMQ(channelname, cb) {
	console.log("into consumee rabittMQ" , channelname);
	channel.consume(channelname, (details) => {
		console.log("data>>><<<>>>><<<<>>>>><<<<<<>>>>>", details);
		data = JSON.parse(details);
		channel.ack(data);		
	});
}

/** send or call or publish data to chennel */
async function publishToRabbitMQ(channelname, dataTosend, cb) {
	console.log("send data to channel : order-service-queue" , channelname , dataTosend);
	await channel.sendToQueue(
		channelname,
		Buffer.from(JSON.stringify(dataTosend))
	);
	cb("sent data to chnnel", channelname);
}

module.exports = {
	connectToRabbitMQ,
	disconnectFromRabbitMQ,
	consumeFromRabbitMQ,
	publishToRabbitMQ,
};
