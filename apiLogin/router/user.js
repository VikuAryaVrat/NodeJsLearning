
const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const register = require("../controler/user_cont");
const login = require("../controler/login_cont");
const forgetPass = require("../controler/forget_cont");

// registration
router.post("/students",register);

// login
router.post("/login",login);

// Password updation querry
router.patch("/forget",forgetPass);


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


// get from database by name
// router.get("/students/:username", async (req, res) => {
//     try {
//         const username = req.params.username;
//         const studentData = await Student.findOne({ username });
//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             console.log(studentData);
//             res.send(studentData);
//         }
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
// Update from databse

// router.patch("/students/:id", async (req, res) => {
//     try {
//         const st1 = req.body;
//         const idd = req.params.id;
//         const updateData = await Student.findByIdAndUpdate(idd, st1, { new: true, useFindAndModify: true });
//         if (!updateData) {
//             return res.status(404).send();
//         } else {
//             console.log(updateData);
//             res.status(200).send(updateData);
//         }
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
// for delete
// router.delete("/students/:id", async (req, res) => {
//     try {
//         // const std = new Student(req.body);
//         const deleteStd = await Student.findByIdAndDelete(req.params.id);
//         if (!deleteStd) {
//             return res.status(400).send();
//         } else {
//             console.log(deleteStd);
//             res.status(200).send(deleteStd);
//         }
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
module.exports = router;