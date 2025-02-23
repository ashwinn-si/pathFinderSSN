const topicFocusGenerator = (topic, questions) =>{
    let prompt = `The topic is : ${topic} \n Here is the history of the last questions and answers:  `;
    questions.forEach((q, index) => {
        prompt += `\n${index + 1}. Question: "${q.question}" Answer: "${q.answer}"`;
    });
    return prompt
}
module.exports = topicFocusGenerator;