import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  connectDB from './config/db.js';

 const  app = express();
 app.use(express.cors({
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "DELETE"],
   Credential:true
 }))
dotenv.config();


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
const port = process.env.PORT || 8000 ;


