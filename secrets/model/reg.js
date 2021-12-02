const mongoose = require('mongoose');



const regSchema = new mongoose.Schema({

    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
       
});


const Student = new mongoose.model("Student", regSchema);
module.exports = Student;