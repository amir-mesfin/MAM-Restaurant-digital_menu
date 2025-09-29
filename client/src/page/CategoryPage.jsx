import React, { useState, useEffect } from 'react'
import api from '../api/axios';

export default function CategoryPage() {
  const [dataForm, setDataForm] = useState({ catagoryName: '', url: '', catagoryDescription1:'', catagoryDescription2:'' });
  const [img, setImg] = useState(null);
  const [imageError, SetImageError] = useState(null);
  const [error, setError] = useState();
  const [loadingImg, setLoadingImg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [getCategory, setGetCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  // handle inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDataForm({ ...dataForm, [id]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    if (!image.type.startsWith('image/')) {
      SetImageError('እባክዎ የምስል ፋይል ይጭኑ');
      return;
    }
    if (image.size > 5 * 1024 * 1024) {
      SetImageError('የፋይል መጠን ከ5MB ያንሳል');
      return;
    }
    setImg(image);
    SetImageError(null);
  };

  const uploadCloudinary = async () => {
    if (!img) {
      SetImageError('እባክዎ ምስል ይምረጡ');
      return;
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
      setDataForm({ ...dataForm, url: data.secure_url });
      setSuccess('ምስል በተሳካ ሁኔታ ተጫኗል');
      SetImageError(null);
    } catch (err) {
      SetImageError(err.message);
    } finally {
      setLoadingImg(false);
    }
  };

  // add new
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataForm.catagoryName.trim()) return setError("የምድብ ስም ያስፈልጋል");
    if (!dataForm.url) return setError("ከማስገባትዎ በፊት ምስል ይጭኑ");

    try {
      const res = await api.post('/category/addCategory', dataForm);
      setSuccess(res.data.message || "ምድብ በተሳካ ሁኔታ ጨመረ");
      setError(null);
      setDataForm({ catagoryName: '', url: '' });
      setImg(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "የማይታወቅ ስህተት ተፈጥሯል");
    }
  };

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/category/categoryUpdate/${selectedCategory._id}`, dataForm);
      setSuccess(res.data.message || "ምድብ በተሳካ ሁኔታ ተስተካክሏል");
      setSelectedCategory(null);
      setDataForm({ catagoryName: '', url: '' });
      setImg(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "አማራጭ አልተሳካም");
    }
  };

  // delete
  const handleDelete = async () => {
    if (!window.confirm("ይህን ምድብ ለማስወገድ እርግጠኛ ነዎት?")) return;
    try {
      const res = await api.delete(`/category/categoryDelete/${selectedCategory._id}`);
      setSuccess(res.data.message || "ምድብ በተሳካ ሁኔታ ተሰርዟል");
      setSelectedCategory(null);
      setDataForm({ catagoryName: '', url: '' });
      setImg(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "ስረዛ አልተሳካም");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/showCatagory');
      setGetCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setSelectedCategory(null);
    setDataForm({ catagoryName: '', url: '' });
    setImg(null);
    setError(null);
    SetImageError(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='flex flex-col p-4 bg-gray-50 min-h-screen'>

      <div className='flex flex-col lg:flex-row gap-6'>
        
        {/* Category List */}
        <div className='lg:w-1/3 bg-white p-4 rounded-xl shadow-md'>
          <h3 className='text-xl font-semibold text-center mb-4 text-amber-700'>የምድቦች ዝርዝር</h3>
          <div className='space-y-3 max-h-96 overflow-y-auto'>
            {getCategory.length > 0 ? (
              getCategory.map((item) => (
                <div 
                  key={item._id}
                  onClick={() => {
                    setSelectedCategory(item);
                    setDataForm({ catagoryName: item.catagoryName, url: item.url });
                  }}
                  className={`cursor-pointer flex items-center p-3 rounded-lg border ${
                    selectedCategory?._id === item._id 
                      ? 'bg-amber-100 border-amber-400' 
                      : 'bg-gray-50 border-gray-200 hover:bg-amber-50'
                  }`}
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

        {/* Form */}
        <div className='lg:w-2/3'>
          <div className='bg-white p-5 rounded-xl shadow-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-amber-700'>
                {selectedCategory ? 'ምድብ አርትዕ' : 'አዲስ ምድብ ጨምር'}
              </h3>
              {selectedCategory && (
                <button 
                  onClick={clearForm}
                  className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300'
                >
                  አዲስ ይፍጠሩ
                </button>
              )}
            </div>

            <form 
              onSubmit={selectedCategory ? handleUpdate : handleSubmit} 
              className='space-y-4'
            >
              <div>
                <label className='block mb-2 font-medium text-gray-700'>የምድብ ስም</label>
                <input 
                  type="text"
                  id='catagoryName'
                  value={dataForm.catagoryName}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='የምድብ ስም ያስገቡ'
                />
              </div>
              <div>
                <label className='block mb-2 font-medium text-gray-700'>የምድብ መግለጫ 1</label>
                <input 
                  type="text"
                  id='catagoryDescription1'
                  value={dataForm.catagoryDescription1}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='የምድብ መግለጫ ያስገቡ'
                />
              </div>
              <div>
                <label className='block mb-2 font-medium text-gray-700'>የምድብ መግለጫ 2</label>
                <input 
                  type="text"
                  id='catagoryDescription2'
                  value={dataForm.catagoryDescription2}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='የምድብ መግለጫ ያስገቡ'
                />
              </div>

              <div>
                <label className='block mb-2 font-medium text-gray-700'>የምድብ ምስል</label>
                
                {dataForm.url && (
                  <div className='mb-3 flex justify-center'>
                    <img 
                      src={dataForm.url} 
                      alt="Preview" 
                      className='h-24 w-24 object-cover rounded-lg border'
                    />
                  </div>
                )}
                
                <div className='flex flex-col sm:flex-row gap-3'>
                  <input 
                    type="file" 
                    onChange={handleImageChange}
                    className='flex-1 p-2 border border-gray-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100'
                  />
                  <button 
                    type="button" 
                    onClick={uploadCloudinary}
                    disabled={loadingImg || !img}
                    className='px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loadingImg ? 'በመጫን ላይ...' : 'ምስል ጫን'}
                  </button>
                </div>
                
                {imageError && (
                  <p className='mt-2 text-sm text-red-600 bg-red-50 p-2 rounded'>{imageError}</p>
                )}
              </div>

              <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                <button 
                  type="submit"
                  disabled={loadingImg}
                  className='flex-1 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-50'
                >
                  {selectedCategory ? 'ምድብ አስተካክል' : 'ምድብ ጨምር'}
                </button>

                {selectedCategory && (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    className='py-3 px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600'
                  >
                    ሰርዝ
                  </button>
                )}
              </div>

              {error && (
                <div className='p-3 bg-red-50 text-red-700 rounded-lg'>
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className='p-3 bg-green-50 text-green-700 rounded-lg'>
                  <p>{success}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}