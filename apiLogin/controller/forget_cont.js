const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const { success, fail } = require("./message");


const forgetPass = async (req, res) => {
    try {
        console.log(req.body);
        const email1 = req.body.email;
        const password = req.body.password;
        const updateData = await Student.findOneAndUpdate({ email: email1 }, { $set: { password: password } }, { new: true, useFindAndModify: true });
        if (!updateData) {
            return res.send(fail("Email Not found"));
        } else {
            console.log(updateData);
            res.send(success("Password Changed"));
        }
    } catch (err) {
        res.status(400).send("Something Error");
    }
}

module.exports = forgetPass;