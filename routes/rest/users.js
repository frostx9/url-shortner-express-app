const User = require("../../models/user")

module.exports = {
  async post(req, res) {
    try {
      console.log("in Here".debug)
      const { name, email, password } = req.body

      await User.create({
        name,
        email,
        password
      })

      return res.redirect("/login")
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, reason: error.message })
    }
  }
}
