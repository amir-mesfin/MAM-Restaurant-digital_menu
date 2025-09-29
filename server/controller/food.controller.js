import Food from "../model/food.model.js";
import Category from "../model/catagory.model.js";
import { errorHandler } from "../utils/error.js";

export const addFood = async (req, res, next) => {
  const { foodName, foodDescription, foodPrice, foodUrl, foodCategory } = req.body;

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
      foodDescription,
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
  // console.log(categoryName);
    if (!food || food.length === 0) {
      // console.log(abushe);

      return next(errorHandler(404, 'በዚህ ምድብ ምግብ አልተገኘም።'));
    }

    res.status(200).json(food);

  } catch (err) {
    next(err);
  }
}

// Update a food
export const updateFood = async (req, res) => {
  // console.log("mohameddddd")
  const { foodId } = req.params;
  const { foodName, foodPrice, foodDescription, foodCategory } = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { foodName, foodPrice, foodDescription, foodCategory },
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