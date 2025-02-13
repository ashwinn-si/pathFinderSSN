const express = require("express")
const app = require("./src/app")
const dotenv = require("dotenv")
dotenv.config();

const dbConnect = require("./src/cofig/dbConnect")

dbConnect();

app.listen(5000,()=>{
    console.log("server started")
})