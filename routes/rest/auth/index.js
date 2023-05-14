const jwt = require("jsonwebtoken")
const User = require("../../../models/user")

module.exports = {
  async post(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email, password }).exec()
      if (!user) {
        return res.render("login")
      }

      const payload = {
        _id: user._id,
        email: user.email
      }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 3600 * 24 * 1
      })

      return res.redirect("/")
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  }
}
