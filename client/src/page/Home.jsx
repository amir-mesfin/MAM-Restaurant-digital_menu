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
    <div className="p-6  mx-auto ">
      <h1 className="text-center italic text-3xl  text-[#784115] font-bold ">የሁሉም ምግቦች እና መጠጦች</h1>
      {categoryError && <p className="text-red-500">{categoryError}</p>}
      {foodError && <p className="text-red-500">{foodError}</p>}

      {categories.map((category) => (
        <div key={category._id} className="mb-12">

          <h2 className="font-bold mb-4 border-[#784115]  text-amber-600 italic pb-3 border-b-4  text-4xl">{category.catagoryName}</h2>
          <div className="sm:flex space-x-4 mb-4">
            <img
              src={category.url}
              alt={category.catagoryName}
              className="w-100 h-45 rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-105"
            />
            <div className="flex flex-col gap-4 items-center my-auto"> 
              <h1 className="text-2xl italic text-amber-600  font-semibold text-center">{`${category.catagoryName} ምርጫ`} </h1>
              <div className="sm:flex flex-col gap-1 hidden ">
                <p className="text-[#784115] font-semibold ">{`ለምን የእኛን ${category.catagoryName} መምረጥ ይገባል ?`}</p>
                <ul className="text-gray-400 font-semibold flex flex-col gap-0.5">
                  <li>{category.catagoryDescription1}</li>
                  <li>{category.catagoryDescription2 && category.catagoryDescription2}</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Food List inside Category */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {foods
              .filter((food) => food.foodCategory === category.catagoryName)
              .map((food) => (
                <div
                key={food._id}
                className="border rounded-lg shadow-md p-4 text-center bg-white  transition-all duration-300 hover:scale-105 hover:shadow-lg mt-15"
              >
                {/* Food Image */}
                <img 
                  src={food.foodUrl} 
                  alt={food.foodName} 
                  className=" sm:h-32 sm:w-32 w:25 h:25 rounded-full mx-auto object-cover transition-transform duration-300 hover:scale-110 overflow-hidden sm:-mt-17 -mt-14 items-center "
                />
              
                {/* Food Name */}
                <h3 className="font-semibold mt-2 text-lg">{food.foodName}</h3>
              
                {/* Description */}
                <p className="text-gray-600 text-sm mt-1">{food.foodDescription}</p>
              
                {/* Price */}
                <p className="text-orange-600 font-bold mt-2">
                  {food.foodPrice} ብር
                </p>
              
                {/* Order Button */}
              
              </div>
              
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
