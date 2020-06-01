const express = require('express');
// const path = require('path');
// const parser = require('../utility/csvParser');
// const mapData = require('../files/map-data');
const Visitor = require('../models/visitor');

const router = express.Router();

// const getVisitor = (req, res, next) => {
//   const filepath = path.join(__dirname, '../files/visitors-log/visitor_342_257.csv');
//   parser.csv2visitor(filepath)
//     .then((value) => res.json(value))
//     .catch((err) => next(err));
// };

// const getAllVisitors = async (req, res, next) => {
//   const dirpath = path.join(__dirname, '../files/visitors-log/');
//   try {
//     const visitorsData = await parser.readAllVisitorsFromDir(dirpath);
//     res.json(visitorsData);
//   } catch (err) {
//     next(err);
//   }
// };

const getAllVisitors = async (req, res, next) => {
  const query = Visitor.find({}, '-_id -__v');
  query.exec((err, visitors) => {
    if (err) next(err);
    // return visitors;
    res.json(visitors);
  });
};

// const getAllVisitorsAndMap = async (req, res, next) => {
//   const q1 = Visitor.find();
// };


// router.get('/visitors/test', getVisitor);
router.get('/visitors/all', getAllVisitors);
// router.get('/alldata', getAllVisitorsAndMap);

module.exports = router;
