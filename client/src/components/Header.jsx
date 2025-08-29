import React from 'react'
import logo from '../../public/image/mamLogo.png'

export default function Header() {
  return (
    <div className="flex items-center gap-3 justify-center bg-[#784115] p-4 shadow-md">
      <img 
        src={logo} 
        alt="Mam Restaurant Logo" 
        className="h-16 w-16 rounded-full object-cover"
      />
      <h1 className="text-3xl  font-bold text-white tracking-wide italic drop-shadow-[5px_5px_7px_rgba(0,0,0,0.9)]">
      ማም ሬስቶራንት
      </h1>
    </div>
  )
}
