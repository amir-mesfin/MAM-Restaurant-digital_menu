const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/menu', (req, res) => {
  res.render('menu');
});
module.exports = router;
