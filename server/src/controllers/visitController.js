const express = require('express');
const path = require('path');
const csv = require('csvtojson');
// const Visit = require('../models/visit');

const router = express.Router();

const getVisits = (req, res) => {
  const pathfile = path.join(__dirname, '../files/visitors_grouping.csv');
  csv({
    headers: ['visitorId', 'group', 'groupSize', 'date', 'startTime', 'endTime', 'blind', 'headphones', '', 'note', '', 'defect'],
    includeColumns: /(visitorId|group$|date|start|end)/
  }).fromFile(pathfile)
    .then((jsonObj) => {
      res.json(jsonObj);
    }).catch((err) => {
      console.error(err);
    });
};

router.get('/visits', getVisits);

module.exports = router;
