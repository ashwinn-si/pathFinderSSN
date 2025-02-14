const loginModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const generateOTP = require("../../service/generateOTP");
const nodeMailerSendMailer = require("../../service/nodeMailerSendMailer");
require("dotenv").config();

const verifyOtpController = async(req, res) => {
    const {name, email , password} = req.body;
    try{
        const user = await loginModel.findOne({email})
        if(user){
            throw new Error("User already exist");
        }
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_VALUE));
        const otp = await generateOTP();

        const newUser = new loginModel({
            email,
            password : hashPassword,
            name,
            otp,
        })
        await newUser.save();
        await nodeMailerSendMailer(email,otp);
        res.status(200).json({message : "otp generated"})


    }catch(err){
        if(err.message === "User already exist"){
            res.status(403).json({message : "user already exsists"})
        }else{
            res.status(500).json({message : "internal server error"})
        }
    }
}

module.exports = verifyOtpController ;