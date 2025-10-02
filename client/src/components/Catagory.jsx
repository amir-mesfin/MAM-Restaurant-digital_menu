import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Catagory() {
  const { catagoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [foods, setFoods] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [foodError, setFoodError] = useState("");
  const [inViewElements, setInViewElements] = useState(new Set());
  const [loading, setLoading] = useState({
    category: true,
    foods: true
  });

  const categoryRef = useRef(null);
  const foodRefs = useRef([]);

  const fetchCategories = async () => {
    try {
      setLoading(prev => ({ ...prev, category: true }));
      const res = await api.get(`/category/getCategory/${catagoryId}`);
      setCategory(res.data);
    } catch (err) {
      setCategoryError("የምድብ መረጃ ማምጣት አልተቻለም");
    } finally {
      setLoading(prev => ({ ...prev, category: false }));
    }
  };

  const fetchAllFood = async (catagoryName) => {
    try {
      setLoading(prev => ({ ...prev, foods: true }));
      const res = await api.get(`/food/getFood/${catagoryName}`);
      setFoods(res.data);
    } catch (err) {
      setFoodError("ምግብ ማምጣት አልተቻለም");
    } finally {
      setLoading(prev => ({ ...prev, foods: false }));
    }
  };

  useEffect(() => {
    if (catagoryId) fetchCategories();
  }, [catagoryId]);

  useEffect(() => {
    if (category?.catagoryName) {
      fetchAllFood(category.catagoryName);
    }
  }, [category]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (categoryRef.current) observer.observe(categoryRef.current);

    foodRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (categoryRef.current) observer.unobserve(categoryRef.current);
      foodRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [category, foods]);

  return (
    <div className="p-6 mx-auto sm:mx-10">
      {categoryError && <p className="text-red-500">{categoryError}</p>}
      {foodError && <p className="text-red-500">{foodError}</p>}

      {loading.category ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      ) : category ? (
        <div>
          <h1 className="text-4xl text-amber-600 font-bold italic border-b-4 border-[#784115] pb-3 mb-6">
            {category.catagoryName}
          </h1>

          {/* Category Image & Details */}
          <div className="sm:flex space-x-4 mb-8">
            <img
              ref={categoryRef}
              id={`category-${category._id}`}
              src={category.url}
              alt={category.catagoryName}
              className={`w-100 h-45 rounded-2xl transition-all duration-1000 ease-in-out ${
                inViewElements.has(`category-${category._id}`)
                  ? "animate-spin-once"
                  : "opacity-0"
              }`}
            />

            <div className="flex flex-col gap-4 mt-5 items-center my-auto">
              <h2 className="text-2xl italic text-amber-600 font-semibold text-center">
                {`${category.catagoryName} ምርጫ`}
              </h2>
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

          {/* Foods in this category */}
          <div className="grid grid-cols-2 sm:flex flex-wrap sm:justify-around gap-6">
            {loading.foods ? (
              <div className="col-span-2 flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
              </div>
            ) : foods.length > 0 ? (
              foods.map((food, index) => (
                <div
                  key={food._id}
                  ref={(el) => (foodRefs.current[index] = el)}
                  id={`food-${food._id}`}
                  className={`border rounded-lg shadow-md sm:mt-15 mt-10 p-4 text-center bg-white transition-all duration-500 ${
                    inViewElements.has(`food-${food._id}`)
                      ? "animate-bounce-in"
                      : "opacity-0 translate-y-10"
                  } hover:scale-105 hover:shadow-lg`}
                >
                  <img
                    src={food.foodUrl}
                    alt={food.foodName}
                    className="sm:h-32 sm:w-32 w:25 h:25 rounded-full mx-auto object-cover transition-transform overflow-hidden sm:-mt-17 -mt-14 duration-300 hover:scale-110"
                  />
                  <h3 className="font-semibold mt-2 text-lg">{food.foodName}</h3>
                  <p className="text-gray-600 text-sm mt-1">{food.foodDescription}</p>
                  <p className="text-orange-600 bg-orange-100 p-2 rounded-2xl font-bold mt-2">
                    {food.foodPrice} ብር
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500 text-lg font-semibold">በዚህ ምድብ ውስጥ ምግብ የለም</p>
                <p className="text-gray-400 mt-2">እባክዎ ቆጠራ ይመልሱ</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        !loading.category && (
          <p className="text-center text-lg text-gray-500">ምድብ አልተገኘም</p>
        )
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