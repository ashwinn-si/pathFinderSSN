const express = require("express")
const app = express();
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/api/auth",authRoutes)

module.exports = app