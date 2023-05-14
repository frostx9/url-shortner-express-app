const express = require("express")
const router = express.Router()

const url = require("./urls")

router.post("/create", url.post)
router.get("/sorturl/:id", url.get)
router.get("/analytics/:id", url.analytics)

module.exports = router
