const User = require("../../../models/user")

module.exports = {
  async psot(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email, password }).exec()

      if (!user) {
        return res.render("login")
      }

      return res.redirect("/")
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  }
}
