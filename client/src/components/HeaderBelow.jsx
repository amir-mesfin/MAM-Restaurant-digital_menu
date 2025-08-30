import React from 'react'
import {headerData}  from './ctousel.js'
export default function HeaderBelow() {
  return (
    <div className=' hidden lg:flex  gap-10 flex-wrap  justify-around items-center  bg-[#A47621] p-7 ' >
       { headerData.map((item, index)=>(
           <div key={index}
            className='min-w-[100px] flex  gap-3 items-center hover:py-3 hover:px-5 hover:bg-gray-50'>
                  <img  className=' w-10 h-10 'src={item.icon} alt="" />
                  <span  className='text-white font-semibold '>{ item.content} </span>
           </div>

        ))}
    </div>
  )
}
