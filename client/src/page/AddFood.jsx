import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api/axios';

export default function AddFood() {
  const [getCategory, setGetCategory] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [dataForm, setDataForm] = useState({
    foodName: '',
    foodDescription: '',
    foodPrice: '',
    foodUrl: '',
    foodCategory: '',
  });
  const [img, setImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [errors, setErrors] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/showCatagory');
      setGetCategory(res.data);
    } catch (err) {
      setCategoryError('የምድብ መረጃ ማምጣት አልተቻለም');
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDataForm({ ...dataForm, [id]: value });
    
    if (errors[id]) {
      setErrors({...errors, [id]: ''});
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    
    setImageError('');
    
    if (!image.type.startsWith('image/')) {
      setImageError('እባክዎ የምስል ፋይል ይጭኑ');
      return;
    }
    if (image.size > 5 * 1024 * 1024) {
      setImageError('የፋይል መጠን ከ5MB ያንሳል');
      return;
    }
    
    setImg(image);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(image);
  };

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
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/de91zvrzu/image/upload',
        { method: "POST", body: formData }
      );
      if (!res.ok) throw new Error("የምስል መጫን አልተሳካም");
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!dataForm.foodName.trim()) {
      newErrors.foodName = 'የምግብ ስም ያስፈልጋል';
    }
    
  if (dataForm.foodDescription.split(' ').length > 3) {
      newErrors.foodDescription = 'መግለጫው ከ3 ቃላት ያልበለጠ መሆን አለበት';
    }
    
    if (!dataForm.foodPrice || parseFloat(dataForm.foodPrice) <= 0) {
      newErrors.foodPrice = 'የምግብ ዋጋ ያስፈልጋል';
    }
    
    if (!dataForm.foodCategory) {
      newErrors.foodCategory = 'የምግብ ምድብ መምረጥ ያስፈልጋል';
    }
    
    if (!img) {
      newErrors.image = 'ምስል መጫን ያስፈልጋል';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const imageUrl = await uploadCloudinary();
      if (!imageUrl) {
        throw new Error('ምስል መጫን አልተቻለም');
      }
      
      const submitData = {
        ...dataForm,
        foodUrl: imageUrl
      };
      
      const res = await api.post('/food/addFood', submitData);
      setSuccess(res.data.message || "ምግቡ በተሳካ ሁኔታ ጨመረ");
      
      // Reset form
      setDataForm({
        foodName: '',
        foodDescription: '',
        foodPrice: '',
        foodUrl: '',
        foodCategory: '',
      });
      setImg(null);
      setImagePreview(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (err) {
      setErrors({submit: err.response?.data?.message || "የማይታወቅ ስህተት ተፈጥሯል"});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=''>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}

      <form className='max-w-3xl mx-auto flex flex-col space-y-7' onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-1.5'>
          <label className='font-medium'>የምግብ ስም</label>
          <input 
            type="text"
            className={`p-3 ml-3 bg-white rounded-lg border focus:outline-none focus:ring-2 ${
              errors.foodName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'
            }`}
            id='foodName'
            value={dataForm.foodName}
            onChange={handleChange}
            placeholder='የምግብ ስም ያስገቡ' 
          />
          {errors.foodName && <p className="text-red-500 text-sm">{errors.foodName}</p>}
        </div>

        <div className='flex flex-col space-y-1.5'>
          <label className='font-medium'>የምግብ መግለጫ</label>
          <textarea
            className={`p-3  ml-3 bg-white rounded-lg border focus:outline-none focus:ring-2 ${
              errors.foodDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'
            }`}
            id="foodDescription"
            value={dataForm.foodDescription}
            onChange={handleChange}
            rows="1"
            placeholder='ከ 3 ቃላት ያልበለጠ መግለጫ' 
          />
          {errors.foodDescription && <p className="text-red-500 text-sm">{errors.foodDescription}</p>}
          <p className="text-sm text-gray-500">
            ቃላት: {dataForm.foodDescription ? dataForm.foodDescription.split(' ').filter(word => word !== '').length : 0}/3
          </p>
        </div>
        
        <div className='flex flex-col space-y-1.5'>
          <label className='font-medium'>ዋጋ</label>
          <input
            type="number"
            className={`p-3 rounded-lg  ml-3 bg-white border focus:outline-none focus:ring-2 ${
              errors.foodPrice ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'
            }`}
            id="foodPrice"
            value={dataForm.foodPrice}
            onChange={handleChange}
            placeholder='የምግብ ዋጋ ያስገቡ' 
            min="0"
            step="0.01"
          />
          {errors.foodPrice && <p className="text-red-500 text-sm">{errors.foodPrice}</p>}
        </div>
        
        <div className='flex flex-col space-y-1.5'>
          <label className='font-medium'>የምግብ ምስል</label>
          
          <div className='flex flex-col sm:flex-row gap-4 items-start'>
            <div className='flex-1'>
              <input
                type="file"
                onChange={handleImageChange}
                className={`w-full p-2 border ml-3 bg-white rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                accept="image/*"
              />
              {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
            
            <button 
              type="button" 
              onClick={uploadCloudinary}
              disabled={loadingImg || !img}
              className='px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
            >
              {loadingImg ? 'በመጫን ላይ...' : 'ምስል ጫን'}
            </button>
          </div>
          
          {loadingImg && <p className="text-amber-600 text-sm mt-2">ምስል እየጫነ ነው...</p>}
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">የምስል ቅድመ እይታ:</p>
              <div className="border rounded-lg p-2 max-w-xs">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-40 mx-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <label className='font-medium'>የምግብ ምድብ</label>
          <select
            className={`p-3 rounded-lg border focus:outline-none ml-3 bg-white focus:ring-2 ${
              errors.foodCategory ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'
            }`}
            id="foodCategory"
            value={dataForm.foodCategory}
            onChange={handleChange}
          >
            <option value="">የምግብ ምድብ ይምረጡ</option>
            {getCategory?.map((item) => (
              <option key={item._id} value={item.catagoryName}>{item.catagoryName}</option>
            ))}
          </select>
          {errors.foodCategory && <p className="text-red-500 text-sm">{errors.foodCategory}</p>}
          {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || loadingImg}
          className={`py-3 px-6 rounded-lg font-medium text-white ${
            isSubmitting || loadingImg ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          {isSubmitting ? 'እየቀረበ...' : 'ምግብ ጨምር'}
        </button>
      </form>
    </div>
  )
}