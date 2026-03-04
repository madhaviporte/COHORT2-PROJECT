const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    credentials: true,
    origin:"https://insta-clone-mu-pied.vercel.app"
}))

// require routes
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

// Root route (for checking if backend is live)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

//using routes 
app.use("/api/auth", authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users", userRouter)

module.exports = app;