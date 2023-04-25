/** service to operate with database */
const Product = require("../models/Product");

async function addProductService(product) {
	console.log("into the product add", product);
	try {
		return await new Product(product).save();
	} catch (error) {
		return error;
	}
}

async function deleteProductService(product) {}

async function updateProductService(product) {}

async function getProductService(ids) {
	console.log("service product", ids);
	try {
		if (ids.length) {
			return await Product.find({ _id: { $in: ids } });
		}
		return await Product.find(ids);		
	} catch (error) {
		return error;
	}
}

module.exports = {
	addProductService,
	deleteProductService,
	updateProductService,
	getProductService,
};
