import React from 'react'

export default function HeaderBelow() {
  return (
    <div className=' hidden lg:flex  flex-wrap  justify-around items-center  bg-[#A47621] p-7 ' >
       { categories.map((item, index)=>(
           <div key={index}
            className='min-w-[100px]'>
                  { item}
           </div>

        ))}
    </div>
  )
}
