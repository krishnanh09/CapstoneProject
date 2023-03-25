const mongoose = require('mongoose');

const pageDetailSchema = mongoose.Schema({
    pageName:{type:String, required:true },   
    carouselDetails:{image:String, captionHeader:String,captionDescription:String }    
});

module.exports=mongoose.model('PageDetail', pageDetailSchema);