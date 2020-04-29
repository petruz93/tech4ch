const express = require('express');
const path = require('path');
const csv = require('csvtojson');

const router = express.Router();

// function cleanPresentations(presentations) {
//   for (let i = 0; i < presentations.length; i++) {
//     const elem = presentations[i][4];
//     presentations[i].splice(3, 10, elem);
//   }
// }

// function visitorEventsFromCsv(csvLines) {
//   const len1 = [];
//   for (let i = 0; i < csvLines.length; i++) {
//     if (csvLines[i].length === 1) {
//       len1.push(i);
//     }
//   }
//   const positions = csvLines.slice(len1[0] + 1, len1[1]);
//   const presentations = csvLines.slice(len1[1] + 1, len1[2]);
//   cleanPresentations(presentations);

//   return { positions, presentations };
// }

function visitorEvents(csvLines) {
  const flags = [];
  for (let i = 0; i < csvLines.length; i++) {
    if (csvLines[i].startTime === 'Positions'
    || csvLines[i].startTime === 'presentations'
    || csvLines[i].startTime === 'events') {
      // console.log('flag:', i, csvLines[i].startTime);
      flags.push(i);
    }
  }
  const positions = csvLines.slice(flags[0] + 1, flags[1]);
  const presentations = csvLines.slice(flags[1] + 1, flags[2]);

  return { positions, presentations };
}

const getVisitor = (req, res) => {
  const pathfile = path.join(__dirname, '../files/visitors-log/visitor_195_146.csv');
  csv({
    // output: 'csv',
    noheader: true,
    headers: ['startTime', 'endTime', 'exhibit', '', 'ended'],
    includeColumns: /(Time|exhibit|ended)/,
    ignoreEmpty: true
  }).fromFile(pathfile)
    .then((jsonFile) => {
      res.json(visitorEvents(jsonFile));
      // res.json(visitorEventsFromCsv(csvLines));
    })
    .catch((err) => {
      console.error(err);
    });
};

router.get('/visitors', getVisitor);

module.exports = router;
