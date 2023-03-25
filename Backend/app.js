const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PageDetail = require('./models/pageDetail');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const app = express();

mongoose.connect("mongodb://host.docker.internal:27017/grocery")
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(() => {
        console.log("Connection failed");
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE,PUT, OPTIONS"
    );
    next();
});


app.post("/api/pageDetail", (req, res, next) => {
    const page = new PageDetail({
        pageName: req.body.pageName,
        carouselDetails:req.body.carouselDetails
    });
    page.save().then(page =>{
        res.status(201).json({
            message: "PageDetail added successfully",
            pageDetailId:page._id
        });
    });    
})

app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
module.exports = app;