const mongoose = require("mongoose");
const paginator = require("paginator");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

EmployeeSchema.plugin(paginator);
module.exports = mongoose.model("Employee", EmployeeSchema);

// deviceSchema.plugin(paginator)

// export interface DeviceDocument extends mongoose.Document, IDevice { }

// const DeviceModal = mongoose.model<DeviceDocument, mongoose.PaginateModel<DeviceDocument>>("Device", deviceSchema)

// export default DeviceModal
