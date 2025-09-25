import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function FoodList({ categoryName }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/food/getFood/${categoryName}`);
        setFoods(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [categoryName]);

  if (loading) return <div className="text-center py-4">በመጫን ላይ...</div>;

  return (
    <div className="p-6 bg-[#ffe6b3] min-w-50 min-h-33">
      <h1 className="text-2xl font-bold mb-6 text-center mx-auto">{categoryName}</h1>
      
      <div className="  gap-6">
        {foods.map((item) => (
          <div 
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
          >
            {/* Circular Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white -mt-12 shadow-md">
              <img 
                src={item.foodUrl} 
                alt={item.foodName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Food Name */}
            <h3 className="mt-4 font-bold text-lg text-gray-800">{item.foodName}</h3>

            {/* Price */}
            <p className="mt-2 bg-orange-100 text-orange-600 font-bold py-1 px-3 rounded-md">
              {item.foodPrice} ብር
            </p>

            {/* Button */}
            <p className="mt-3 bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
