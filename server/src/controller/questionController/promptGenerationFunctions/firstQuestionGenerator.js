function firstQuestionGenerator (index, topics, ratings) {
    const topic = topics[index]

    const topicRating = ratings[index]

    return `The user has rated himself in the topic ${topic} : ${topicRating} On the scale of 5. Generate an MCQ based on the user's skills.Only Give the question and answer`

}

module.exports = firstQuestionGenerator;