const mongoose = require('mongoose');


const menSchema = new mongoose.Schema({
    ranking:{
    type:Number,
    required:true,
    unique:[true,"Ranking should be unique"]
    },
    name:{
        type:String,
        unique:[true,"Name should be unique"]
    },
    
    country:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true,
        trim:true
    },
    event:{
      default: "100M",
      type:String
    },
    DOB:{
        type:Date,
        required:true
    }
 
});
const Men = new mongoose.model('Men',menSchema);

module.exports = Men;

