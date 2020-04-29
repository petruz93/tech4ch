const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: String,
  code: String,
  group: String
});

module.exports = mongoose.model('Visitor', visitorSchema);
