require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParsar = require("cookie-parser");
const session = require('express-session');


const port = process.env.PORT || 5000;
require("./db/conn");
const Reg = require("./model/std");
const Note = require("./model/desc");

const main = require("./mailer");


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
//session middleware
const oneDay = 200000;
app.use(session({
    secret: "thisismysecrctekeyvikufgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

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
app.get("/submit",(req,res)=>{
    res.render("submit");
})
app.get("/secret", (req, res) => {
    res.render("secret");
    // console.log(req.cookies.jwt);
});

app.post("/register", async (req, res) => {
    try {
        const firstname = req.body.first_name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const address = req.body.address;
        const password = req.body.password;

        const reg = new Reg({ firstname, email, mobile, address, password});
        console.log(reg);
        const reg1 = await reg.save();
        var session = req.session;
        session.firstname = firstname;
        session.email = email;
        session.mobile = mobile;
        // session.password = password;
        console.log(reg1);

        res.status(201).render("home", {
            name: `${req.session.firstname}`,
            // email: `${req.session.email}`,
            // mobile: `${req.session.mobile}`,
            // password: `${req.session.password}`
        });
       
    } catch (err) {
        res.status(400).send(err);
    }
});
app.post("/submit", async(req,res) => {
    try {
        // console.log(await Reg.findOne({ email: email1 }));
        var session = req.session;
        // 
       console.log(req.body.secret);
    //    session.firstname = firstname;
        console.log(req.session.firstname);
        const note = req.body.secret;
        const note1 = new Note({note});
        const isNote = await note1.save()
        res.send("success");
        console.log("Success");
    } catch (error) {
        res.send("Note Saved");
    }
})

app.post("/login", async (req, res) => {
    try {
        const email1 = req.body.email;
        const password = req.body.password;

        const userlogin = await Reg.findOne({ email: email1 });

        console.log(userlogin);
        const isMatch = await bcrypt.compare(password, userlogin.password);

        console.log(isMatch);
        console.log("cccc");
        if (isMatch) {
            var session = req.session;
            session.firstname = userlogin.firstname;
            console.log("hii");
            res.status(201).render("home", {
                name: `${req.session.firstname}`
            });
        } else {
            res.status(404).send("Invalid details");
        }
    } catch (err) {
        res.status(400).send("Invalid login Details");
    }
});

app.get("/logout", async (req, res) => {
    try {
        // console.log(req.user);

        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token == req.token;
        // });
        // res.clearCookie("jwt");
        // console.log("logout success");
        // await req.user.save();
        // res.render("login");
        req.session.destroy();
    res.redirect("login");
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/otp", (req, res) => {
    res.render("otp");
})
var otp_message;
app.post("/otp", async (req, res) => {
    try {
        const email1 = req.body.email;
        if (data = await Reg.findOne({ email: email1 })) {

            otp_message = Math.floor((Math.random() * 9999) + 1000);

            (main(email1, "OTP", otp_message));
            res.render("forgot");

        } else {
            res.send("invalid")
        }
    } catch (error) {

    }
})
app.post("/forgot", async (req, res) => {
    try {
        console.log(req.body);
        const email1 = req.body.email;
        const password = req.body.password;
        const otp = req.body.otp;
        console.log("salo");
        if (`${otp_message}` === otp) {
            const passwordHash = await bcrypt.hash(password, 10);
            const updateData = await Reg.findOneAndUpdate({ email: email1 }, { $set: { password: passwordHash } }, { new: true, useFindAndModify: true });
            if (!updateData) {
                return res.status(404).send();
            } else {
                console.log(updateData);
                res.status(200).send("Password successfully changed");
            }
        } else {
            res.render("forgot");
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