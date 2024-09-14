const usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken}= require("../utils/generateToken");
const userModel = require("../models/user-model");


module.exports.registerUser = async(req,res)=>{
    try{
        let {email,password,fullname}=req.body;

        let user = await userModel.findOne({email:email});
        if(user) return res.status(401).send("You already have an account ,please login")
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt, async function(err,hash){
                if(err)return res.send(err.message);
                else {
                    let user = await usermodel.create({
                        email,
                        password:hash,
                        fullname,
                    });
                  
                    let token = generateToken(user)
                    res.cookie("token",token);
                }
            });
        });      
    }catch(err){
        res.send(error.message);
    }
};

module.exports.loginUser = async function(req,res){
    let {email,password}=req.body;
    
    let user = await userModel.findOne({email:email});
    if(!user) return res.send("Email or password incorrect");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
           let token= generateToken(user);
           res.cookie("token",token);
        }
        else{
            return res.send("Email or password incorrect");
        }
    });
};