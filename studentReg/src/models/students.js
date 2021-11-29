const mongoose =require('mongoose');
const validator = require('validator');
// const bcrypt =require('');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"min 3 character require"],
        maxlength:[30,"max 30 character"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Please enter valid email...!!!");
             }
        }
    },
    mobile:{
        type: String,
        required:true,
        minlength:[10,"length should be 10"],
        maxlength:[10,"length should be 10"]
       },
    password:{
        type: String,
        required:true
    }
});


const Student=  new mongoose.model('Student',studentSchema);
module.exports=Student;
