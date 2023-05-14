const shortid = require("shortid")
const URL = require("../../models/url")

module.exports = {

  async post(req, res) {
    try {
      const { originalUrl } = req.body

      if (typeof originalUrl === "undefined") return res.status(400).json({ error: true, reason: "Origianl URL is Requiered" })

      const shortId = shortid.generate(7)
      console.log(shortId.verbose)

      const url = await URL.create({
        sortId: shortId,
        redirectUrl: originalUrl
      })

      return res
        .status(200)
        .json({ error: false, data: shortId })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  }
}
