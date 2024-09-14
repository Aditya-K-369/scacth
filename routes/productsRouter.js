const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const expressSession = require("express-session");
const flash = require("connect-flash");

router.post("/create",upload.single("image"),async(req,res)=>{
   try {let { image,price,discount,bgcolor,panelcolor,name,textcolor,} = req.body;
    
    let products= await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });
    res.redirect("/shop");
}catch(err){
res.send(err.message);
}
});



module.exports =  router;