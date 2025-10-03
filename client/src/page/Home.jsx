import React, { useRef, useEffect, useState } from "react";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [inViewElements, setInViewElements] = useState(new Set());
  const categoryRefs = useRef([]);
  const foodRefs = useRef([]);

  // Fetch categories
  const { 
    data: categories = [], 
    error: categoryError, 
    isLoading: loadingCategories 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/category/showCatagory");
      return res.data;
    },
    staleTime: 50 * 60 * 1000, // 5 min cache
  });

  // Fetch foods
  const { 
    data: foods = [], 
    error: foodError, 
    isLoading: loadingFoods 
  } = useQuery({
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

  // Loading state
  if (loadingCategories || loadingFoods) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  if (categoryError) return <p className="text-red-500 text-center py-8">የምድብ ማምጣት አልተቻለም</p>;
  if (foodError) return <p className="text-red-500 text-center py-8">ምግብ ማምጣት አልተቻለም</p>;

  return (
    <div className="p-6 mx-auto sm:mx-10">
      <h1 className="text-center italic text-4xl text-[#784115] font-bold mb-5">
        የሁሉም ምግቦች እና መጠጦች
      </h1>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">ምንም ምድቦች አልተገኙም</p>
        </div>
      ) : (
        categories.map((category, categoryIndex) => {
          const categoryFoods = foods.filter(food => food.foodCategory === category.catagoryName);
          
          return (
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
                      {category.catagoryDescription2 && (
                        <li>{`✅ ${category.catagoryDescription2}`}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Foods inside Category */}
              <div className="grid grid-cols-2 sm:flex flex-wrap sm:justify-around gap-6">
                {categoryFoods.length === 0 ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500 text-lg font-semibold">
                      በዚህ ምድብ ውስጥ ምግብ የለም
                    </p>
                    <p className="text-gray-400 mt-2">እባክዎ ቆጠራ ይመልሱ</p>
                  </div>
                ) : (
                  categoryFoods.map((food) => {
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
                  })
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes spinOnce {
          0% {
            transform: rotate(0deg) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: rotate(180deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.3) translateY(100px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-10px);
            opacity: 0.9;
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-spin-once {
          animation: spinOnce 1.5s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}