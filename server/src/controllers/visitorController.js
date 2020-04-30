const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const router = express.Router();
const options = {
  noheader: true,
  headers: ['startTime', 'endTime', 'exhibit', '', 'ended'],
  includeColumns: /(Time|exhibit|ended)/,
  ignoreEmpty: true
};

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

function csv2visitorFromFile(filepath) {
  return new Promise((resolve, reject) => {
    csv(options).fromFile(filepath)
      .then((jsonFile) => {
        resolve(visitorEvents(jsonFile));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function csv2visitorFromStr(csvStr) {
  return new Promise((resolve, reject) => {
    csv(options).fromString(csvStr)
      .then((jsonFile) => {
        resolve(visitorEvents(jsonFile));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const getVisitor = (req, res) => {
  // const filepath = path.join(__dirname, '../files/visitors-log/visitor_195_146.csv');
  const filepath = path.join(__dirname, '../files/visitors-log/visitor_342_257.csv');
  csv2visitorFromFile(filepath)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Make Promise version of fs.readdir()
fs.readdirAsync = (dirname) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    });
  });
};

// Make Promise version of fs.readFile()
fs.readFileAsync = (filename, enc) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, enc, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Utility function, return Promise
function getFile(filename) {
  return fs.readFileAsync(filename, 'utf8');
}

/**
 * Read all json files in the directory, and using Promise.all
 * to time when all async readFiles has completed.
 */
const getAllVisitors = (req, res) => {
  const dirpath = path.join(__dirname, '../files/visitors-log/');
  fs.readdirAsync(dirpath)
    .then((filenames) => {
      const fullFilenames = filenames.map((file) => dirpath + file);
      console.log(fullFilenames);
      return Promise.all(fullFilenames.map(getFile));
    })
    .then((files) => {
      console.log('Finito!!!');
      res.json(files);
    })
    .catch((err) => {
      console.error(err);
    });
};

router.get('/visitors', getVisitor);
router.get('/visitors/all', getAllVisitors);

module.exports = router;
