import { errorHandler } from "../utils/error.js";

export const signin = async (req, res, next) => {
  // console.log("abushe")
  try {
    const { username, password } = req.body;

    if (username === 'abushe' && password === 'abushe123') {
      res.status(200).json("አሁን መቀየር  ትችላለህ"); 
    } else {
      next(errorHandler(401, 'አልተፈቀደም')); 
    }

  } catch (err) {
    next(err);
  }
};