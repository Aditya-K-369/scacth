const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");


const productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    bgcolor:{
        type:String,
    },
    panelcolor:String,
    textcolor:String,
});

module.exports = mongoose.model("product",productSchema);