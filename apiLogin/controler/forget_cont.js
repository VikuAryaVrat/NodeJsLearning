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
            return res.send(fail("Error", "Email Not found", 501));
        } else {
            console.log(updateData);
            res.send(success("Success", "Password Changed", 500));
            // res.status(200).send(updateData);
        }
    } catch (err) {
        res.status(400).send("something error");
    }
}

module.exports = forgetPass;