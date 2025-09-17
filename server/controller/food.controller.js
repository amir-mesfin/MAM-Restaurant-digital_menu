import food from "../model/food.model.js";
// import mongoose from "mongoose";
import catagory from "../model/catagory.model.js";
import { errorHandler } from "../utils/error.js";

export const addFood = async (req, res, next) =>{
  const {foodName,
    foodDEscription,
    foodPrice,
    foodUrl,
    foodCategory } = req.body;
  try{
      const foodCheck =await food.findOne(foodName).lean();
      if(foodCheck){
       return next(errorHandler(404,`${foodName} already exist`));
      }

      const categoryCheck = await catagory.findOne(foodCategory).lean();
      if(!categoryCheck){
         return next(errorHandler(404,`${foodCategory} is not exist first add   food category`));
      }

      const newFood = new food({foodName,
                                foodDEscription,
                                foodPrice,
                                foodUrl,
                                foodCategory });
      
    await newFood.save();
    res.status(200).json('ምድቡ በትክክል ታክሏል');
      
  }catch(err){
    next(err);
  }
}