import React, { useState } from 'react';
import CategoryPage from './CategoryPage';
import AddFood from './AddFood';
import EditFood from './EditFood';

export default function Owner() {
  const [activePage, setActivePage] = useState('edit');

  const menuItems = [
    {
      label: "ምግብ አርትዕ",
      key: "edit",
      icon: "📝"
    },
    {
      label: "ምግብ ጨምር",
      key: "addFood",
      icon: "➕"
    },
    {
      label: "ምድብ ጨምር",
      key: "addCatagory",
      icon: "📂"
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4 px-2 md:px-4 min-h-[80vh]">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-gradient-to-b from-amber-50 to-orange-50 rounded-xl shadow-md overflow-hidden md:h-auto">
        <div className="p-4 border-b border-amber-200">
          <h2 className="text-xl font-bold text-amber-800 text-center">የባለቤት ዳሽቦርድ</h2>
        </div>
        <ul className="flex flex-col p-3 space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`p-3 flex items-center text-md font-medium rounded-lg cursor-pointer transition-all duration-300
                ${activePage === item.key
                  ? "bg-amber-600 text-white shadow-md transform scale-105"
                  : "bg-white text-amber-700 hover:bg-amber-100 hover:text-amber-900"
                }`}
              onClick={() => setActivePage(item.key)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <div className="p-4 mt-auto border-t border-amber-200 text-center text-sm text-amber-600">
          የምግብ ቤት አስተዳዳሪ ፓነል
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto md:h-[80vh]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-amber-800">
            {activePage === "edit" && "የምግብ ማስተካከያ"}
            {activePage === "addFood" && "አዲስ ምግብ ያክሉ"}
            {activePage === "addCatagory" && "አዲስ ምድብ ያክሉ"}
          </h1>
          <p className="text-amber-600 mt-1">
            {activePage === "edit" && "በምግብ ዝርዝርዎ ውስጥ ያሉ ምግቦችን ያስተካክሉ"}
            {activePage === "addFood" && "ወደ ምግብ ዝርዝርዎ አዲስ ምግብ ያክሉ"}
            {activePage === "addCatagory" && "ለምግብ ዝርዝርዎ አዲስ ምድብ ይፍጠሩ"}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-amber-100">
          {activePage === "edit" && <EditFood />}
          {activePage === "addFood" && <AddFood />}
          {activePage === "addCatagory" && <CategoryPage />}
        </div>
      </div>
    </div>
  );
}