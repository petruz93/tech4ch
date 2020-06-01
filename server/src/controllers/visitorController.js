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

async function findAllVisitors() {
  const query = Visitor.find({}, '-__v');
  const visitors = await query.exec();
  return visitors;
}

async function getAllVisitors(req, res) {
  const visitors = await findAllVisitors();
  res.json(visitors);
}

// const getAllVisitorsAndMap = async (req, res, next) => {
//   const q1 = Visitor.find();
// };


// router.get('/visitors/test', getVisitor);
router.get('/visitors/all', getAllVisitors);
// router.get('/alldata', getAllData);

module.exports = router;
