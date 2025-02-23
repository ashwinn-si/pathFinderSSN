const { createCollection, addQuestion, getQuestions} = require("./chromaDB")
const questionsModel = require("./../../models/questionsModel")

const saveQuestionController = async(req,res)=>{
    try{

        const email  = req.user.email;
        const question = req.body.question;
        const answer = req.body.answer;
        const topicIndex = req.body.topicIndex;

        const userQuestion = await questionsModel.findOne({email})

        if(userQuestion){
            const questionList = userQuestion.questions;
            userQuestion.questions.push({
                question: question,
                answer: answer,
                topicIndex: topicIndex,
            })
            await userQuestion.save()
        }else{
            const newUserQuestion = new
            questionsModel({
                email : email,
                questions : [
                    {
                        question : question,
                        answer : answer,
                        topicIndex : topicIndex
                    }
                ]
            })
            await newUserQuestion.save()

        }

        //using chroma db
        // await createCollection(email);
        // await addQuestion(email, question, answer, topicIndex);

        res.status(200).json({message : "question saved"})
    }catch (error){
        res.json({message: error});
    }

}
module.exports = saveQuestionController;