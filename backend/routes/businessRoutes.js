const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Business routes' });
});

module.exports = router;
