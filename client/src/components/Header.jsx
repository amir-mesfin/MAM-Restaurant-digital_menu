import React from 'react'
import logo from '../../public/image/mamLogo.png'
export default function Header() {
  return (
    <div className='flex  items-center  gap-3  justify-center bg-[#774116] '>
         <img src={logo} alt="" 
              className='h-23 w-23 rounded-full'/>
         <h1 className=''>Mam Restaurant </h1>
    </div>
  )
}