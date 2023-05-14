const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

  name: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

})

userSchema.set("timestamps", true)
userSchema.set("toJSON", { virtuals: true })
userSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("user", userSchema)
