const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({

  sortId: {
    type: String,
    require: true,
    unique: true
  },

  redirectUrl: {
    type: String,
    require: true
  },

  visitHistory: [{
    timeStamp: {
      type: Number
    }
  }]
})

urlSchema.set("timestamps", true)
urlSchema.set("toJSON", { virtuals: true })
urlSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("url", urlSchema)
