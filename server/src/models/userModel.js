const mongoose = require("mongoose")

const linksSchema = new mongoose.Schema({
  topic : String,
  link : String
})

const moduleSchema = new mongoose.Schema({
  // id will generate in front end
  title : String,
  description : String,
  status : {
    type : String,
    enum : ["completed","current","uncompleted"],
    default : "uncompleted"
  },
  links : [linksSchema,]
})

const roadMapSchema = new mongoose.Schema({
  roadMapID : Number,
  skillName : String,
  dateOfCreation : String,
  modules :{
    type : [moduleSchema,],
    default :[]
  }
})

const questionSchema = new mongoose.Schema({
  question : String,
  answer : String,
  options : [String,]
})

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  otp :{
    type : String,
    required : true
  },
  skillTopic : {
    type : String,
    default : ""
  },
  skillSubTopic : {
    type : String,
    default : ""
  },

  roadMaps : {
    type : [roadMapSchema,],
    default : []
  },
})

const loginModel = mongoose.model("userLogin",userSchema);

module.exports = loginModel;