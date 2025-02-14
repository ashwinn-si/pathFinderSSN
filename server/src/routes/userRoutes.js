const express  = require("express")
const router = express.Router();

const addSkillController = require("./../controller/userControllers/addSkillController")
const getSkillController = require("./../controller/userControllers/getSkillController")

router.post("/addskill",addSkillController)
router.get("/getSkill/:email",getSkillController)

module.exports = router