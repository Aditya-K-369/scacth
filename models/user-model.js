const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    cart:{
    type:Array,
    default:[]
    },
    isadmin:Boolean,
    orders:{
    type:Array,
    default:[]
    },
    phonenumber:Number,
    picture:String,
})

module.exports = mongoose.connect("user",userSchema);