const mongoose = require("mongoose")

const linksSchema = new mongoose.Schema({
  topic : String,
  link : String
})

const moduleSchema = new mongoose.Schema({
  id : String,
  title : String,
  description : String,
  status : String,
  links : [linksSchema,]
})

const roadMapSchema = new mongoose.Schema({
  roadMapID : Number,
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
  skill : {
    type : String,
    default : ""
  },
  questions : {
    type : [questionSchema,],
    default : []
  },
  roadMaps : {
    type : [roadMapSchema,],
    default : []
  },
})

const loginModel = mongoose.model("userLogin",userSchema);

module.exports = loginModel;