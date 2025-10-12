import Food from "../model/food.model.js";
import Category from "../model/catagory.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

export const addFood = async (req, res, next) => {
  const { foodName, foodDescription, foodPrice, foodUrl, foodCategory } = req.body;

  try {
    // Check if food name already exists
    const foodCheck = await Food.findOne({ foodName }).lean();
    if (foodCheck) {
      return next(errorHandler(409, `ምግብ "${foodName}" አስቀድሞ ተመዝግቧል`));
    }

    // Verify that category ID exists
    const categoryCheck = await Category.findById(foodCategory).lean();
    if (!categoryCheck) {
      return next(errorHandler(404, `የተመረጠው የምድብ ID አይታወቅም።`));
    }

    // Create new food directly using ObjectId
    const newFood = new Food({
      foodName,
      foodDescription,
      foodPrice,
      foodUrl,
      foodCategory, // already ObjectId
    });

    await newFood.save();
    res.status(201).json({ message: `ምግብ "${foodName}" በትክክል ታክሏል ✅` });
  } catch (err) {
    next(err);
  }
};


export const getFoodByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    // console.log('Received categoryId:', categoryId);

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const foods = await Food.find({ foodCategory: categoryObjectId })
      .populate('foodCategory', 'catagoryName url catagoryDescription1 catagoryDescription2');

    // console.log('Found foods:', foods);

    if (!foods || foods.length === 0) {
      return next(errorHandler(404, 'በዚህ ምድብ ምግብ አልተገኘም።'));
    }

    res.status(200).json(foods);

  } catch (err) {
    console.error(err);
    next(err);
  }
}


// Update a food
export const updateFood = async (req, res) => {
  const { foodId } = req.params;
  const { foodName, foodPrice, foodDescription, foodCategory, foodUrl } = req.body; // ✅ add foodUrl

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { foodName, foodPrice, foodDescription, foodCategory, foodUrl }, // ✅ include foodUrl
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating food' });
  }
};


export const deleteFood = async (req, res, next) => {
  const { foodId } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json({ message: 'Food successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting food' });
  }
};

export const GetAllFood = async (req, res, next) => {
  try {
    const allFood = await Food.find();

    if (allFood.length === 0) {
      return next(errorHandler(404, 'No food found'));
    }

    res.status(200).json(allFood);
  } catch (err) {
    next(err);
  }
};