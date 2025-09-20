import Food from "../model/food.model.js";
import Category from "../model/catagory.model.js";
import { errorHandler } from "../utils/error.js";

export const addFood = async (req, res, next) => {
  const { foodName, foodDEscription, foodPrice, foodUrl, foodCategory } = req.body;

  try {
    // የምግቡ አስቀድሞ ካለ አረጋግጥ
    const foodCheck = await Food.findOne({ foodName }).lean();
    if (foodCheck) {
      return next(errorHandler(409, `ምግብ "${foodName}" አስቀድሞ ተመዝግቧል`));
    }

    // የምድብ አስቀድሞ ካልተመዘገበ አስተውል
    const categoryCheck = await Category.findOne({ catagoryName: foodCategory }).lean();
    if (!categoryCheck) {
      return next(
        errorHandler(404, `የምድብ "${foodCategory}" አልተገኘም። አስቀድሞ የምድብ መመዝገብ ያስፈልጋል።`)
      );
    }

    // አዲስ ምግብ ፍጠር
    const newFood = new Food({
      foodName,
      foodDEscription,
      foodPrice,
      foodUrl,
      foodCategory,
    });

    await newFood.save();
    res.status(201).json(`ምግብ "${foodName}" በትክክል ታክሏል ✅`);
  } catch (err) {
    next(err);
  }
};


export const getFoodByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const food = await Food.find({ foodCategory: categoryName });
  console.log(categoryName);
    if (!food || food.length === 0) {
      console.log(abushe);

      return next(errorHandler(404, 'በዚህ ምድብ ምግብ አልተገኘም።'));
    }

    res.status(200).json(food);

  } catch (err) {
    next(err);
  }
}
