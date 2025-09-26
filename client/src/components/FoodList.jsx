import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function FoodList({ categoryName }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null); // food being edited
  const [editForm, setEditForm] = useState({
    foodName: '',
    foodPrice: '',
    foodDescription: '',
    foodUrl: ''
  });

  useEffect(() => {
    fetchFoods();
  }, [categoryName]);

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

  const handleEdit = (foodItem) => {
    setEditingFood(foodItem._id);
    setEditForm({
      foodName: foodItem.foodName,
      foodPrice: foodItem.foodPrice,
      foodDescription: foodItem.foodDescription,
      foodUrl: foodItem.foodUrl
    });
  };

  const handleCancelEdit = () => {
    setEditingFood(null);
    setEditForm({
      foodName: '',
      foodPrice: '',
      foodDescription: '',
      foodUrl: ''
    });
  };

  const handleSaveEdit = async (foodId) => {
    try {
      await api.put(`/food/updateFood/${foodId}`, editForm);
      // Refresh the list
      await fetchFoods();
      setEditingFood(null);
      alert('ምግብ በተሳካ ሁኔታ ተስተካክሏል');
    } catch (err) {
      console.error(err);
      alert('ስህተት ተከስቷል እባክዎ ደግመው ይሞክሩ');
    }
  };

  const handleDelete = async (foodId) => {
    if (window.confirm('እርግጠኛ ነዎት ይህን ምግብ ማስወገድ ይፈልጋሉ?')) {
      try {
        await api.delete(`/food/deleteFood/${foodId}`);
        // Refresh the list
        await fetchFoods();
        alert('ምግብ በተሳካ ሁኔታ ተሰርዟል');
      } catch (err) {
        console.error(err);
        alert('ስህተት ተከስቷል እባክዎ ደግመው ይሞክሩ');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="text-center py-8 text-lg">በመጫን ላይ...</div>;

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white italic">
        {categoryName}
      </h1>

      {/* Food list flex container */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
        {foods.map((item) => (
          <div 
            key={item._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 md:p-6 flex flex-col items-center text-center mt-7 "
          >
            {/* Food Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white -mt-12 md:-mt-14 shadow-lg">
              <img 
                src={item.foodUrl} 
                alt={item.foodName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Edit Form or Display Info */}
            {editingFood === item._id ? (
              <div className="w-full mt-3 space-y-3">
                <input
                  type="text"
                  name="foodName"
                  value={editForm.foodName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="ስም ምግብ"
                />
                <input
                  type="number"
                  name="foodPrice"
                  value={editForm.foodPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="ዋጋ"
                />
                <input
                  type="text"
                  name="foodDescription"
                  value={editForm.foodDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="መግለጫ"
                />
                <input
                  type="text"
                  name="foodUrl"
                  value={editForm.foodUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="የምስስ URL"
                />
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleSaveEdit(item._id)}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md text-sm hover:bg-green-600 transition-colors"
                  >
                    አስቀምጥ
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white py-2 px-3 rounded-md text-sm hover:bg-gray-600 transition-colors"
                  >
                    ይቅር
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Food Info Display */}
                <h3 className="mt-3 md:mt-4 font-bold text-base md:text-lg text-gray-800 line-clamp-2">
                  {item.foodName}
                </h3>
                <p className="mt-2 bg-orange-100 text-orange-600 font-bold py-1 px-3 rounded-md text-sm md:text-base">
                  {item.foodPrice} ብር
                </p>
                <p className="mt-3 bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg text-sm md:text-base w-full">
                  {item.foodDescription}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2 mt-4 w-full">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    አስተካክል
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
                  >
                    ሰርዝ
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {foods.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 text-lg">
          ምግቦች አልተገኙም
        </div>
      )}
    </>
  );
}
