const express = require('express');
const path = require('path');
const csv = require('csvtojson');
// const Visit = require('../models/visit');

const router = express.Router();

const getVisits = (req, res, next) => {
  const pathfile = path.join(__dirname, '../files/visitors_grouping.csv');
  csv({
    headers: ['visitorID', 'groupID', 'groupSize', 'date', 'startTime', 'endTime', 'blind', 'headphones', '', 'note', '', 'defect'],
    includeColumns: /(visitorID|groupID|date|start|end)/
  }).fromFile(pathfile)
    .then((jsonObj) => {
      res.json(jsonObj);
    }).catch((err) => {
      next(err);
    });
};

router.get('/visits', getVisits);

module.exports = router;
