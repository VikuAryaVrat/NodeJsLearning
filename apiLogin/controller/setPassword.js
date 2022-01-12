const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const { success, fail } = require("./message");
const main = require("../mailer");
const cookieParsar = require("cookie-parser");
const session = require('express-session');
// const Student = require('../models/students');



var setPass = async (req, res) => {
    try {
        var emaill;
        const token1 = req.body.token;
        // console.log(`${req.session.tokens}`);
       if(emaill = await Student.findOne({token:token1})){
           console.log("hiiii");
            try {
                
                const pass1 = req.body.password;
                const confirmPass1 = req.body.passwordConfirmation;
                if (pass1 === confirmPass1) {
                    console.log("fg");
                    const email = emaill.email;
                    console.log("GG");
                    const update = await Student.findOneAndUpdate({ email:email }, { $set: { password: password } }, { new: true, useFindAndModify: false });
                    res.send(success("Password Update Successfully", update));
                }
                else {
                    res.send(fail("password not match"));
                }

            } catch (err) {
                res.send(fail("Enter valid Email"));
            }
        } else {
            res.send(fail("token not match"));
        }
    } catch (err) {
        res.send(fail("Techncal Error changing password"));
    }
};
module.exports = setPass;
