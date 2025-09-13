import { errorHandler } from "../utils/error.js"
// import mongoose from "mongoose"
import catagory from "../model/catagory.model.js"

export const addCatagory = async (req,res,next)=>{
  const {catagoryName, url} = req.body;
   try{
      const check =  await catagory.findOne({catagoryName}).lean();
      if(check){
        return next(errorHandler(409,`${catagoryName} already exist`));
      }
     const newCategory = new catagory({catagoryName, url});
      newCategory.save();

      res.status(200).json('Category added successfully');

   }catch(err){
    next(err);
   }
}

export const showCatagory = async(req, res, next) => {
       try{
         const allCategory = await catagory.find();
         if(!allCategory){
          return next(errorHandler(404,'there is one category'));
         }
         res.status(200).json(allCategory);
         console.log(allCategory);
       }catch(err){
           next(err);
       }
}