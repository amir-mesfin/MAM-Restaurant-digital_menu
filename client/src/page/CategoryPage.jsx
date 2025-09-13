import React, { useState, useEffect } from 'react'
import api from '../api/axios';
export default function CategoryPage() {

  const [dataForm, setDataForm] = useState({
    catagoryName: '',
    url: '',
  });
  const [img, setImg] = useState(null);
  const [imageError, SetImageError] = useState(null);
  const [error, setError] = useState();
  const [loadingImg, setLoadingImg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [getCategory, setGetCategory] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    setDataForm({
      ...dataForm,
      [id]: value,
    });
  };


  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    if (!image.type.startsWith('image/')) {
      SetImageError('Please upload an image file');
      return;
    }
    if (image.size > 5 * 1024 * 1024) { // 5MB limit
      SetImageError('File size should be less than 5MB');
      return;
    }

    setImg(image);
  }




  const uploadCloudinary = async () => {
    setLoadingImg(true);
    try {
      const formData = new FormData();
      formData.append('file', img);
      formData.append('upload_preset', 'mam_restaurant');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/de91zvrzu/image/upload',
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        SetImageError("cloudinary issue happen ");
      }
      const data = await res.json();
      setDataForm({
        ...dataForm,
        url: data.secure_url
      }
      );
      setLoadingImg(false);

    } catch (err) {
      SetImageError(err)
      setLoadingImg(false)
    }


  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!dataForm.catagoryName.trim()) {
      setError("Category name is required");
      return;
    }
    if (!dataForm.url) {
      setError("Please upload an image before submitting");
      return;
    }

    try {
      const res = await api.post('/category/addCategory', dataForm);
      const data = res.data;
      setSuccess(data.message || "Category added successfully");
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }

    // reset form after success
    setDataForm({ catagoryName: '', url: '' });
    setImg(null);
  };



  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get('/category/showCatagory');
        const data = res.data;
        setGetCategory(data);
      } catch (err) {
        console.log(err);
      }
    }

    getCategory();
  }, [])

  // console.log(getCategory);

  // console.log(dataForm);
  // console.log(imageError);

  return (
    <div className='flex flex-col '>
      <h2 className='mx-auto text-2xl  mb-12 font-semibold italic '> የምግብ ምድብ ጨምር</h2>

      <div className='flex md:flex-row md:space-x-7 md:justify-around flex-col-reverse  justify-center space-y-4'>
        <div className='p-3   bg-amber-100  space-y-4 rounded-2xl'>
          <h3 className='text-1xl  font-semibold mx-auto text-center '> edit Catagory </h3>

          {
            getCategory.map((item) => (
              <div key={item._id}
                className='flex flex-row   border-b-4  border-white md:space-x-2.5 space-x-33 p-2 md:pl-0 pl-16 bg-amber-200 rounded-2xl items-center'>
                <img src={item.url} alt="image category"
                  className='w-8 h-8 rounded-full' />
                <p className='italic font-semibold text-slate-900'>{item.catagoryName}</p>
              </div>
            ))
          }

        </div>
        <div className=' md:mx-1 mx-auto'>
          <form onSubmit={handleSubmit} className='flex flex-col  max-w-[450px] space-y-3 '>
            <div className='flex flex-col  '>
              <label className='mb-2 font-semibold  italic'> add food catagory name  </label>
              <input type="text" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='add new catagory'
                id='catagoryName'
                value={dataForm.catagoryName}
                onChange={handleChange} />
            </div>

            <div className='flex flex-col '>
              <label className='mb-2 font-semibold  italic'> add food catagory image </label>
              {imageError && <p className=' text-sm bg-red-300 text-red-800 '>{imageError}</p>}
              <div className='flex  md:flex-row  flex-col '>
                <input type="file" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='image'
                  // value={dataForm.url}

                  onChange={handleImageChange} />
                <button className='rounded-lg  active:text-white font-semibold italic  md:p-3 bg-blue-200 hover:bg-blue-300 active:bg-blue-500 item  mx-auto mt-3 px-12 py-3 '
                  type='button'
                  onClick={uploadCloudinary}> {!loadingImg ? "upload " : 'uploading....'} </button>
              </div>


            </div>

            <button className='rounded-lg max-w-[450px] bg-amber-200  hover:bg-amber-300 active:bg-amber-400 text-2xl text-white font-semibold italic text-shadow-amber-950 p-3 disabled:opacity-65'
              disabled={loadingImg}> add catagory </button>
            {error && <p className='text-sm text-red-800 italic'>{error}</p>}
            {success && <p className='text-lg text-green-800 italic'>{success}</p>}
          </form>

        </div>
      </div>

    </div>
  )
}


// amirhttp://localhost:5173/Amir@   http://localhost:5173/Amir@