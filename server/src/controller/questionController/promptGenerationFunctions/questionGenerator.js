const questionGenerator = (history,topicIndex,topics) =>{
    //array of objects la question irrukum
    const selectedTopic = topics[topicIndex]

    let prompt = `The topic is : ${selectedTopic} \n Here is the history of the last questions and answers:  `;
    if(history.length > 5){
        history = history.slice(-5).reverse();
    }
    history.forEach((q, index) => {
        prompt += `\n${index + 1}. Question: "${q.question}" Answer: "${q.answer}"`;
    });

    prompt +="\n Generate the next MCQ considering the user's performance."

    return prompt ;
}

module.exports = questionGenerator;