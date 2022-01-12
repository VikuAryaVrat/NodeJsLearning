const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const { success, fail } = require("./message");
const main = require("../mailer");
const cookieParsar = require("cookie-parser");
const session = require('express-session');

const register = async (req, res) => {
    try {
        console.log(req.body);
        const email3 = req.body.email;
        // const mobile1 = req.body.mobile;
        if (await Student.findOne({ email: email3 })) {
            res.send(fail("Email Already exist"));
            // } else if (await Student.findOne({ mobile: mobile1 })) {
            //     res.send(fail("Mobile number Already exist"));
        } else {
            try {
                const redirectUrl = req.body.redirectUrl;
                const st1 = new Student({
                    // username: req.body.username,
                    email: req.body.email,
                    // mobile: req.body.mobile,
                    // password: req.body.password
                });
                console.log("try");
                const token = await st1.generateAuthToken();
                console.log("token");
                console.log("token part" + token);

                newRegistrationUrl = `${redirectUrl}/${encodeURIComponent(
                    st1.tokens[0].token
                )}?on=register`
                console.log("Hello");
                var session = req.session;
                session.tokens = newRegistrationUrl;

console.log("hello1");

                main(st1.email, "Registration link", newRegistrationUrl);
                console.log("hello2");
                const createSt = await st1.save();
                console.log(createSt);
                const message = `An email validation link was just emailed to you at ${req.body.email}, please verify your email and follow the instructions to complete your registration.We're happy to have you as part of our community!`;
                const note = `We've been having problems with our emails going to the spam folder. Please add support@aryavratinfotech.com as a contact so our email doesn't go to spam, and check your spam folder or trash if our emails don't come to your inbox!`;
                res.send(success("Registration Successfull..!!", message, note, st1));
            } catch (error) {
                res.send(fail("Registration not Successfull..!!"));
            }
        }
    } catch (error) {
        res.send(fail("Technical Error"));
    }
}


module.exports = register;