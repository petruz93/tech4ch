const express = require('express');
const path = require('path');
const parser = require('../utility/csvParser');
const mapData = require('../files/map-data');

const router = express.Router();

const getVisitor = (req, res, next) => {
  const filepath = path.join(__dirname, '../files/visitors-log/visitor_342_257.csv');
  parser.csv2visitor(filepath)
    .then((value) => res.json(value))
    .catch((err) => next(err));
};

const getAllVisitors = async (req, res, next) => {
  const dirpath = path.join(__dirname, '../files/visitors-log/');
  try {
    const visitorsData = await parser.readAllVisitorsFromDir(dirpath);
    res.json(visitorsData);
  } catch (err) {
    next(err);
  }
};

const getAllVisitorsAndMap = async (req, res, next) => {
  const dirpath = path.join(__dirname, '../files/visitors-log/');
  try {
    const visitorsData = await parser.readAllVisitorsFromDir(dirpath);
    res.json({ visitorsData, mapData });
  } catch (err) {
    next(err);
  }
};


router.get('/visitors/test', getVisitor);
router.get('/visitors/all', getAllVisitors);
router.get('/alldata', getAllVisitorsAndMap);

module.exports = router;
