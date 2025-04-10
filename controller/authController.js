const passport = require('passport');
const User = require('../model/User');

//  for get method
exports.getLogin = (req, res) => res.render('login');
exports.getRegister = (req, res) => res.render('register');


exports.registerUser =  (req, res) => {
  const { username, userEmail, password } = req.body;

  User.register({ username },userEmail, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/register');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/menu'); // or wherever you want after register
    });
  });
};

// exports.loginUser = passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// });

// exports.logoutUser = (req, res) => {
//   req.logout(err => {
//     if (err) return next(err);
//     res.redirect('/login');
//   });
// };