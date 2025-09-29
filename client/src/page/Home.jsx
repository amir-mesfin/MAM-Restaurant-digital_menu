import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [foodError, setFoodError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/showCatagory");
      setCategories(res.data);
    } catch (err) {
      setCategoryError("የምድብ መረጃ ማምጣት አልተቻለም");
    }
  };

  const fetchAllFood = async () => {
    try {
      const res = await api.get("/food/getAllFood");
      setFoods(res.data);
    } catch (err) {
      setFoodError("ምግብ ማምጣት አልተቻለም");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAllFood();
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="text-center italic text-3xl  text-[#784115] font-bold ">የሁሉም ምግቦች እና መጠጦች</h1>
      {categoryError && <p className="text-red-500">{categoryError}</p>}
      {foodError && <p className="text-red-500">{foodError}</p>}
       
      {categories.map((category) => (
        <div key={category._id} className="mb-12">
        
          <h2 className="font-bold mb-4 border-[#784115]  text-amber-600 italic pb-3 border-b-4  text-4xl">{category.catagoryName}</h2>

          {/* Food List inside Category */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {foods
              .filter((food) => food.foodCategory === category.catagoryName) 
              .map((food) => (
                <div
                  key={food._id}
                  className="border rounded-lg shadow-md p-4 text-center bg-white"
                >
                  <h3 className="font-semibold">{food.foodName}</h3>
                  <p className="text-gray-600">{food.foodDescription}</p>
                  <p className="text-orange-600 font-bold mt-2">
                    {food.foodPrice} ብር
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
