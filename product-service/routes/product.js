const Router = require("express").Router;
const dotenv = require("dotenv");
const router = new Router();

const auth = require("../../middleware/auth");
const {
	addProduct,
	getProduct,
	buyProduct,
} = require("../controller/product.controller");

// Create a new product
router.post("/", auth, addProduct);

// Get product details
router.get("/products", getProduct);

// Buy a product
router.post("/buy", auth, buyProduct);

module.exports = router;
