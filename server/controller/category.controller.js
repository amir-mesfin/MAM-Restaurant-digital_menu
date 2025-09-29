import { errorHandler } from "../utils/error.js"
import catagory from "../model/catagory.model.js"

// ምድብ መጨመር
export const addCatagory = async (req,res,next)=>{
  const {catagoryName, url, catagoryDescription2, catagoryDescription1} = req.body;
   try{
      const check =  await catagory.findOne({catagoryName}).lean();
      if(check){
        return next(errorHandler(409,`'${catagoryName}' አስቀድሞ አለ`));
      }
     const newCategory = new catagory({catagoryName, url,  catagoryDescription2, catagoryDescription1});
      await newCategory.save();

      res.status(200).json('ምድቡ በትክክል ታክሏል');
   }catch(err){
    next(err);
   }
}

// ምድቦችን ማሳየት
export const showCatagory = async(req, res, next) => {
       try{
         const allCategory = await catagory.find();
         if(!allCategory || allCategory.length === 0){
          return next(errorHandler(404,'ምንም ምድብ አልተገኘም'));
         }
         res.status(200).json(allCategory);
       }catch(err){
           next(err);
       }
}

// ምድብ ማሻሻል
export const updateCategory = async(req, res , next)=>{
    const { categoryID } = req.params;  
    const { catagoryName, url, catagoryDescription2, catagoryDescription1 } = req.body; 
  
    try {
      const updated = await catagory.findByIdAndUpdate(
        categoryID,
        { catagoryName, url,  catagoryDescription2, catagoryDescription1 },
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: "ምድቡ አልተገኘም" });
  
      res.json({ message: "ምድቡ በትክክል ተሻሽሏል", updated });
  }catch(err){
    next(err);
  }
} 

// ምድብ ማጥፋት
export  const deleteCategory = async (req, res, next)=>{
  const { categoryID } = req.params;  

  try {
    const deleted = await catagory.findByIdAndDelete(categoryID);
    if (!deleted) return res.status(404).json({ message: "ምድቡ አልተገኘም" });

    res.json({ message: "ምድቡ በትክክል ተሰርዟል" });
  } catch (err) {
    res.status(500).json({ message: "የሰርቨር ችግር ተከስቷል", error: err.message });
  }
}
