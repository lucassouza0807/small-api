const nodemailer = require("nodemailer");
require("dotenv").config;

export const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

console.log(process.env.MAIL_USER);
