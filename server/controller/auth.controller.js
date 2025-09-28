import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import User from "../model/user.model.js";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;


export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validUser = await User.findOne({ username });

    if (!validUser) return next(errorHandler(404, "ተጠቃሚ አልተገኘም"));



const validPassword = await bcrypt.compareSync(password, validUser.password);
console.log("Password valid:", validPassword);

    if (!validPassword) return next(errorHandler(401, "ስም እና የሚስጥር ቁልፍ ትክክል አይደለም"));
    
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (err) {
    next(err);
  }
};


export const getMe = (req, res) => {
  const token = req.cookies.access_token; // get cookie
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ id: decoded.id, role: decoded.role });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
