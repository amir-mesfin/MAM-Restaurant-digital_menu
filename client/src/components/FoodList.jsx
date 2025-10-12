import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function FoodList({ categoryId }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null);
  const [img, setImg] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageError, setImageError] = useState('');
  const [success, setSuccess] = useState('');

  const [editForm, setEditForm] = useState({
    foodName: '',
    foodPrice: '',
    foodDescription: '',
    foodUrl: ''
  });

  useEffect(() => {
    fetchFoods();
  }, [categoryId]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/food/getFood/${categoryId}`);
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
    setImg(null);
    setImageError('');
    setSuccess('');
  };

  // ✅ Cloudinary Upload Function
  const uploadCloudinary = async () => {
    if (!img) {
      setImageError('እባክዎ ምስል ይምረጡ');
      return null;
    }

    setLoadingImg(true);
    try {
      const formData = new FormData();
      formData.append('file', img);
      formData.append('upload_preset', 'mam_restaurant');

      const res = await fetch('https://api.cloudinary.com/v1_1/de91zvrzu/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('የምስል መጫን አልተሳካም');

      const data = await res.json();
      setSuccess('ምስል በተሳካ ሁኔታ ተጫኗል');
      return data.secure_url;
    } catch (err) {
      setImageError(err.message);
      return null;
    } finally {
      setLoadingImg(false);
    }
  };

  // ✅ Save Edit with Cloudinary upload
  const handleSaveEdit = async (foodId) => {
    try {
      let imageUrl = editForm.foodUrl;

      if (img) {
        const uploadedUrl = await uploadCloudinary();
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      await api.put(`/food/updateFood/${foodId}`, { ...editForm, foodUrl: imageUrl });
      await fetchFoods();
      setEditingFood(null);
      alert('ምግብ በተሳካ ሁኔታ ተስተካክሏል');
    } catch (err) {
      console.error(err);
      alert('ስህተት ተከስቷል፣ እባክዎ ደግመው ይሞክሩ');
    }
  };

  const handleDelete = async (foodId) => {
    if (window.confirm('እርግጠኛ ነዎት ይህን ምግብ ማስወገድ ይፈልጋሉ?')) {
      try {
        await api.delete(`/food/deleteFood/${foodId}`);
        await fetchFoods();
        alert('ምግብ በተሳካ ሁኔታ ተሰርዟል');
      } catch (err) {
        console.error(err);
        alert('ስህተት ተከስቷል፣ እባክዎ ደግመው ይሞክሩ');
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
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-amber-700 italic">
        {foods[0].foodCategory.catagoryName}
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {foods.map((item) => (
          <div
            key={item._id}
            className="bg-white w-64 rounded-xl shadow-md p-4 text-center"
          >
            <img
              src={item.foodUrl}
              alt={item.foodName}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />

            {editingFood === item._id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="foodName"
                  value={editForm.foodName}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="ስም"
                />
                <input
                  type="number"
                  name="foodPrice"
                  value={editForm.foodPrice}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="ዋጋ"
                />
                <textarea
                  name="foodDescription"
                  value={editForm.foodDescription}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="መግለጫ"
                />

                {/* ✅ Image Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="w-full border rounded p-2 text-sm"
                />
                {loadingImg && <p className="text-blue-500 text-sm">የምስል መጫን በመካከል...</p>}
                {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveEdit(item._id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700"
                  >
                    አስቀምጥ
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-md text-sm hover:bg-gray-600"
                  >
                    ይቅር
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-800">{item.foodName}</h3>
                <p className="text-amber-600 font-bold">{item.foodPrice} ብር</p>
                <p className="text-sm text-gray-500 mt-1">{item.foodDescription}</p>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600"
                  >
                    አስተካክል
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm hover:bg-red-600"
                  >
                    ሰርዝ
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {foods.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 text-lg">
          ምግቦች አልተገኙም
        </div>
      )}
    </>
  );
}
