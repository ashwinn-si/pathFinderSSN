const mongoose = require("mongoose")

const subTopicsSchema = new mongoose.Schema({
  subTopic : String,
  modules :[String],
})

const topicSchema = new mongoose.Schema({
  topic : {
    type : String,
    required : true,
  },
  subTopics : {
    type:[subTopicsSchema,]
  }
  
})

const topicModel = mongoose.model("topics",topicSchema);

module.exports = topicModel;