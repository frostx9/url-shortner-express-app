const express = require("express")
const router = express.Router()

const url = require("./urls")

router.post("/create", url.post)

module.exports = router
