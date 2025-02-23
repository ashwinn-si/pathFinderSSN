const { createCollection, addQuestion, getQuestions} = require("./chromaDB")
const questionsModel = require("./../../models/questionsModel")
const promptGenerator = require("./promptGenerationFunctions/questionGenerator")
const axios = require("axios");
const userKnowledgeModel = require("../../models/userKnowlegeModel");

const questionGeneratorController = async (req,res)=>{
    const email = req.user.email;
    const topicIndex = parseInt(req.query.topicIndex);

    const userQuestion = await questionsModel.findOne({email});
    const userKnowledgeDetails = await userKnowledgeModel.findOne({email})
    const prevQuestion = userQuestion.questions.filter((element) => element.topicIndex === topicIndex)
    const prompt = promptGenerator(prevQuestion, topicIndex, userKnowledgeDetails.topics)

    const aiResponse = await axios.post(
<<<<<<< HEAD
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: "llama-3.3-70b-versatile",
            messages: [
                {"role": "system", "content": "You are a Quiz Master. The user has rated their proficiency in a topic. Based on their response history, generate an MCQ that adapts to their level for progressive learning. Focus on conceptual understanding and problem-solving. Just return the question and options with a space between them. Keep the question and options short."},
                { role: "user", content: prompt }
            ],
            max_tokens: 6000
=======
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a Quiz Master. The user has rated their proficiency in a topic. Based on their response history, generate an MCQ that adapts to their level for progressive learning. Focus on conceptual understanding and problem-solving. Just return the question and options with a space between them. Keep the question and options short.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 32768,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
>>>>>>> af8cf8902b27820686fc9b1fe89f435a44bcbf52
        },
      }
    );

    res.status(200).json(aiResponse.data.choices[0].message.content);
}
module.exports = questionGeneratorController;