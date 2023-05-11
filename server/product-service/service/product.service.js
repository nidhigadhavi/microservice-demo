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

async function deleteProductService(product) {
	console.log("into the delete product service", product);
	try {
		return await Product.updateMany(
			{ _id: { $in: product } },
			{ $set: { isDeleted: true } }
		);
	} catch (error) {
		console.log("error in update" , error);
		return error;
	}
}

async function updateProductService(id, product) {
	try {
		return await Product.updateOne({ _id: id }, { $set: { product } });
	} catch (error) {
		return error;
	}
}

async function getProductService(ids, parameters = []) {
	console.log("service product", ids);
	try {
		if (ids) {
			if (ids.length) {
				//multiple product details
				try {
					return await Product.find({ _id: { $in: ids } });
				} catch (error) {
					throw error;
				}
			} else {
				//find one product details
				try {
					return await Product.findById(ids);
				} catch (error) {
					throw error;
				}
			}
		}
		//list products
		try {
			console.log("into the list of product@#@#@", parameters);
			let filters = { isDeleted: false };
			return await Product.paginate(filters, {
				page: parameters.page ?? 1,
				limit: parameters.limit ?? 10,
				sort: { createdAt: -1, _id: -1 },
			});
			// return await Product.find();
		} catch (error) {
			throw error;
		}
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
