const mongoose = require('mongoose'); // Erase if already required
const paginator = require('paginator');
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },    
    products:{
        type:Array,
        required:true,
    },
});

//Export the model
orderSchema.plugin(paginator)
module.exports = mongoose.model('Order', orderSchema);