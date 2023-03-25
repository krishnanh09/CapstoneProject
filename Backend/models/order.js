const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
product:[{productId:String, productName:String,price:String, quantity:String, category:String }]
});

module.exports = mongoose.model('Order', orderSchema);