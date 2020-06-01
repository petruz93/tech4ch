const Visitor = require('../models/visitor');

exports.findAllVisitors = async () => {
  const query = Visitor.find({}, '-__v');
  const visitors = await query.exec();
  return visitors;
};
