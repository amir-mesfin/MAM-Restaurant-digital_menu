import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUtensils } from "react-icons/fa";
import logo from '../../public/image/mamLogo.png';
import api from "../api/axios";
export default function HeaderBelow() {
  const { catagoryName } = useParams();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [getCategory, setGetCategory] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar when switching to desktop view
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, isMobile]);

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
    <div className="relative">
      {/* Mobile Top Bar */}
      <div className="fixed top-6 left-4 md:hidden bg-amber-600 p-4  rounded-2xl shadow-lg z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-xl focus:outline-none transition-transform hover:scale-110"
          aria-label="Toggle menu"
        >
          {open ? <FaTimes  /> : <FaBars />}
        </button>
      </div>
        
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 flex-wrap justify-center items-center bg-gradient-to-r from-amber-600 to-amber-700 p-4 rounded-lg shadow-md">
        {getCategory.map((item) => (
          <Link key={item._id} to={`catagory/${item._id}`}>
            <div
              className="min-w-[110px] flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer 
                         transition-all duration-300 hover:bg-amber-800 relative group"
            >
              {/* Icon with subtle animation */}
              <div className="bg-amber-100 p-2 rounded-full mb-2 group-hover:bg-white transition-colors duration-300">
                <img
                  className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110"
                  src={item.url}
                  alt={item.catagoryName}
                />
              </div>
              
              <span className="text-white font-medium text-sm transition-colors duration-300 group-hover:text-amber-100 text-center">
                {item.catagoryName}
              </span>

              {/* Animated underline effect */}
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-white rounded-full transition-all 
                               duration-500 group-hover:w-12 -translate-x-1/2"></span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Sidebar Drawer with fixed scrolling */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-amber-700 to-amber-600 
                    text-white transform transition-transform duration-300 ease-in-out shadow-2xl z-50
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 bg-amber-800 border-b border-amber-500">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Mam Restaurant Logo" 
              className="h-10 w-10 rounded-full object-cover border-2 border-amber-300"
            />
            <h2 className="text-xl font-bold">ማም ሬስቶራንት</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-xl text-amber-100 hover:text-white transition-colors p-1 rounded-full hover:bg-amber-700"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Menu Items Container */}
        <div className="h-full flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-6 flex items-center gap-2 text-amber-200 p-2 bg-amber-800 rounded-lg">
              <FaHome className="text-lg" />
              <Link 
                to="/" 
                onClick={() => setOpen(false)} 
                className="font-medium hover:text-white transition-colors"
              >
                ዋና ገጽ
              </Link>
            </div>
            
            <h3 className="text-amber-200 font-medium mb-3 flex items-center gap-2 p-2 bg-amber-800 rounded-lg">
              <FaUtensils className="text-lg" />
              የምግብ ምድቦች
            </h3>
            
            <ul className="space-y-2">
              {getCategory.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`catagory/${item._id}`}
                    onClick={() => setOpen(false)} 
                    className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 
                               hover:bg-amber-800 hover:shadow-inner"
                  >
                    <div className="bg-amber-100 p-2 rounded-full">
                      <img
                        src={item.url}
                        alt={item.catagoryName}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <span className="font-medium">{item.catagoryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 text-center text-amber-200 text-sm bg-amber-800 border-t border-amber-700">
            © {new Date().getFullYear()} ማም ሬስቶራንት
          </div>
        </div>
      </div>

      {/* Overlay when Sidebar Open */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}