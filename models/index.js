const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenerSchema = new Schema({
  url: String,
  shortcode: String,
  startDate: Date,
  lastSeenDate: Date,
  redirectCount: Number
})

const Shortener = mongoose.model('Shortener', shortenerSchema);

module.exports = Shortener;