import React, { useRef, useEffect, useState } from "react";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [inViewElements, setInViewElements] = useState(new Set());
  const categoryRefs = useRef([]);
  const foodRefs = useRef([]);

  // Fetch categories
  const { data: categories = [], error: categoryError, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/category/showCatagory");
      return res.data;
    },
    staleTime: 50 * 60 * 1000, // 5 min cache
  });

  // Fetch foods
  const { data: foods = [], error: foodError, isLoading: loadingFoods } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await api.get("/food/getAllFood");
      return res.data;
    },
    staleTime: 50 * 60 * 1000,
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInViewElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    categoryRefs.current.forEach(ref => ref && observer.observe(ref));
    foodRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      categoryRefs.current.forEach(ref => ref && observer.unobserve(ref));
      foodRefs.current.forEach(ref => ref && observer.unobserve(ref));
    };
  }, [categories, foods]);

  // Keep refs aligned with data length
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length);
    foodRefs.current = foodRefs.current.slice(0, foods.length);
  }, [categories, foods]);

  if (loadingCategories || loadingFoods) return <p>Loading...</p>;
  if (categoryError) return <p className="text-red-500">የምድብ ማምጣት አልተቻለም</p>;
  if (foodError) return <p className="text-red-500">ምግብ ማምጣት አልተቻለም</p>;

  return (
    <div className="p-6 mx-auto sm:mx-10">
      <h1 className="text-center italic text-4xl text-[#784115] font-bold mb-5">
        የሁሉም ምግቦች እና መጠጦች
      </h1>

      {categories.map((category, categoryIndex) => (
        <div key={category._id} className="mb-12">
          {/* Category Title & Image */}
          <h2 className="font-bold mb-4 border-[#784115] text-amber-600 italic pb-3 border-b-4 text-4xl">
            {category.catagoryName}
          </h2>

          <div className="sm:flex space-x-4 mb-4">
            {/* Category Image with Spin Animation */}
            <img
              ref={el => categoryRefs.current[categoryIndex] = el}
              id={`category-${category._id}`}
              src={category.url}
              alt={category.catagoryName}
              className={`w-100 h-45 rounded-2xl transition-all duration-1000 ease-in-out ${
                inViewElements.has(`category-${category._id}`) 
                  ? 'animate-spin-once' 
                  : 'opacity-0'
              }`}
            />
            
            <div className="flex flex-col gap-4 items-center my-auto"> 
              <h1 className="text-2xl italic text-amber-600 font-semibold text-center mt-5">
                {`${category.catagoryName} ምርጫ`}
              </h1>
              <div className="sm:flex flex-col gap-1 hidden">
                <p className="text-[#784115] font-semibold">
                  {`ለምን የእኛን ${category.catagoryName} መምረጥ ይገባል ?`}
                </p>
                <ul className="text-gray-400 font-semibold flex flex-col gap-0.5">
                  <li>{`✅ ${category.catagoryDescription1}`}</li>
                  <li>{category.catagoryDescription2 && `✅ ${category.catagoryDescription2}`}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Foods inside Category */}
          <div className="grid grid-cols-2 sm:flex flex-wrap sm:justify-around gap-6">
            {foods
              .filter(food => food.foodCategory === category.catagoryName)
              .map((food, idx) => {
                const globalFoodIndex = foods.findIndex(f => f._id === food._id);
                return (
                  <div
                    key={food._id}
                    ref={el => (foodRefs.current[globalFoodIndex] = el)}
                    id={`food-${food._id}`}
                    className={`border rounded-lg shadow-md p-4 text-center bg-white transition-all duration-500 ${
                      inViewElements.has(`food-${food._id}`)
                        ? "animate-bounce-in"
                        : "opacity-0 translate-y-10"
                    } hover:scale-105 hover:shadow-lg mt-15`}
                  >
                    <img
                      src={food.foodUrl}
                      alt={food.foodName}
                      className="sm:h-32 sm:w-32 w-25 h-25 rounded-full mx-auto object-cover transition-transform duration-300 hover:scale-110 overflow-hidden sm:-mt-17 -mt-14"
                    />
                    <h3 className="font-semibold mt-2 text-lg">{food.foodName}</h3>
                    <p className="text-gray-600 text-sm mt-1">{food.foodDescription}</p>
                    <p className="text-orange-600 bg-orange-100 p-2 rounded-2xl font-bold mt-2">
                      {food.foodPrice} ብር
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
