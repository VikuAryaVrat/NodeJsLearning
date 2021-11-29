const express = require('express');
require("./db/conn.js");
const Student = require("./models/students");
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;



const app = express();
// to read jason file
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("Get side");
// });

// create a new students
// app.post("/students", (req,res) =>{
//     const st1 = new Student(req.body);
//     console.log(st1);
//     st1.save().then(()=>{
//         res.status(201).send(st1);
//     }).catch((err)=>{
//          res.status(400).send(err);      
//     });
//     // res.send("Hello from post side");
// });

app.post("/students", async (req, res) => {

    try {
        const st1 = new Student(req.body);
        const createSt = await st1.save();
        res.status(201).send(createSt);

    } catch (err) {
        res.status(400).send(err);
    }
});
// get data from database
app.get("/students", async (req, res) => {
    try {
        // const st1 = new Student(req.body);
        const getStudents = await Student.find();
        console.log(getStudents);
        res.send(getStudents);
    } catch (err) {
        res.status(400).send(err);
    }
});


// get from database by name
app.get("/students/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const studentData = await Student.findOne({ name });
        if (!studentData) {
            return res.status(404).send();
        } else {
            console.log(studentData);
            res.send(studentData);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update from databse
app.patch("/students/:id", async (req, res) => {
    try {
        const st1 = req.body;
        const idd = req.params.id;
        const updateData = await Student.findByIdAndUpdate(idd,st1,{new: true, useFindAndModify: true});
        if (!updateData) {
            return res.status(404).send();
        } else {
            console.log(updateData);
            res.status(200).send(updateData);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
// for delete
app.delete("/students/:id", async (req, res) => {
    try {
        // const std = new Student(req.body);
        const deleteStd = await Student.findByIdAndDelete(req.params.id);
        if (!deleteStd) {
            return res.status(400).send();
        } else {
            console.log(deleteStd);
            res.status(200).send(deleteStd);
        }   
    } catch (err) {
        res.status(400).send(err);
    }


});


app.listen(port, () => {
    console.log(`Listning on port ${port}`);
});