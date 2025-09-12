import React, {useState, useEffect}from 'react'
import api from '../api/axios';
export default function CategoryPage() {

  const [dataForm, setDataForm] = useState({CatagoryName:'',
                                            url:'',
  });
  const [img, setImg] = useState(null);
  const [imageError, SetImageError] = useState(null);
  const [error, setError] = useState();


  const handleChange = (e) =>{
     setDataForm( {
       ...dataForm,
       [e.target.id] : e.target.value,
     });
  }

  const handleImageChange = (e) =>{
    const image = e.target.files[0];
    if(!image) return ;
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


  const uploadCloudinary = async() =>{
    try{
          const formData = new FormData();
         formData.append('file',img);
         formData.append('upload_preset','mam_restaurant');
         const res = await fetch(
           'https://api.cloudinary.com/v1_1/de91zvrzu/image/upload',
           {
            method:"POST",
            body:formData,
           }
         );
         if(!res.ok){
          SetImageError("cloudinary issue happen ");
         }
     const data =  await res.json();
     setDataForm({
         ...dataForm,
         url:data.secure_url
     }
     );

    }catch(err){
      SetImageError(err)
    }
         

  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await api.post('/category/addCategory', dataForm); 
      const data = res.data; // ✅ axios gives data here directly
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response.data.message);
    }
  };
  



  // console.log(dataForm);
  // console.log(imageError);

  return (
    <div className='flex flex-col'>
      <h2 className='mx-auto text-2xl  font-semibold italic '> የምግብ ምድብ ጨምር</h2>
      <div>
        <h3> edit Catagory </h3>

      </div>
      <div className=''>
        <form onSubmit={handleSubmit} className='flex flex-col  space-y-3 '>
          <div className='flex flex-col  max-w-[450px] '>
            <label className='mb-2 font-semibold  italic'> add food catagory name  </label>
            <input type="text" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='add new catagory'
            id='CatagoryName'
            onChange={handleChange} />
          </div>
                   
              <div className='flex flex-col '>
                <label className='mb-2 font-semibold  italic'> add food catagory image </label>
                <div>
                <input type="file" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='image'
                 onChange={handleImageChange} />
                <button className='rounded-lg  active:text-white font-semibold italic  p-3 bg-blue-200 hover:bg-blue-300 active:bg-blue-500 '
                  type='button'
                   onClick={uploadCloudinary}>uploading </button>
                </div>

                
              </div>
            
          <button className='rounded-lg max-w-[450px] bg-amber-200 hover:bg-amber-300 active:bg-amber-400 text-2xl text-white font-semibold italic text-shadow-amber-950 p-3'> add catagory </button>
        
        </form>

      </div>
    </div>
  )
}


// amirhttp://localhost:5173/Amir@   http://localhost:5173/Amir@