function subTopicDescriptionPromptGenerator(modules,topic){
    let prompt = `The Topic is : ${topic} \nThe subTopics are : `
    modules.forEach((module,index) => {
        prompt +=`\n${index+1}. ${module.title}`
    })
    return (prompt)
}
module.exports = subTopicDescriptionPromptGenerator;