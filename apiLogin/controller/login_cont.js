const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const {success,fail}= require("./message");

const login = async(req,res) =>{
        console.log(req.body);
        try {
            console.log(req.body);
            const email1 = req.body.email;
            const password = req.body.password;
            const userlogin = await Student.findOne({ email: email1 });
            console.log(userlogin);
            if (userlogin.password === password) {
                
                console.log("Login1");
                res.send(success("Login Successful", userlogin));
                console.log("Login2");
            } else {
                console.log(userlogin);
                res.send(fail("Invalid Email and password..!!!"));
            }
        } catch (err) {
            res.send(fail("Login not successful..!!!"));
        }
}

module.exports = login;