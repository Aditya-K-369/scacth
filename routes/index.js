const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/",(req,res)=>{
    let error = req.flash("error");
    res.render("index",{error,logged:false});
});

router.get("/shop",isLoggedIn,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{products,success});
});

router.get("/cart/",isLoggedIn,async function(req,res){
    try{

        let user = await userModel.findOne({id:req.user._id}).populate("cart");
        const bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
    
        res.render("cart",{user,bill});
    }
    catch(err){
        console.log(err.message);
    }
});

router.get("/addtocart/:id",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({id:req.user._id});
    try{
        user.cart.push(req.params.id);
        await user.save();
        res.redirect("/shop");

    }catch(err){
        res.send(err.message);
    }
});


router.get("/logout",isLoggedIn,function(req,res){
    res.render("shop");
})



module.exports = router;