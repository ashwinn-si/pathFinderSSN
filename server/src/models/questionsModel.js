const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question : String,
    answer : String,
    topicIndex : Number
})

const questionsSchema = new mongoose.Schema({
    email : String,
    questions : [questionSchema, ]
})

const questionsModel = mongoose.model("Questions", questionsSchema);

module.exports = questionsModel;