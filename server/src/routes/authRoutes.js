const express  = require("express")
const router = express.Router();

const verifyOtpController = require("./../controller/authController/verifyOtpController")
const loginController = require("./../controller/authController/loginController");
const signUpController = require("./../controller/authController/signUpController")

router.post("/verifyotp",verifyOtpController)
router.post("/login",loginController)
router.post("/signup",signUpController)

module.exports = router