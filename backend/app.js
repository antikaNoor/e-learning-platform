const express = require('express')
const cors = require("cors")
const databaseConnection = require('./config/database')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth/authRoutes')
const courseRouter = require('./routes/course/courseRoutes')
const lessonRouter = require('./routes/course/lessonRoutes')
const categoryRouter = require('./routes/course/categoryRoutes')
const topicRouter = require('./routes/course/topicRoutes')
const quizRouter = require('./routes/course/quizRoutes')
const assignmentRouter = require('./routes/course/assignmentRoutes')
const cartRouter = require('./routes/subscription/cartRoutes')
const wishListRouter = require('./routes/subscription/wishListRoutes')
const notificationRouter = require('./routes/notification/notificationRoutes')
const forumRouter = require('./routes/studentSupport/forumRoutes')
const reviewRouter = require('./routes/review/reviewRoutes')

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).send({ message: "Invalid JSON syntax!" })
    }
    next()
})

app.use("/auth", authRouter)
app.use("/course", courseRouter)
app.use("/lesson", lessonRouter)
app.use("/category", categoryRouter)
app.use("/topic", topicRouter)
app.use("/quiz", quizRouter)
app.use("/assignment", assignmentRouter)
app.use("/cart", cartRouter)
app.use("/wishlist", wishListRouter)
app.use("/notification", notificationRouter)
app.use("/forum", forumRouter)
app.use("/review", reviewRouter)

// using route() method to get the invalid routes
app.route('*')
    .get((req, res) => {
        res.status(400).send("Invalid route!")
    })
    .put((req, res) => {
        res.status(400).send("Invalid route!")
    })
    .post((req, res) => {
        res.status(400).send("Invalid route!")
    })
    .delete((req, res) => {
        res.status(400).send("Invalid route!")
    })

databaseConnection(() => {
    app.listen(3000, () => {
        // console.log(process.env.JWT_SECRET)
        console.log("Server is running on 3000...")
    })
})
