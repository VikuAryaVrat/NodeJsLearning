const express = require('express');
require("./db/conn.js");
const Men = require("./models/mens");
const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.get("/men", async(req,res)=>{
    try{
        const getMen = await Men.find({});
        res.status(201).send(getMen);
    }catch(err){
        res.status(400).send(err);
    }
});
app.get("/men/:ranking", async(req,res)=>{
    try{
        idd=req.params.ranking;
        const getMen = await Men.findOne({ranking:idd});
        res.status(201).send(getMen);
    }catch(err){
        res.status(400).send(err);
    }
});

app.post("/men",async(req,res)=>{
    try{
        const Men1 = new Men(req.body);
        const createSt = await Men1.save();
        console.log(createSt);
        res.status(200).send(createSt);
    }catch(err){
       res.status(400).send();
    }
})

app.listen(port,()=>{
    console.log(`Listning on port ${port}`);
});