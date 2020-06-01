const Poi = require('../models/pointOfInterest');

function pois2map(pois) {
  const result = {};
  pois.forEach((p) => {
    result[p.name] = {
      x: p.x,
      y: p.y,
      room: p.room
    };
  });
  return result;
}

exports.findAllPointOfInterests = async () => {
  const query = Poi.find({}, '-_id -__v');
  const pois = await query.exec();
  return pois2map(pois);
};
