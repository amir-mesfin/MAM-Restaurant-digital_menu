import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import api from '../api/axios.js';
import { useNavigate } from "react-router-dom";
export default function Sign() {
  const [formData, setFormDate] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) =>{
      setFormDate({
        ...formData,
        [e.target.id ] : e.target.value, 
      });
    
  }
  const handleSubmit= async (e) =>{
    e.preventDefault();
    try{
         const res = await api.post('/auth/signin',formData);
         const da =  res.data;
         navigate('/owner')
    }catch(err){
        setError(err);
    }
  }
//   React.useEffect(()=>{
//    console.log(formData);
// },[formData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(38,70%,84%)] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-amber-700 italic mb-6">
          ሜኑ ለማስተካከል ይግቡ
        </h1>

        <form className="space-y-4"
             onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">የተጠቃሚ ስም</label>
            <input
              type="text"
              placeholder="ስምዎን ያስገቡ"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              id="username"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">የይለፍ ቃል</label>
            <input
              type="password"
              placeholder="የይለፍ ቃልዎን ያስገቡ"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              id='password'
              onChange={handleChange}
            />
          </div>
           { error && <p className="text-sm text-red-800"> {error.message}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition duration-300"
          >
            ግባ
          </button>
        </form>
      </div>
    </div>
  );
}
