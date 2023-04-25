const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3030;
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("product service initialize" , process.env.DB_URL);
mongoose
.connect("mongodb://0.0.0.0:27017/product-service", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Product-Service Connected to MongoDB"))
.catch((e) => console.log(e));

app.use("/products", productRouter);

app.listen(PORT, () => {
	console.log(`Product-Service listening on port ${PORT}`);
});
