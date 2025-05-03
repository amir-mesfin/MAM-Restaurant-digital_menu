// controllers/authController.js
const passport = require('passport');
const User = require('../models/User');

// Render home page
exports.getHome = (req, res) => {
  res.render('home');
};

// Render register page
exports.getRegister = (req, res) => {
  res.render('register');
};

// Render login page
exports.getLogin = (req, res) => {
  res.render('login');
};

// Handle registration (POST request)
exports.postRegister = (req, res) => {
  const { fullName, username, password } = req.body;
  const newUser = new User({ name: fullName, username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/menu'));
  });
};

// Handle login (POST request)
exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const loginUser = new User({ username, password });

  req.login(loginUser, (err) => {
    if (err) {
      console.log(err);
      return res.redirect('/login');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/menu'));
  });
};

// Google OAuth authentication
exports.getGoogleAuth = passport.authenticate('google', { scope: ['profile'] });

// Google OAuth callback
exports.getGoogleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/menu');
};

// Menu page (requires authentication)
exports.getMenu = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('menu');
};
