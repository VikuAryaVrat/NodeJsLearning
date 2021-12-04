
const nodemailer = require("nodemailer");
const hbs = require('hbs');
const path = require('path');

var main = (to_mail, sub, msg) => {
  const testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'vikrant.kumar@aryavratinfotech.com',
      pass: 'Vikrant@12345'
    }
  });


  
  const mailOptions = ({
    from: '"Vikrant Kumar " <vikrant.kumar@aryavratinfotech.com>', // sender address
    to: `${to_mail}`, // list of receivers
    subject: `${sub}`, // Subject line
    // text: {path: './public/msg.hbs' `${msg}`}, // plain text body
    // html: {path: './public/msg.hbs' },  //message part
    html: `<h1>Your Otp is:-<b>${msg}</b></h1>`,
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(to_mail, sub, msg);
}


module.exports = main;