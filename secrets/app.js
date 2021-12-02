
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
require("./db/conn");
const Student = require("./model/reg");

const app = express();

app.use(express.static,("public"));
app.set("view engine", 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));





app.get("/",(req, res)=>{
    res.render("home");
});
app.get("/register",(req, res)=>{
    res.render("register");
});


app.listen(8000,()=>{
    console.log("listen on port 8000");
})