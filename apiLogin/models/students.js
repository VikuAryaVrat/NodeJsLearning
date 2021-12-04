const mongoose = require('mongoose');
const validator = require('validator');


const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // minlength: [3, "Length shoulds be greater than 3 char"],
        // maxlength: [30, "Inviled"],
        // lowercase: true,
        // trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // sparse:true,
        // lowercase:true,
        // time:true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         return new Error("Enter Valid Email");
        //     }
        // },
        // match: /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/,
    },
    mobile:{
        type:Number,
        // minlength:[10,"Minimum length is 10 digit"],
        // maxlength:[10,"Maximum length is 10 digit"],
        // trim:true,
        unique:true,
        required: true
        // match: /^[6-9]\d{9}$/,
    },
    password:{
         type: String,
        required:true,
        trim:true,
        // match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,60}$/
    },
    date:{
        type: Date,
        default: Date.now
    }
});



const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;
