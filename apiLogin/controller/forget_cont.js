const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const { success, fail } = require("./message");
const main = require("../mailer");
// const Student = require('../models/students');




var otp_message;
var email1;
const Otp = async (req, res) => {  
    console.log("hello");
    try {
        console.log("hey");
         email1 = req.body.email;
        console.log("get");
        var data;
        if(data = await Student.findOne({ email: email1 })) {
            console.log("ajawo");
            otp_message = Math.floor((Math.random() * 9999) + 1000);
            (main(email1, "OTP", otp_message));
            res.send(success("Otp Send Successfully..!!!"));
        } else {
            res.send(fail("Invalid Email"));
        }
    } catch (error) {
        res.send(fail("Otp not send"));
    }
}
const forgetPass = async (req, res) => {
    try {
        console.log(req.body);
        // const email1 = req.body.email;
        const password = req.body.password;
        const otp = req.body.otp;
        console.log("hii");
        if (`${otp_message}` === otp) {
            console.log("see");
            const updateData = await Student.findOneAndUpdate({ email: email1 }, { $set: { password: password } }, { new: true, useFindAndModify: true });
            if (!updateData) {
                return res.send(fail("Email Not found"));
            } else {
                console.log(updateData);
                res.send(success("Password Changed",updateData));
            }
        } else {
            res.send(fail("Password not changed"));
        }
    } catch (err) {
        res.status(400).send("Something Error");
    }
}

module.exports = {Otp,forgetPass};