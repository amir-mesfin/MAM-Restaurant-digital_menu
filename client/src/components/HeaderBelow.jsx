import React, { useState } from "react";
import { headerData } from "./ctousel.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../../public/image/mamLogo.png'


export default function HeaderBelow() {
  const { catagoryName } = useParams();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Top Bar */}
       <div className="fixed top-5 left-3 md:hidden bg-[#cf9d3f] p-2 rounded-lg">
       <button
          onClick={() => setOpen(!open)}
          className="text-white  text-3xl focus:outline-none   "
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
       </div>
        
    

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 flex-wrap justify-around items-center bg-[#cf9d3f] p-5">
        {headerData.map((item, index) => (
          <Link key={index} to={`catagory/${item.content}`}>
            <div
              className={`min-w-[100px] flex gap-2 items-center 
                          py-2 px-4 rounded-md cursor-pointer transition 
                          hover:bg-[#8b651b] hover:border-b-4  hover:border-white hover:underline-offset-4`}
            >
              <img
                className="w-8 h-8 object-contain"
                src={item.icon}
                alt={item.content}
              />
              <span className="text-white font-semibold">{item.content}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#A47621] to-yellow-500 
                    text-white transform transition-transform duration-300 ease-in-out shadow-lg z-50
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b   bg-[#784115] not-even:border-yellow-600">
        <img 
        src={logo} 
        alt="Mam Restaurant Logo" 
        className="h-8 w-8 rounded-full object-cover"
      />
          <h2 className="text-xl font-bold flex items-center gap-2">
            ማም ሬስቶራንት
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="mt-4 space-y-2">
          {headerData.map((item, index) => (
            <li key={index}>
              <Link
                to={`catagory/${item.content}`}
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-lg transition 
                           hover:bg-yellow-600 border-b-2 hover:underline-offset-4"
              >
                <img
                  src={item.icon}
                  alt={item.content}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-medium">{item.content}</span>
              </Link>
            </li>
          ))}
        </ul>
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
