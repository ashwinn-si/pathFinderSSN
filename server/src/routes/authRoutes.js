const express  = require("express")
const router = express.Router();

const verifyOtpController = require("../controller/authControllers/verifyOtpController")
const loginController = require("../controller/authControllers/loginController");
const signUpController = require("../controller/authControllers/signUpController")
const logOutController = require("../controller/authControllers/logOutController")

router.post("/verifyotp",verifyOtpController)
router.post("/login",loginController)
router.post("/signup",signUpController)
router.delete("/logout",logOutController)

module.exports = router