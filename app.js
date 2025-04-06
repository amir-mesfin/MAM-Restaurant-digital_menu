const express = require('express');
const dotenv = require('dotenv').config();
const mainRoutes = require('./routes/main');
const ejs = require('ejs');


const app =  express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


// Use main routes
app.use('/', mainRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});