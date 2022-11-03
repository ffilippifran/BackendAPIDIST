const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_Mail,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER_Mail,
                pass: process.env.PASS_Mail,
            },
        });
        body = `<h1>Password Reset</h1>
        <h2>Hello Friend}</h2>
        <p>Reset your password by clicking on the following link within 15 minutes.</p>
        <a href=${text}> Click here</a>
        <p>This email is auto generated, please do not reply to this email.</p>
        `;
        await transporter.sendMail({
            from: process.env.USER_Mail,
            to: email,
            subject: subject,
            html: body,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;