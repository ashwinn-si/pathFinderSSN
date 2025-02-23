const express = require("express")
const app = express();
const authRoutes = require("./routes/authRoutes")
const aiRoutes = require("./routes/aiRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const roadmapRoutes = require("./routes/roadmapRoutes")
const questionGenerationRoutes = require("./routes/questionGenerationRoutes")
const roadMapGenerationRoutes = require("./routes/roadmapGenerationRoutes")
const cors = require("cors")
const cookie_parse = require("cookie-parser");

app.use(express.json())
app.use(cookie_parse())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/ai",aiRoutes)
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user/roadmap",roadmapRoutes)
app.use("/api/questionGeneration",questionGenerationRoutes)
app.use("/api/roadMapGeneration",roadMapGenerationRoutes)

module.exports = app