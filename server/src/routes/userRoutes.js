const express  = require("express")
const router = express.Router();

const verifyToken = require("./../middlewares/tokenverifcation");
const addSkillController = require("./../controller/userControllers/addSkillController")
const getSkillController = require("./../controller/userControllers/getSkillController")
const getTopicController = require("./../controller/userControllers/getTopicController")
const addKnowledgeController = require("./../controller/userControllers/addKnowledgeController")

router.post("/addskill",verifyToken,addSkillController)
router.get("/getSkill",verifyToken,getSkillController)
router.get("/getTopics",verifyToken,getTopicController)
router.post("/addKnowledge",verifyToken,addKnowledgeController)
module.exports = router