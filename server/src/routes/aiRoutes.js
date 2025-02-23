const express = require("express")
const router = express.Router();
const axios = require("axios")
require("dotenv").config()

router.get("/demo", async (req,res)=>{
    const userSkills = ["html","css","js"]
    const rating = [3,4,2]

    try {
        prompt = `the user has rated himself in the topic ${userSkills[0]} : ${rating[0]} Generate an MCQ based on the user's skills. just give the question and answer`
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {"role": "system", "content": "You are a Quiz Master. The user has rated himself in a few subtopics. Generate an MCQ that adapts to the user's level so that the next question can be based on the user's answer."},
                    { role: "user", content: prompt }
                ],
                max_tokens: 100
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Use correct env variable
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ message: response.data }); // Send only response data
    } catch (err) {
        console.error("Error calling Groq API:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: err.response ? err.response.data : "Internal Server Error" });
    }
    
})

module.exports = router