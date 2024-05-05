const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 2000,
})
module.exports = db
