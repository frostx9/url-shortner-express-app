const express = require("express")
const router = express.Router()

const { expressjwt: jwt } = require("express-jwt")
const checkJwt = jwt({ secret: process.env.SECRET, algorithms: ["HS256"] })

const auth = require("./auth")
const url = require("./urls")
const user = require("./users")

router.post("/user/login", auth.post)

// router.all("*", checkJwt, (err, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).send("Invalid Token")
//   } else {
//     next()
//   }
// })

router.post("/create", url.post)
router.get("/:id", url.get)
router.get("/analytics/:id", url.analytics)

router.post("/signup/create", user.post)

module.exports = router
