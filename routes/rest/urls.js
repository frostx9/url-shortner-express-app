const shortid = require("shortid")
const URL = require("../../models/url")

module.exports = {

  async post(req, res) {
    try {
      const { originalUrl } = req.body

      if (typeof originalUrl === "undefined") return res.status(400).json({ error: true, reason: "Origianl URL is Requiered" })

      const shortId = shortid.generate(7)
      console.log(shortId.verbose)

      await URL.create({
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
  },

  // eslint-disable-next-line consistent-return
  async get(req, res) {
    try {
      const { id } = req.params
      if (typeof id === "undefined") return res.status(400).json({ error: true, reason: "Sort Id is Required" })

      const entry = await URL.findOneAndUpdate(
        { sortId: id },
        {
          $push: {
            visitHistory: {
              timeStamp: Date.now()
            }
          }
        }
      )
      res.redirect(entry.redirectUrl)
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  },

  async analytics(req, res) {
    try {
      const { id } = req.params
      if (typeof id === "undefined") return res.status(400).json({ error: true, reason: "Sort Id is Required" })

      const url = await URL.findOne({ sortId: id }).exec()

      const count = url.visitHistory.length

      return res
        .status(200)
        .json({ error: false, data: count })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  }

}
