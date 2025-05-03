const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

router.post('/register', (req, res) => {
  const { fullName, username, password } = req.body;
  const newUser = new User({ name: fullName, username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/menu'));
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const loginUser = new User({ username, password });

  req.login(loginUser, (err) => {
    if (err) {
      console.log(err);
      return res.redirect('/login');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/menu'));
  });
});

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/menu', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => res.redirect('/menu'));

router.get('/menu', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.render('menu');
});

module.exports = router;
