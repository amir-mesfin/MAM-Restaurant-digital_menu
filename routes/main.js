const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home');
});

// Menu page
router.get('/menu', (req, res) => {
  // Optional: pass in menu items from database
  res.render('menu');
});

// Reservations page
router.get('/reservations', (req, res) => {
  res.render('reservations');
});

// About page
router.get('/about', (req, res) => {
  res.render('about');
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact');
});

// Order page
router.get('/order', (req, res) => {
  res.render('order');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
