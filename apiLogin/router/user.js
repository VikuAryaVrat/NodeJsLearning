
const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const register = require("../controller/user_cont");
const login = require("../controller/login_cont");
const {Otp,forgetPass} = require("../controller/forget_cont");
const main = require("../mailer");



// registration
router.post("/students",register);

// login
router.post("/login",login);
router.post("/otp", Otp);
// Password updation querry
router.post("/forget",forgetPass);





// get data from database
router.get("/students", async (req, res) => {
    try {
        // const st1 = new Student(req.body);
        const getStudents = await Student.find();
        // console.log(getStudents);
        res.send(getStudents);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;