import React, { useState, useEffect } from 'react'
import api from '../api/axios';
import FoodList from '../components/FoodList';

export default function EditFood() {
  const [getCategory, setGetCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/showCatagory');
      setGetCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='flex flex-col p-4 bg-gray-50 min-h-screen'>
      <div className='flex flex-col md:flex-row gap-6'>

        {/* category */}

        <div className='md:w-1/3 bg-white p-4 rounded-xl shadow-md'>
          <h3 className='text-xl font-semibold text-center mb-4 text-amber-700'>የምድቦች ዝርዝር</h3>
          <div className='space-y-3 md:max-h-110 max-w-85 overflow-y-auto'>
            {getCategory.length > 0 ? (
              getCategory.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedCategory(item);
                  }}
                  className={`cursor-pointer flex items-center p-3 rounded-lg border
                     ${selectedCategory?._id === item._id
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-amber-50'
                    }
                  `}
                >
                  <img
                    src={item.url}
                    alt="category"
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  <p className='ml-3 font-medium text-gray-800'>{item.catagoryName}</p>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500 py-4'>ምንም ምድብ አልተገኘም</p>
            )}
          </div>
        </div>


        {/* body */}

        <div>
          {selectedCategory && <FoodList categoryName={selectedCategory.catagoryName} />}
        </div>
      </div>

    </div>
  )
}
