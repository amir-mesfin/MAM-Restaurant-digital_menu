const express = require('express');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// const mainRoutes = require('./routes/main');
// const authRoutes = require('./routes/authRouters');


const app =  express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// session set uo
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
  }));

// // passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

 // connect mongoose db
  mongoose.connect("mongodb://localhost:27017/RestaurantDB");

  //user restaurant schema
const RestaurantSchema = new mongoose.Schema({
      name: {
          type: String,
      },
      username: {
          type: String,
      },
  });


  // Plug in passport-local-mongoose
  RestaurantSchema.plugin(passportLocalMongoose);

  // create model
  const RestaurantUser= mongoose.model("RestaurantUser", RestaurantSchema);

  passport.use(RestaurantUser.createStrategy());
// // Use main routes
// app.use('/', mainRoutes);
// app.use('/', authRoutes);




passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await RestaurantUser.findById(id); // Retrieve full user details from DB
    done(null, user); // Pass 'null' as the first argument when there's no error
  } catch (err) {
    done(err); 
  }
});

app.get('/', (req, res) => {
    res.render('home');
})

app.get("/register",(req,res)=>{
  res.render("register",{

  });
});


app.get("/login",(req,res)=>{
  res.render("login",{

  });
});

// menu 
app.get("/menu", (req,res)=>{

  if((!req.isAuthenticated())){
     return res.redirect("/login")
  } else
  res.render("menu");

})

// post method for register

app.post("/register",(req,res)=>{
  const { fullName, username, password} = req.body;
  // console.log("Body content:", req.body);

  const newUser = new RestaurantUser({ name:fullName, username:username });

  RestaurantUser.register(newUser,password,(err,user)=>{
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, ()=>{
        res.redirect("/menu")
      });  
    }
  });
});

app.post("/login",(req,res)=>{
  const {username,password} = req.body;

  const loginUser = new RestaurantUser({
    username:username,
    password:password
  });
  req.login(loginUser,(err)=>{
  if(err){
    console.log(err);
    res.redirect("/login")
  }else{
    passport.authenticate("local")(req, res, ()=>{
      res.redirect("/menu")
    });
  }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});