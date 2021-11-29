const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("./db/conn");
const Reg = require("./model/std");

const app = express();


const publicPath = path.join(__dirname,"./public");
const partials_path = path.join(__dirname, "/views/partials");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static(publicPath));

app.set("view engine", "hbs");
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async(req,res)=>{
    try{

        const reg1 = new Reg({
      firstname :req.body.first_name,
       email : req.body.email,
       address : req.body.address,
       phone : req.body.mobile,
       password : req.body.password
    })
    // password hasing using bcrypt

        const reg = await reg1.save();
        console.log(reg);
          res.status(200).send("registration Successfull");    
    }catch(err){
        res.status(400).send(err);
    }
});

app.post("/login",async(req,res)=>{
    try{
      const email1 = req.body.email;
      const password = req.body.password;
    
        const userlogin = await Reg.findOne({email:email1});
        console.log(userlogin); 
        if(userlogin.password === password){
            res.status(202).send("Login Success"); 
        }else{
            res.status(404).send("Invalid details");
        }
    }catch(err){
        res.status(400).send(err);
    }
});

app.get("*",(req,res)=>{
    res.render("404");
})



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})