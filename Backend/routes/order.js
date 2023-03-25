const express = require('express');
const Order = require('../models/order');

const router = express.Router();

router.post("",  (req, res, next) => {
    const order = new Order({
        product:req.body
    });  
    order.save().then(order =>{
        res.status(201).json({
            message: "Ordered successfully",
            orderId:order._id            
        });
    });    
});

router.get("", (req, res, next) => {
    Order.find().then(order =>{
        res.status(200).json({
            message: 'Order details fetched successfully!',
            order: order
        });
    });    
});

module.exports = router;