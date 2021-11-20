const express = require('express');
var app = express();
const port = 3000;

app.get("/" ,(req,res)=>{
  res.send("<h1>Hello Viku</h1>");
});
app.get("/about" ,(req,res)=>{
    res.send({
        id: 1,
        name: "Vikrant"
    });
  });

app.listen(port, ()=>{
    console.log(`Listening on port no ${port}`);
});