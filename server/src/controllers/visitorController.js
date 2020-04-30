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

function visitorEvents(csvLines) {
  const flags = [];
  for (let i = 0; i < csvLines.length; i++) {
    if (csvLines[i].startTime === 'Positions'
    || csvLines[i].startTime === 'presentations'
    || csvLines[i].startTime === 'events') {
      flags.push(i);
    }
  }
  const positions = csvLines.slice(flags[0] + 1, flags[1]);
  const presentations = csvLines.slice(flags[1] + 1, flags[2]);
  return { positions, presentations };
}

function csv2visitor(filepath) {
  return new Promise((resolve, reject) => {
    csv(options).fromFile(filepath)
      .then((jsonFile) => resolve(visitorEvents(jsonFile)))
      .catch((err) => reject(err));
  });
}

const getVisitor = (req, res) => {
  // const filepath = path.join(__dirname, '../files/visitors-log/visitor_195_146.csv');
  const filepath = path.join(__dirname, '../files/visitors-log/visitor_342_257.csv');
  csv2visitor(filepath)
    .then((value) => res.json(value))
    .catch((err) => console.error(err));
};

// Make Promise version of fs.readdir()
function readdirAsync(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    });
  });
}

/**
 * Read all csv files in the directory, and using Promise.all
 * to time when all async readFiles has completed.
 */
const getAllVisitors = async (req, res) => {
  const dirpath = path.join(__dirname, '../files/visitors-log/');
  try {
    const filenames = await readdirAsync(dirpath);
    const fullFilenames = filenames.map((file) => dirpath + file);
    console.log(fullFilenames);
    const files = await Promise.all(fullFilenames.map(csv2visitor));
    console.log('Finito!!!');
    const jsonVisitors = [];
    for (let i = 0; i < files.length; i++) {
      jsonVisitors.push({
        visitorID: filenames[i].slice(8, 11),
        groupID: filenames[i].slice(12, 15),
        positions: files[i].positions,
        presentations: files[i].presentations
      });
    }
    res.json(jsonVisitors);
  } catch (err) {
    console.error(err);
  }
};

router.get('/visitors', getVisitor);
router.get('/visitors/all', getAllVisitors);

module.exports = router;
