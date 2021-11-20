const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// this is used for html file store in public folder
// const staticpath = path.join(__dirname, "/public");
// app.use(express.static(staticpath));



app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
    // res.render("index");
});


app.post("/",(req, res)=>{

var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);
var result = num1 + num2;
var result1 = num1- num2;

res.send( "The Substraction of two number "  +  result1 + "<br>" + "  The addition of two number "  +  result);
});

app.listen(3000,() =>{
    console.log("Listning on Port 3000");
});