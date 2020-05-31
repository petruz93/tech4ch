const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  visitorID: String,
  groupID: String,
  startVisit: String,
  endVisit: String,
  positions: [
    {
      startTime: String,
      endTime: String,
      exhibit: String
    }
  ],
  presentations: [
    {
      startTime: String,
      endTime: String,
      exhibit: String,
      ended: String
    }
  ]
});

module.exports = mongoose.model('Visitor', visitorSchema);
