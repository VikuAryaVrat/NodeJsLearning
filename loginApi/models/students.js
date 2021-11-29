const mongoose = require('mongoose');
const validator = require('validator');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Length shoulds be greater than 3 char"],
        maxlength: [30, "Inviled"],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email should be unique"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter Valid Email");
            }
        }
    },
    phone:{
        type:Number,
        minlength: 10,
        maxlength:10,
    },
    password:{
        type:String,
        required:true,
        
    },
    date:{
        type: Date,
        default: Date.now
    }
});



const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;

// const createfun = async ()=>{
//     try{
//         const st1 = new Student({
//             name: "praveen",
//             email: "prv@gmail.com",
//             phone: 1234567890
//         });
//         const result = await st1.save();
//         console.log(result);
//     }catch(err){
//       console.log("Not successFul");
//     }
// }


// createfun();