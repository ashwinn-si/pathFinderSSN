const mongoose = require("mongoose")

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
  }
})

const loginModel = mongoose.model("userLogin",userSchema);

module.exports = loginModel;