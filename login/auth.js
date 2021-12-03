const jwt = require('jsonwebtoken');
const Reg = require("./model/std");
const cookieParsar = require("cookie-parser");

const auth = async(req, res , next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRTE_KEY);
        console.log(verifyUser);

       
        const user = await Reg.findOne({_id:verifyUser._id});
        console.log(user.firstname);
        req.token = token;
        req.user = user;
      
        next();
    } catch (error) {
        res.status(400).send(error);
    }

} 

module.exports = auth;