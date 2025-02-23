const userKnowledgeModel = require("../../models/userKnowlegeModel")
const questionModel = require("../../models/questionsModel")
const userModel = require("./../../models/userModel")
const axios = require("axios");
const subTopicPromptGenerator = require("./promptGenerationFunctions/topicFocusGenerator")
const subTopicFormater = require("./promptGenerationFunctions/subtopicFormator");
const subTopicDescriptionPromptGenerator = require("./promptGenerationFunctions/subTopicDescriptionPromptGenerator");
const getID = require("./../../service/getRandomNumber")
const getDate = require("./../../service/getDateFunction")
const descriptionFormater = require("./promptGenerationFunctions/descriptionFormater")
const linksFormater = require("./promptGenerationFunctions/linksFormater")
const {response} = require("express");
require("dotenv").config();

const generateRoadMapController = async (req, res) => {
    const email = req.user.email;
    const   allQuestion = await questionModel.findOne({email});
    const allTopics = await  userKnowledgeModel.findOne({email});
    const userInfo = await userModel.findOne({email})
    const userTopics = allTopics.topics
    const userQuestions = allQuestion.questions;
    let allQuestionSet = []
    let questionSet = []
    let questionIndex = 0
    for (let currQuestion of userQuestions) {
        if(questionIndex === currQuestion.topicIndex){
            questionSet.push({
                question: currQuestion.question,
                answer : currQuestion.answer
            })
        }else{
            allQuestionSet.push(questionSet)
            questionSet = [];
            questionSet.push({
                question: currQuestion.question,
                answer : currQuestion.answer
            })
            questionIndex++;
        }
    }
    allQuestionSet.push(questionSet)
    console.log("first level done")
    //allQuestionSet contains the question in a setpair for index
    const allModules = []
    for(let i = 0 ; i < userTopics.length ; i++) {
        let prompt = await subTopicPromptGenerator(userTopics[i], allQuestionSet[i])
        let aiResponse = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        "role": "system",
                        "content": `You are a Technical Mentor on the topic: ${userTopics[i]}. The user has attended an assessment. Based on the provided questions, answers, and topic, identify the subtopics that need more focus and suggest the next subtopics they should learn to master the topic. Return only a numbered list of subtopics. No extra descriptions or explanations.`
                    },
                    {role: "user", content: prompt}
                ],
                max_tokens: 6000
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        allModules.push(aiResponse.data.choices[0].message.content)
    }
        let userModules = await subTopicFormater(allModules)
        prompt = await subTopicDescriptionPromptGenerator(userModules, userInfo.skillTopic)

        // generating the description for each subtopic
        const aiResponse2 = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        "role": "system",
                        "content": `You are a Technical Mentor in ${userInfo.skillTopic}. Given a list of subtopics, generate a concise explanation of why each one is essential to learn the topic. Return only the numbered descriptions without any extra text.`
                    },
                    { role: "user", content: prompt }
                ],
                max_tokens: 6000
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }

        );
    userModules = descriptionFormater(userModules, aiResponse2.data.choices[0].message.content)
    console.log("second level done")
    //generating the links
    const roadMap = {
        roadMapID : getID(),
        skillName : userInfo.skillTopic,
        dateOfCreation : getDate(),
        modules : []
    }
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for(let module of userModules) {
        const topic = module.title;
        let aiResponse = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        "role": "system",
                        "content": `You are a Technical Mentor on the topic: ${userInfo.skillTopic}. The user has provided a subtopic. Find relevant study resources from websites and YouTube, including documentation and videos. Return only a numbered list with the resource title and its link in the format: '1. [Title] - [Link]'.`
                    },
                    {role: "user", content: `Topic : ${topic}`}
                ],
                max_tokens: 6000
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const Links = await linksFormater(aiResponse.data.choices[0].message.content)
        module.links = Links;
        roadMap.modules.push(module)
    }
    console.log("third level done")

    userInfo.roadMaps.push(roadMap)

    await userInfo.save();
    console.log("all level done")
    res.status(200).send({roadMapID : roadMap.roadMapID});

}
module.exports = generateRoadMapController;