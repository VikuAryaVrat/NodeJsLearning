require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParsar = require("cookie-parser");
const auth = require("./auth");

const port = process.env.PORT || 4000;
require("./db/conn");
const Reg = require("./model/std");

const app = express();



const publicPath = path.join(__dirname, "./public");
const partials_path = path.join(__dirname, "/views/partials");
console.log(process.env.SECRTE_KEY);
app.use(express.json());
app.use(cookieParsar());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.static(publicPath));
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/forgot", (req, res) => {
    res.render("forgot");
});
app.get("/secret", auth, (req, res) => {
    res.render("secret");
    // console.log(req.cookies.jwt);
});

app.post("/register", async (req, res) => {
    try {
        const reg1 = new Reg({
            firstname: req.body.first_name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.mobile,
            password: req.body.password
        })
        console.log();
        const token = await reg1.generateAuthToken();
        console.log("token part" + token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 10000),
            httpOnly: true
        });

        const reg = await reg1.save();
        console.log(reg);
        res.status(201).render("home");
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const email1 = req.body.email;
        const password = req.body.password;

        const userlogin = await Reg.findOne({ email: email1 });

        console.log(userlogin);
        const isMatch = await bcrypt.compare(password, userlogin.password);

        const token = await userlogin.generateAuthToken();
        console.log("token part" + token);

        // cookies
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),
            // secure:true,
            httpOnly: true
        });


        console.log(isMatch);
        if (isMatch) {
            res.status(201).render("home");
        } else {
            res.status(404).send("Invalid details");
        }
    } catch (err) {
        res.status(400).send("Invalid login Details");
    }
});

app.get("/logout", auth, async (req, res) => {
    try {
        console.log(req.user);

        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token == req.token;
        });
        res.clearCookie("jwt");
        console.log("logout success");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post("/forgot", async (req, res) => {
    try {
        console.log(req.body);
        const email1 = req.body.email;
        const password = req.body.password;
        console.log("salo");
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("bye");
        const updateData = await Reg.findOneAndUpdate({ email: email1 }, { $set: { password: passwordHash } }, { new: true, useFindAndModify: true });
        console.log("hi");
        if (!updateData) {
            return res.status(404).send();
        } else {
            console.log(updateData);
            res.status(200).send("Password successfully changed");
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get("*", (req, res) => {
    res.render("404");
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})