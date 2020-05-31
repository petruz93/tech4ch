const fs = require('fs');
const csv = require('csvtojson');
const Visitor = require('../models/visitor');

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

function csv2json(filepath, options) {
  return new Promise((resolve, reject) => {
    csv(options).fromFile(filepath)
      .then((jsonFile) => resolve(jsonFile))
      .catch((err) => reject(err));
  });
}

function csv2visitor(filepath) {
  return new Promise((resolve, reject) => {
    const options = {
      noheader: true,
      headers: ['startTime', 'endTime', 'exhibit', '', 'ended'],
      includeColumns: /(Time|exhibit|ended)/,
      ignoreEmpty: true
    };
    csv2json(filepath, options)
      .then((jsonFile) => resolve(visitorEvents(jsonFile)))
      .catch((err) => reject(err));
  });
}

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
async function readAllVisitorsFromDir(dirname) {
  try {
    const filenames = await readdirAsync(dirname);
    const fullFilenames = filenames.map((file) => dirname + file);
    const files = await Promise.all(fullFilenames.map(csv2visitor));
    const visitors = [];
    for (let i = 0; i < files.length; i++) {
      const v = new Visitor();
      v.visitorID = filenames[i].slice(8, 11);
      v.groupID = filenames[i].slice(12, 15);
      v.startVisit = files[i].positions[0].startTime;
      v.endVisit = files[i].positions[files[i].positions.length - 1].endTime;
      v.positions = files[i].positions;
      v.presentations = files[i].presentations;
      visitors.push(v);
    }
    return visitors;
  } catch (err) {
    throw new Error(err.message);
  }
}


module.exports = {
  csv2json, csv2visitor, readAllVisitorsFromDir
};
