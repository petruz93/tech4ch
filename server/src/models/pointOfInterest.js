const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  x: String,
  y: String,
  name: String,
  type: String,
  room: String,
  backName: String
});

module.exports = mongoose.model('Point_of_interest', poiSchema);
