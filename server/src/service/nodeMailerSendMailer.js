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
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        padding: 20px; 
        background-color: #0F172A; 
        border: 1px solid #1E293B; 
        border-radius: 12px;
        max-width: 600px; 
        margin: auto; 
        color: #f1f1f1;
    ">
        <h2 style="
            background: linear-gradient(135deg, #60A5FA, #A855F7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center; 
            font-size: 2em; 
            margin-bottom: 25px; 
            font-weight: 700;
            letter-spacing: -0.5px;
        ">
            Welcome to SkillPath
        </h2>
        <p style="
            font-size: 1.1em; 
            margin-bottom: 15px; 
            text-align: center; 
            color: #E2E8F0;
            font-weight: 300;
            letter-spacing: 0.2px;
        ">
            Your journey to mastery begins here! To get started with your personalized learning roadmap, please verify your account using this code:
        </p>
        <p style="
            font-size: 2.2em; 
            font-weight: 600; 
            background: linear-gradient(135deg, #60A5FA, #A855F7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center; 
            margin: 25px 0;
            padding: 20px;
            background-color: #1E293B;
            border-radius: 8px;
            letter-spacing: 3px;
            font-family: 'SF Mono', 'Consolas', monospace;
            border: 1px solid #334155;
        ">
            ${OTP}
        </p>
        <p style="
            font-size: 1em; 
            text-align: center; 
            color: #94A3B8; 
            font-weight: 300;
            letter-spacing: 0.2px;
            line-height: 1.8;
        ">
            Enter this code to unlock your customized learning path. Together, we'll map out your route to success. If you didn't request this verification, please disregard this message.
        </p>
        <div style="
            text-align: center;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #1E293B;
            color: #64748B;
            font-size: 0.95em;
            font-weight: 400;
            letter-spacing: 0.5px;
        ">
            🎯 Chart Your Course • Build Your Skills • Master Your Goals
        </div>
    </div>
`;



    Mailtransporter.sendMail({
        to: to,
        subject: "OTP Verification Code",
        html: boilerTemplate, 
    });
}

module.exports = nodeMailerSendMailer;
