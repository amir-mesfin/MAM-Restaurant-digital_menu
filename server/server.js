import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  connectDB from './config/db.js';
import auth from './router/auth.routes.js'
import category from './router/category.routes.js'
import food from './router/food.routes.js'

dotenv.config();
const  app = express();


app.use(express.json());
 app.use(cors({
   origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE"],
   Credential:true
 }));

 app.use('/api/auth', auth);
 app.use('/api/category', category);
 app.use('/api/food', food);



connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
const port = process.env.PORT


app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server Error';
  return res.status(statusCode).json({
    message,
    success: false,
    statusCode
  });
});

