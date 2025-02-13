const nodeMailer = require("nodemailer");
const transport = require("nodemailer/lib/mailer");
require("dotenv").config();
const Mailtransporter = nodeMailer.createTransport({
    secure: true,
    post:456,
    host:"smtp.gmail.com",
    auth:{
        user : process.env.mailID,
        pass:process.env.mailPass
    }
})

function nodeMailerSendMailer(to , OTP){
    const boilerTemplate = `
    <div style="
        font-family: Arial, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        padding: 20px; 
        background-color: #000; 
        border: 1px solid #444; 
        border-radius: 8px;
        max-width: 600px; 
        margin: auto; 
        color: #f1f1f1;
    ">
        <h2 style="
            color: #fff; 
            text-align: center; 
            font-size: 1.8em; 
            margin-bottom: 20px; 
            font-weight: bold;
        ">
            Welcome to Program Tracker
        </h2>
        <p style="
            font-size: 1.1em; 
            margin-bottom: 10px; 
            text-align: center; 
            color: #ccc;
        ">
            We are thrilled to have you on board! Your verification code is:
        </p>
        <p style="
            font-size: 2em; 
            font-weight: bold; 
            color: #f5f5f5; 
            text-align: center; 
            margin: 20px 0;
        ">
            ${OTP}
        </p>
        <p style="
            font-size: 1em; 
            text-align: center; 
            color: #bbb; 
            font-weight: 300;
        ">
            Enter this code in the Website to verify your account. If you didn’t request this, please ignore this message.
        </p>
    </div>
`;



    Mailtransporter.sendMail({
        to: to,
        subject: "OTP Verification Code",
        html: boilerTemplate, 
    });
}

module.exports = nodeMailerSendMailer;
