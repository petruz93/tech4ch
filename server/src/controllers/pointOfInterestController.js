const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const xml2js = require('xml2js');
// const mapData = require('../files/map-data');
const Poi = require('../models/pointOfInterest');

const router = express.Router();

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

const getMapData = (req, res, next) => {
  const query = Poi.find({}, '-_id -__v');
  query.exec((err, pois) => {
    if (err) next(err);
    res.json(pois2map(pois));
    // return pois2map(pois);
  });
};

// const getMapDataJson = (req, res) => {
//   const filepath = path.join(__dirname, '../files/map-data.json');
//   fs.readFile(filepath, (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.json(JSON.stringify(data.toString()));
//     }
//   });
// };

// const parser = new xml2js.Parser({
//   explicitArray: false,
//   explicitRoot: false,
//   mergeAttrs: true
// });

// const getMapDataXml = (req, res) => {
//   const filepath = path.join(__dirname, '../files/map-data.xml');
//   fs.readFile(filepath, (err, xmlData) => {
//     if (err) {
//       console.error(err);
//     } else {
//       parser.parseStringPromise(xmlData)
//         .then((jsonData) => {
//           res.json(jsonData);
//         })
//         .catch((error) => {
//           console.error(error);
//           res.end();
//         });
//     }
//   });
// };

router.get('/map', getMapData);

module.exports = router;
