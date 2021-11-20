const express = require('express');
const path = require('path');
var app = express();


const staticPath = path.join(__dirname, "../public");

app.use(express.static(staticPath));



app.get("/" ,(req, res)=>{
  res.send("Hello from Viku");
});
app.get("/about" ,(req, res)=>{
    res.send("Hello from Viku about");
  });

app.listen(3000,()=>{
    console.log("Listning on port 3000");
});