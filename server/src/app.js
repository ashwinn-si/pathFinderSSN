const express = require("express")
const app = express();
const authRoutes = require("./routes/authRoutes")
const aiRoutes = require("./routes/aiRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/api/auth",authRoutes)
// app.use("/api/ai",aiRoutes)
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)

module.exports = app