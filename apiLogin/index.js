require('dotenv').config();
const express = require('express');
require("./db/conn.js");
const Student = require("./models/students");
const mongoose = require('mongoose');
const router = require("./router/user");
const path = require('path');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const hbs = require('hbs');
const ejs = require('ejs');
const cookieParsar = require("cookie-parser");
const session = require('express-session');

const port = process.env.PORT || 3002;
const static_path = path.join(__dirname, "./public");



const app = express();
app.set('view engine', 'ejs');
app.use(express.static(static_path));
app.use(cors());
// app.use(cookieParsar());
app.use(express.urlencoded({ extended: true }));
// to read jason file
app.use(express.json());
const oneDay = 1000000;
app.use(session({
    secret: "thisismysecrctekeyvikufgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
// to use router
app.use(router);
// app.use(express.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Listning on port ${port}`);
});