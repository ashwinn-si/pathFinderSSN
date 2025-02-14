const { error } = require("console");
const loginModel = require("./../../models/userModel")

const signUpController = async(req,res) =>{
    const {email, otp} = req.body;
    const user = await loginModel.findOne({email})
    try{
        if(!user){
            throw new Error("user not found")
        }
        const dbOtp = user.otp;
        if(otp !== dbOtp){
            throw new Error("otp is wrong")
        }
        res.status(200).json({message : "otp verified"})
    }catch(err){
        if(err.message === "user not found"){
            res.status(404).json({message : "user not found"})
        }else if(err.message === "otp is wrong"){
            res.status(401).json({message :  "otp incorrect"})
        }else{
            res.status(500).json({message : "internal server error"})
        }
    }
} 

module.exports = signUpController