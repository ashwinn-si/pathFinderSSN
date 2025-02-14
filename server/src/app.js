const express = require("express")
const app = express();
const authRoutes = require("./routes/authRoutes")
const aiRoutes = require("./routes/aiRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/ai/",aiRoutes)

module.exports = app