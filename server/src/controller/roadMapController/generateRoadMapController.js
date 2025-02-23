const userKnowledgeModel = require("../../models/userKnowlegeModel")
const questionModel = require("../../models/questionsModel")
const axios = require("axios");
const subTopicPromptGenerator = require("./promptGenerationFunctions/subTopicPromptGenerator")

const generateRoadMapController = async (req, res) => {
    const email = req.user.email;
    const   allQuestion = await questionModel.findOne({email});
    const allTopics = await  userKnowledgeModel.findOne({email});
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

    //allQuestionSet contains the question in a setpair for index
    let prompt = await
    const aiResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: "llama-3.3-70b-versatile",
            messages: [
                {"role": "system", "content": "You are a Technical Mentor. The user has attended an assessment on a topic. Based on the provided questions, answers, and topic, identify the subtopics where the user needs more focus. Return only a list of subtopics that require improvement."},
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

    res.status(200).send({questionPair : allQuestionSet});
}
module.exports = generateRoadMapController;