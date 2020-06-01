const express = require('express');
const visitorService = require('../services/visitorService');
const poiService = require('../services/poiService');

const router = express.Router();

async function getAllData(req, res) {
  const visitorsData = await visitorService.findAllVisitors();
  const mapData = await poiService.findAllPointOfInterests();
  res.json({ visitorsData, mapData });
}

router.get('/alldata', getAllData);

module.exports = router;
