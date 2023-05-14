const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    return res.render("home")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

module.exports = router
