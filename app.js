const express = require("express");
const app = express();
const db = require("./config/moongose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash= require("connect-flash");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const index = require("./routes/index");
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(
    expressSession({
        resave:false,
        saveUninitialized: false,
        secret: 'yourSecretKey'
    })
);
app.use(flash());
app.use("/",index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get("/",(req,res)=>{
    res.send("hey");
});

app.listen(3000);