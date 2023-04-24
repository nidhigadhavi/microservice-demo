const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginator= require("paginator");

const OrderSchema = new Schema(
  {
    user: String,
    products: [
      {
        product_id: String,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

OrderSchema.plugin(paginator)
module.exports = mongoose.model("Order", OrderSchema);
