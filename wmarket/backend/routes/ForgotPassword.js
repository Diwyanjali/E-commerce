const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "newwalmart",
});


//check user exist
router.post('/getUser', (req, res) => {

    const { email } = req.body;

    console.log(email)

    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email]

    db.query(query, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json({ message: "User not found" });
        }

    })

})

//send email with verification code
router.post('/sendEmail', (req, res) => {
    const { email, id, random } = req.body;
    console.log(email, id, random);

    //NodeMailer
    var nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'randyruch5@gmail.com',
            pass: 'luxlrqakfenxkyzi'
        }
    });



    let mailOptions = {
        from: 'randyruch5@gmail.com',
        to: email,
        subject: 'Password Change Request',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="font-size: 28px; color: #4a4a4a; text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Password Change Request</h2>
                <p style="font-size: 18px; margin: 20px 0;">Hi,</p>
                <p style="font-size: 16px;">You requested to change your password. Please use the verification code below to proceed:</p>
    
                <div style="padding: 15px; font-size: 24px; font-weight: bold; background-color: #007bff; color: white; border-radius: 8px; text-align: center; max-width: 220px; margin: 20px auto;">
                    ${random}
                </div>
    
                <p style="font-size: 16px; margin: 20px 0;">Alternatively, you can click the button below to change your password:</p>
                
                <div style="text-align: center;">
                    <a href="http://localhost:5173/checkcode/${id}" 
                       style="display: inline-block; padding: 14px 30px; font-size: 18px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 8px; font-weight: bold;">
                       Change Password
                    </a>
                </div>
    
                <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">If you did not request this, please ignore this email.</p>
            </div>
        `
    };



    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.send({ msg: "Success" })
        }
    });


})


router.post('/changepass', (req, res) => {

    const { id, password } = req.body;
    const salt = 10;

    const query = 'UPDATE users SET password = ? WHERE id = ?';

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ message: "Server Side Error" });

        const values = [hash, id];

        db.query(query, values, (err, data) => {
          if (err) {
            return res.json({ message: "Server Side Error" });
          }
          return res.json({ status: "200OK" });
        });

      });

})




module.exports = router;