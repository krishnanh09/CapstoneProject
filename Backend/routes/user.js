const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const router = express.Router();

router.post("/signUp", (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        const user = new User({
            email:req.body.email,
            password:hash,
            userType:'customer'
        });
        user.save()
        .then(result =>{
            res.status(201).json({
                message:"User created successfully!",
                result:result
            });
        });
    })   
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});

router.post("/login", (req, res, next)=>{
    let fetchedUser;
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(404).json({
                message:"User does not exit!!"
            })
        }
        fetchedUser = user;
        console.log(fetchedUser);
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message:"Not successful!!"
            });
        }
        const token = jwt.sign(
            {email:fetchedUser.email, userId:fetchedUser._id},
            "sfdhsdjakfdfdskjfahfjdshjkfshf",
            {expiresIn:"1h"}
        );
        res.status(200).json({
            token:token,
            userType:fetchedUser.userType,
            expiresIn:3600
        });
    })
    .catch(err=>{
        return res.status(401).json({
            message:"Not successful!!"
        });
    });
})

router.get("", (req, res, next) => {
    User.find().then(user =>{
        res.status(200).json({
            message: 'User details successfully!',
            user: user
        });
    });    
});

router.delete("/:id",(req, res, next) => {
    User.deleteOne({_id:req.params.id}).then(result =>{         
        res.status(200).json({
            message: 'User deleted successfully'
        });
    });    
});

module.exports = router;