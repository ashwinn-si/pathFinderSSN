const mongoose = require('mongoose')
require("dotenv").config()

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("MongoDB Connected")
    }).catch(err=>{
        console.log("unable to connect to mongoDB")
    })
}

module.exports = dbConnect;