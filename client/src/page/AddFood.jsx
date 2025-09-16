import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api/axios';

export default function AddFood() {
  const [getCategory, setGetCategory] = useState([]);
  const [categoryError, setCategoryError] = useState();

  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/showCatagory');
      setGetCategory(res.data);
    } catch (err) {
      setCategoryError(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(getCategory);
  return (
    <div className=''>
      <h1 className='text-2xl font-semibold max-auto italic text-center mb-7'>Add food</h1>
      <form className=' max-w-3xl mx-auto flex flex-col space-y-7'>
        <div className='flex flex-col italic font-semibold space-y-1.5 '>
          <label className=''> Food name</label>
          <input type="text" className='ml-3 p-3 bg-white rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='inter food  name' />
        </div>

        <div className='flex flex-col italic font-semibold space-y-1.5 '>
          <label className=''> Food description </label>
          <input type="text" className='ml-3 p-3 bg-white rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='only 12 word ' />
        </div>
        <div className='flex flex-col italic font-semibold space-y-1.5 '>
          <label className=''>price</label>
          <input type="number" className='ml-3 p-3 bg-white rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='price food' />
        </div>
        <div className='flex flex-col italic font-semibold space-y-1.5 '>
          <label className=''>add food image</label>
          <input
            type="file"
            // onChange={handleImageChange}
            className=' ml-3 flex-1 p-2 border border-gray-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 bg-white'
          />
        </div>
        <div className="flex flex-col italic font-semibold space-y-1.5">
          <label>Select category</label>
          <select
            name=""
            id=""
            className="ml-3 p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {getCategory?.map((item)=>(
            <option key={item._id} value={item.catagoryName}>{item.catagoryName}</option>

            ))}
           
          </select>
        </div>


      </form>
    </div>
  )
}
