import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUtensils } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
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
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && isMobile ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open, isMobile]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/showCategory');
      setGetCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  return (
    <div className="relative border-b-2 border-amber-400 shadow-md">
      {/* Mobile Top Bar */}
      <div className="fixed top-6 left-4 md:hidden bg-amber-600 p-4 rounded-2xl shadow-lg z-50 animate-bounce-once"
        onClick={() => setOpen(!open)}>
        <button className="text-white text-xl focus:outline-none transition-transform hover:scale-110 animate-pulse"
          aria-label="Toggle menu">
          {open ? <FaTimes className="animate-spin-in" /> : <FaBars className="animate-pulse" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 flex-wrap justify-center items-center bg-gradient-to-r from-amber-600 to-amber-700 p-4 rounded-lg shadow-md border-b-4 border-amber-400">
        <Link to='/'>
          <div className="min-w-[110px] flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer 
                          transition-all duration-300 hover:bg-amber-800 relative group animate-fade-in-up">
            <div className="bg-amber-100 p-2 rounded-full mb-2 group-hover:bg-white duration-300 group-hover:scale-110 transform transition-transform">
              <FaHome className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110 rounded-full" />
            </div>
            <span className="text-white font-medium text-sm transition-colors duration-300 group-hover:text-amber-100 text-center">ዋና ገጽ</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-white rounded-full transition-all duration-500 group-hover:w-12 -translate-x-1/2"></span>
          </div>
        </Link>

        {getCategory.map((item) => (
          <Link key={item._id} to={`category/${item._id}`}>
            <div className="min-w-[110px] flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer 
                            transition-all duration-300 hover:bg-amber-800 relative group animate-fade-in-up">
              <div className="bg-amber-100 p-2 rounded-full mb-2 group-hover:bg-white duration-300 group-hover:scale-110 transform transition-transform">
                <img className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110 rounded-full"
                  src={item.url} alt={item.catagoryName} />
              </div>
              <span className="text-white font-medium text-sm transition-colors duration-300 group-hover:text-amber-100 text-center">{item.catagoryName}</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-white rounded-full transition-all duration-500 group-hover:w-12 -translate-x-1/2"></span>
            </div>
          </Link>
        ))}

        {/* Payment Link */}
        <a href='#Payment'>
          <div className="min-w-[110px] flex flex-col items-center py-2 px-3 rounded-lg cursor-pointer 
                          transition-all duration-300 hover:bg-amber-800 relative group animate-fade-in-up">
            <div className="bg-amber-100 p-2 rounded-full mb-2 group-hover:bg-white duration-300 group-hover:scale-110 transform transition-transform">
              <MdOutlinePayments className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110 rounded-full" />
            </div>
            <span className="text-white font-medium text-sm transition-colors duration-300 group-hover:text-amber-100 text-center">የክፍያ</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-white rounded-full transition-all duration-500 group-hover:w-12 -translate-x-1/2"></span>
          </div>
        </a>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-amber-700 to-amber-600 text-white transform transition-all duration-500 ease-out shadow-2xl z-50
                        border-r-4 border-amber-400 ${open ? "translate-x-0 animate-slide-in-left" : "-translate-x-full animate-slide-out-left"}`}>
        <div className="flex items-center justify-between p-5 bg-amber-800 border-b-2 border-amber-500 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mam Restaurant Logo" className="h-10 w-10 rounded-full object-cover border-2 border-amber-300 animate-pulse" />
            <h2 className="text-xl font-bold animate-bounce">ማም ሬስቶራንት</h2>
          </div>
          <button onClick={() => setOpen(false)} className="text-xl text-amber-100 hover:text-white transition-colors p-1 rounded-full hover:bg-amber-700 animate-pulse" aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <div className="h-full flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <Link to="/" onClick={() => setOpen(false)} className="font-medium hover:text-white transition-colors">
              <div className="mb-6 flex items-center gap-2 text-amber-200 p-2 bg-amber-800 rounded-lg border-l-4 border-amber-400 animate-slide-in-right">
                <FaHome className="text-lg animate-bounce" /> ዋና ገጽ
              </div>
            </Link>

            <a href="#Payment" onClick={() => setOpen(false)} className="font-medium hover:text-white transition-colors">
              <div className="mb-6 flex items-center gap-2 text-amber-200 p-2 bg-amber-800 rounded-lg border-l-4 border-amber-400 animate-slide-in-right">
                <MdOutlinePayments className="text-lg animate-bounce" /> የክፍያ መለያዎች
              </div>
            </a>

            <h3 className="text-amber-200 font-medium mb-3 flex items-center gap-2 p-2 bg-amber-800 rounded-lg border-l-4 border-amber-400 animate-slide-in-right delay-100">
              <FaUtensils className="text-lg animate-spin" /> የምግብ ምድቦች
            </h3>

            <ul className="space-y-2">
              {getCategory.map((item, index) => (
                <li key={item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link to={`category/${item._id}`} onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-amber-800 hover:shadow-inner border-b-2 border-amber-500 hover:border-amber-300 transform hover:scale-105 hover:translate-x-2">
                    <div className="bg-amber-100 p-2 rounded-full animate-pulse">
                      <img src={item.url} alt={item.catagoryName} className="h-8 w-8 object-contain animate-spin-slow rounded-full" />
                    </div>
                    <span className="font-medium">{item.catagoryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 text-center text-amber-200 text-sm bg-amber-800 border-t-2 border-amber-700 animate-fade-in-up">
            © {new Date().getFullYear()} ማም ሬስቶራንት
          </div>
        </div>
      </div>

      {open && <div className="fixed inset-0 bg-opacity-40 z-40" onClick={() => setOpen(false)} />}

      <style jsx>{`
        @keyframes bounce-once {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes slide-in-left {0%{transform:translateX(-100%);}100%{transform:translateX(0);}}
        @keyframes slide-out-left {0%{transform:translateX(0);}100%{transform:translateX(-100%);}}
        @keyframes slide-in-right {0%{transform:translateX(-20px);opacity:0;}100%{transform:translateX(0);opacity:1;}}
        @keyframes fade-in-up {0%{transform:translateY(20px);opacity:0;}100%{transform:translateY(0);opacity:1;}}
        @keyframes fade-in-down {0%{transform:translateY(-20px);opacity:0;}100%{transform:translateY(0);opacity:1;}}
        @keyframes fade-in {0%{opacity:0;}100%{opacity:1;}}
        @keyframes spin-in {0%{transform:rotate(-180deg);opacity:0;}100%{transform:rotate(0);opacity:1;}}
        @keyframes spin-slow {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
        .animate-bounce-once{animation:bounce-once 0.5s ease-in-out;}
        .animate-slide-in-left{animation:slide-in-left 0.3s ease-out;}
        .animate-slide-out-left{animation:slide-out-left 0.3s ease-in;}
        .animate-slide-in-right{animation:slide-in-right 0.5s ease-out;}
        .animate-fade-in-up{animation:fade-in-up 0.6s ease-out;}
        .animate-fade-in-down{animation:fade-in-down 0.4s ease-out;}
        .animate-fade-in{animation:fade-in 0.3s ease-out;}
        .animate-spin-in{animation:spin-in 0.3s ease-out;}
        .animate-spin-slow{animation:spin-slow 3s linear infinite;}
        .delay-100{animation-delay:100ms;}
      `}</style>
    </div>
  );
}
