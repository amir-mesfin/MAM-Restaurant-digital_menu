const express = require('express');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/authRouters');


const app =  express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

// session set uo
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
  }));

// passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  mongoose.connect("mongodb://localhost:27017/RestaurantDB");


// Use main routes
app.use('/', mainRoutes);
app.use('/', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});