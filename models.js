const mongoose = require('mongoose')
const { Schema } = mongoose

const StockSchema = new Schema({
  symbol: { type: String, required: true },
  likes: { type: [String], default: [] },
})

const StockModel = mongoose.model('Stock', StockSchema)

module.exports = StockModel
