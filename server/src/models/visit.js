const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: String,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model('Visit', visitSchema);
