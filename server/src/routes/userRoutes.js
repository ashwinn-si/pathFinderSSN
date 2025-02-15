const express  = require("express")
const router = express.Router();

const verifyToken = require("./../middlewares/tokenverifcation");
const addSkillController = require("./../controller/userControllers/addSkillController")
const getSkillController = require("./../controller/userControllers/getSkillController")

router.post("/addskill",verifyToken,addSkillController)
router.get("/getSkill",verifyToken,getSkillController)

module.exports = router