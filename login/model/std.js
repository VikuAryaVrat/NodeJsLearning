const mongoose = require('mongoose');
const validator = require('validator');


const regSchema = new mongoose.Schema({
    firstname:{
     type:String,
     required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error("Enter Valid Email");
                    }
                }
    },
    address:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        require:true,
        minlength:[10,"Please Enter Valid number"],
        maxlength:[10,"Please Enter Valid number"]
    },
    password:{
        type: String,
        required:true
    }
})

const Reg = new mongoose.model("Reg", regSchema);
module.exports = Reg;