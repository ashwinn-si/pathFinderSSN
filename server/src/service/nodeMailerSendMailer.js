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
     <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#111111" style="background: #111111;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <!-- Content Table -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width: 600px; background-color: #201e1e; border-radius: 16px; border: 1px solid #333333; box-shadow: 0 4px 24px rgba(0,0,0,0.2);">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 40px;">
                            <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0;">
                                Welcome to SkillPath</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td align="center" style="padding: 20px 40px;">
                            <p style="color: #F5F5F5; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                                Your journey to mastery begins here! To get started with your personalized learning
                                roadmap, please verify your account using this code:
                            </p>
                        </td>
                    </tr>

                    <!-- OTP Code -->
                    <tr>
                        <td align="center" style="padding: 10px 40px;">
                            <div style="background-color: #2A2A2A; border: 1px solid #404040; border-radius: 12px; padding: 20px; margin: 10px 0;">
                                <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 600; letter-spacing: 4px; color: #FFFFFF;">${OTP}</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Additional Info -->
                    <tr>
                        <td align="center" style="padding: 20px 40px;">
                            <p style="color: #E0E0E0; font-size: 16px; line-height: 1.6; margin: 0; text-align: center;">
                                Enter this code to unlock your customized learning path. Together, we'll map out your
                                route to success.
                            </p>
                            <p style="color: #B0B0B0; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                                If you didn't request this verification, please disregard this message.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px 40px;">
                            <div style="border-top: 1px solid #333333; padding-top: 20px; text-align: center;">
                                <p style="color: #808080; font-size: 14px; margin: 0; text-align: center;">
                                    🎯 Chart Your Course • Build Your Skills • Master Your Goals
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- Footer Note -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 20px; text-align: center;">
                            <p style="color: #666666; font-size: 12px; margin: 0; text-align: center;">
                                © 2025 SkillPath. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;



    Mailtransporter.sendMail({
        to: to,
        subject: "OTP Verification Code",
        html: boilerTemplate, 
    });
}

module.exports = nodeMailerSendMailer;
