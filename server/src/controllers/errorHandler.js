const express = require('express');

const router = express.Router();

router.all('*', (req, res) => {
  res.status(404).send('Resource Not Found');
});

// router.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send('Oops... something went wrong! Internal Server Error.');
// });

module.exports = router;
