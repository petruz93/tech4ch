const express = require('express');
const path = require('path');
const parser = require('../utility/csvParser');

const router = express.Router();

const getVisits = (req, res, next) => {
  const filepath = path.join(__dirname, '../files/visitors_grouping.csv');
  const options = {
    headers: ['visitorID', 'groupID', 'groupSize', 'date', 'startTime', 'endTime', 'blind', 'headphones', '', 'note', '', 'defect'],
    includeColumns: /(visitorID|groupID|date|start|end)/
  };
  parser.csv2json(filepath, options)
    .then((jsonObj) => res.json(jsonObj))
    .catch((err) => next(err));
};

router.get('/visits', getVisits);

module.exports = router;
