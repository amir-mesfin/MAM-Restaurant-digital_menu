import React from 'react';
import { headerData } from './ctousel.js';

export default function HeaderBelow() {
  return (
    <div className="hidden lg:flex gap-10 flex-wrap justify-around items-center bg-[#A47621] p-5">
      {headerData.map((item, index) => (
        <div
          key={index}
          className="min-w-[100px] flex gap-3 items-center 
                     hover:py-2 hover:px-4 hover:bg-gray-500 
                     hover:rounded-2xl hover:underline-offset-1 transition"
        >
          <img className="w-10 h-10" src={item.icon} alt={item.content} />
          <span className="text-white font-semibold">{item.content}</span>
        </div>
      ))}
    </div>
  );
}
