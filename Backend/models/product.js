const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:{type:String, required:true },   
    category:{type:String, required:true },
    productPrice:{type:String, required:true },
    image:{type:String}
});

module.exports=mongoose.model('Product', productSchema);
