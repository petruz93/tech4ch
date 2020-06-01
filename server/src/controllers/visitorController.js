const express = require('express');
const visitorService = require('../services/visitorService');

const router = express.Router();

async function getAllVisitors(req, res) {
  const visitors = await visitorService.findAllVisitors();
  res.json(visitors);
}

router.get('/visitors', getAllVisitors);

module.exports = router;
