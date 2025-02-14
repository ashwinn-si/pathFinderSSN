const express = require("express")
const router = express.Router();
const axios = require("axios")
require("dotenv").config()

router.post("/demo", async (req,res)=>{
    const prompt = "What is AI?"; // Fix typo in prompt

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile", 
                messages: [{ role: "user", content: prompt }], // OpenAI-style format
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