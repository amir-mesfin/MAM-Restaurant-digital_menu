import React, { useState } from 'react';
import CategoryPage from './CategoryPage';
import AddFood from './AddFood';
export default function Owner() {
  const [activePage, setActivePage] = useState('edit')

  const menuItems = [
    {
      label: "edit Food",
      key: "edit"
    },
    {
      label: "ምግብ ጨምር",
      key: "addFood"
    },
    {
      label: "ምድብ ጨምር ",
      key: "addCatagory"
    },
  ]

  return (

    <div className="flex flex-col md:flex-row gap-4  my-4 px-2 md:px-4 min-h-[80vh]">
      {/* Left Sidebar */}
      <div className="w-full md:w-2/7  bg-slate-100 rounded-xl shadow-sm overflow-y-auto  md:h-auto">
        <ul className="flex md:flex-col justify-around  md:mt-20 md:justify-between  md:gap-20p   md:space-y-20 flex-row md:gap-6 gap-2 p-2 md:p-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`p-2 md:p-3 text-sm md:text-lg font-semibold whitespace-nowrap rounded-xl cursor-pointer transition 
            ${activePage === item.key
                  ? "bg-green-500 text-white"
                  : "bg-blue-100 hover:bg-green-300 hover:text-white"
                }`}
              onClick={() => setActivePage(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full bg-slate-200 rounded-xl shadow-sm p-4 overflow-y-auto h-[80vh] md:h-[80vh]">
        {activePage === "edit" && 'food edit'}
        {activePage === "addFood" && <AddFood />}
        {activePage === "addCatagory" &&  <CategoryPage />}

      </div>

    </div>

  );
}
