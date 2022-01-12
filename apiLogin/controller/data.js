const express = require('express');
const router = new express.Router();
const {success,fail}= require("./message");


const randomData = async (req, res) => {
    try {
        const a = Math.floor(Math.random() * 100) + 1; 
        const ab = Math.floor(Math.random() * 100) + 1;
        console.log(a,ab);
        res.send(success("Random Data", {a,ab}));   
    } catch (error) {
        res.send(error);
    }
}

module.exports = randomData;