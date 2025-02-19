const mongoose = require("mongoose")


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
  }
})

const loginModel = mongoose.model("userLogin",userSchema);

module.exports = loginModel;