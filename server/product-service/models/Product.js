const mongoose = require("mongoose");
const paginator = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

ProductSchema.plugin(paginator);
module.exports = mongoose.model("Product", ProductSchema);
