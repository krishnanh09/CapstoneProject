const express = require('express');
const Product = require('../models/product');
// const verifyAuth = require('../middleware/verify-auth');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};

router.post("",  (req, res, next) => {
    const product = new Product({
        productName: req.body.productName,
        category: req.body.category,
        productPrice:req.body.productPrice,
        userType:req.body.userType         
    });
    if(userType == 'customer'){
        res.status(401).json({
            message:"Not authorised"
        });
    }else
    {
        product.save().then(createdProduct =>{
            res.status(201).json({
                message: "Product added successfully",
                productId:createdProduct._id
            });
        });    
    }   
})

router.put("/:id",(req, res, next) => {
    const product = new Product({
        _id:req.body.id,
        productName: req.body.productName,
        category: req.body.category,
        productPrice:req.body.productPrice
       
    });
    Product.updateOne({_id:req.params.id}, product).then(result =>{        
        res.status(200).json({
            message: 'Product updated successfully'
        });
    });  
})

router.get("", (req, res, next) => {
    Product.find().then(documents =>{
        res.status(200).json({
            message: 'Product fetched successfully!',
            product: documents
        });
    });    
});

router.delete("/:id",(req, res, next) => {
    Product.deleteOne({_id:req.params.id}).then(result =>{        
        console.log(result);
        res.status(200).json({
            message: 'Product deleted successfully'
        });
    });    
});

module.exports = router;