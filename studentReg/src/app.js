const express = require('express');

require("./db/connection");
const Student = require("./models/students");


const mongoose = require('mongoose');
const router = require('./router/students');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`listen on port ${port}`);
});

