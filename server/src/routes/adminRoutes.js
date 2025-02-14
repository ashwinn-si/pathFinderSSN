const express  = require("express")
const router = express.Router();

const addTopicController = require("./../controller/adminControllers/addTopicController")


router.post("/addtopic",addTopicController)


module.exports = router