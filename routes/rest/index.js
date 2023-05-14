const express = require("express")
const router = express.Router()

const auth = require("./auth")
const url = require("./urls")
const user = require("./users")

router.post("/user/login", auth.psot)

router.post("/create", url.post)
router.get("/:id", url.get)
router.get("/analytics/:id", url.analytics)

router.post("/signup/create", user.post)

module.exports = router
