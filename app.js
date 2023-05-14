const createError = require("http-errors")
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
const helmet = require("helmet")
const xss = require("xss-clean")
const colors = require("colors")
require("dotenv").config()

const agenda = require("./agenda")
require("./agenda/agenda_jobs")(agenda)

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red"
})

const restRouter = require("./routes/rest/index")
const webRouter = require("./routes/web")
// const adminRouter = require("./routes/admin")

/**
 * app.use(function (req, res, next) {
  if (!req.user) return next(createError(401, 'Please login to view this page.'))
  next()
})
 */

const app = express()

// Set Sequrity Header -  To Make Api More Secure
if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== "development") {
  app.use(helmet())
}

app.use(cors())

// Sanitize Data
app.use(mongoSanitize())

// To Parser Request Body
app.use(express.json())

// To Prevent XSS Attack
app.use(xss())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// view engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: false })) // To Support Form Data
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", webRouter)
app.use(`/v${process.env.API_VERSION}`, restRouter)
// app.use(`/admin/v${process.env.API_VERSION}`, adminRouter)

// Agenda
agenda.on("ready", async () => {
  console.log("Agenda starting -_-".info)
  await agenda.start()
  console.log("Agenda started ^_^".info)
  // cron initiator
  // eslint-disable-next-line global-require
  const cronJobs = require("./agenda/cron-jobs")
  await cronJobs(agenda)
})

async function graceful() {
  await agenda.stop()
  console.log("\nAgenda stoped ^o^")
  process.exit(0)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
