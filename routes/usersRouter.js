const express = require("express");
const router = express.Router();
const {registerUser}= require("../controllers/authController");
const {loginUser,logout}= require("../controllers/authController");
require("dotenv").config();

router.get("/",(req,res)=>{
    res.send("hey its working.");
});

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);
   

module.exports =  router;