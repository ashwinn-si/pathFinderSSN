const mongoose = require("mongoose")

const topicSchema = new mongoose.Schema({
  topic : {
    type : String,
    required : true,
  },
  subTopics : {
    type:[String,]
  }
  
})

const topicModel = mongoose.model("topics",topicSchema);

module.exports = topicModel;