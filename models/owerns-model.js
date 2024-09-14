const mongoose = require("mongoose");


const ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    product:{
        type:Array,
        default:[],
    },
    phonenumber:Number,
    picture:String,
    gstin:String,
})

module.exports = mongoose.model("owner",ownerSchema);