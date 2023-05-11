const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mediatype: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
