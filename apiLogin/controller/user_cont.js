const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const {success, fail} = require("./message");

const register = async(req,res) =>{
    try {
        console.log(req.body);
        const email3 = req.body.email;
        const mobile1 = req.body.mobile;
        if (await Student.findOne({ email: email3 })) {
            res.send(fail("Email Already exist"));
        } else if (await Student.findOne({ mobile: mobile1 })) {
            res.send(fail("Mobile number Already exist"));
        } else {
            try {
                const st1 = new Student({
                    username: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: req.body.password
                });
                const createSt = await st1.save();
                console.log(createSt);
                res.send(success("Registration Successfull..!!", st1));
            } catch (error) {
                res.send(fail("Registration not Successfull..!!"));
            }
        }
    } catch (error) {
        res.send(fail("Technical Error"));
    }
}


module.exports = register;