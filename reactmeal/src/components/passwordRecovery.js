import crypto from 'crypto';
import User from '../sequelize'

require('dotenv').config();

console.log("pw recovery connected");

const nodemailer = require('nodemailer');

module.exports = (app) => {
    app.post('/recoverPass', (req, res) => {
        if (req.body.email === '') {
            res.status(400).send('email required');
        }
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user => {
            const token = crypto.randomBytes(20).toString('hex');
            user.update({
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 360000,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `themealmine@gmail.com`,
                    pass: `vcznrukqedoimrqn`,
                },
            });

            const mailOptions = {
                from: 'themealmine@gmail.com',
                to: `${user.email}`,
                subject: `password reset link`,
                text:
                    'here is your reset link, dumbass\n\n'
                    + `${token}\n\n`
                    + 'this is a test\n,'
            };

            console.log('sending');

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json('recovery email sent');
                }
            })
        }))
    })
}