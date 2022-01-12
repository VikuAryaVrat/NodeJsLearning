const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const noteSchema = new mongoose.Schema({
    note:{
        type:String
      },
});
const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;