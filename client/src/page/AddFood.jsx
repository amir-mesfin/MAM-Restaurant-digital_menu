import React from 'react'

export default function AddFood() {
  return (
    <div className=''>
      <h1 className='text-2xl font-semibold max-auto italic text-center mb-7'>Add food</h1>
       <form className=' max-w-3xl mx-auto flex flex-col space-y-7'>
           <div className='flex flex-col italic font-semibold space-y-1.5 '>
            <label className=''> Food name</label>
            <input type="text" className='ml-3 p-3 bg-white rounded-2xl border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='inter food  name' />
           </div>
           <div className='flex flex-col italic font-semibold space-y-1.5 '>
            <label className=''> Food name</label>
            <input type="text" className='ml-3 p-3 bg-white rounded-2xl border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='inter food  name' />
           </div>
           <div className='flex flex-col italic font-semibold space-y-1.5 '>
            <label className=''> Food name</label>
            <input type="text" className='ml-3 p-3 bg-white rounded-2xl border border-gray-300  focus:outline-none focus:ring-2 focus:ring-amber-500' placeholder='inter food  name' />
           </div>
       </form>
    </div>
  )
}
