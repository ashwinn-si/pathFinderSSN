const userKnowledgeModel = require("./../../models/userKnowlegeModel")
const firstQuestionPromptGenerator = require("./promptGenerationFunctions/firstQuestionGenerator")
const axios = require("axios")
require("dotenv").config()

const firstQuestionController = async(req, res) => {
    const email = req.user.email;
    const topicIndex = parseInt(req.query.topicIndex)
    const userKnowledgeDetails = await userKnowledgeModel.findOne({email})
    const prompt = await firstQuestionPromptGenerator(topicIndex,userKnowledgeDetails.topics, userKnowledgeDetails.rating)

    const aiResponse = await axios.post(

        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    "role": "system",
                    "content": "You are a Quiz Master. The user has rated themselves on various subtopics. Generate an MCQ that adapts to the user's level, ensuring each question covers a different subtopic than the previous one. Only generate MCQ questions with options."
                },
                {role: "user", content: prompt}
            ],
            max_tokens: 6000
        },
        {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Use correct env variable
                "Content-Type": "application/json"
            }
        }
        );



    res.json(aiResponse.data.choices[0].message.content);
}
module.exports = firstQuestionController;