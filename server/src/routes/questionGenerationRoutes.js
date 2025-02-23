const express = require('express')

const router = express.Router()

const verifyToken = require('./../middlewares/tokenverifcation')
const firstQuestionController = require("./../controller/questionController/firstQuestionController")
const questionSaveController = require("./../controller/questionController/saveQuestionController")
const questionGenerateController = require("./../controller/questionController/questionGeneratorController")
const deleteQuestionController = require("./../controller/questionController/deleteQuestionController")
const qetTopicCountController = require("./../controller/questionController/qetTopicCountController")

router.get("/firstQuestion",verifyToken,firstQuestionController)
router.post("/saveQuestion",verifyToken,questionSaveController)
router.get("/questionGenerate",verifyToken,questionGenerateController)
router.get("/getTopicCount",verifyToken,qetTopicCountController)
router.delete("/deleteQuestion",verifyToken,deleteQuestionController)

module.exports = router