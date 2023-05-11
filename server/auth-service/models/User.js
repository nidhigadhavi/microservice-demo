const mongoose = require('mongoose');
const paginator = require('paginator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(paginator)
module.exports = mongoose.model('User', UserSchema);


// deviceSchema.plugin(paginator)

// export interface DeviceDocument extends mongoose.Document, IDevice { }

// const DeviceModal = mongoose.model<DeviceDocument, mongoose.PaginateModel<DeviceDocument>>("Device", deviceSchema)

// export default DeviceModal