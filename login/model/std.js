const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// var session = require('express-session');
// const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// const { serializeUser } = require('passport');

const regSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter Valid Email");
            }
        }
    },
    address: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        require: true,
        minlength: [10, "Please Enter Valid number"],
        maxlength: [10, "Please Enter Valid number"]
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
           token:{
               type:String,
               required:true
           }
    }]
});
// token part

regSchema.methods.generateAuthToken = async function(){
    try{
       const token = jwt.sign({_id:this._id.toString()}, process.env.SECRTE_KEY);
       this.tokens = this.tokens.concat({token:token});
        await this.save();
       return token;
    }catch(error){
        res.send("the error "+ error);
    }
}
// password hashing
regSchema.pre("save", async function (next) {
    // const passwordHash = await bcrypt.hash(password, 10);
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})
regSchema.plugin(passportLocalMongoose);
const Reg = new mongoose.model("Reg", regSchema);
// passport.use(Reg.createStrategy());
// passport.serializeUser(Reg.serializeUser);
// passport.deserializeUser(Reg.deserializeUser);
module.exports = Reg;