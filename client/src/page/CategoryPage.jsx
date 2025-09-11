import React from 'react'

export default function CategoryPage() {
  return (
    <div className='flex flex-col'>
      <h2 className='mx-auto text-2xl  font-semibold italic '> የምግብ ምድብ ጨምር</h2>
      <div>
        <h3> edit Catagory </h3>

      </div>
      <div className=''>
        <form action="" className='flex flex-col '>
          <div className='flex flex-col'>
            <label className='mb-2 font-semibold  italic'> add food catagory name  </label>
            <input type="text" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='add new catagory ' />
          </div>
                   
              <div className='flex flex-col'>
                <label className='mb-2 font-semibold  italic'> add food catagory image </label>
                <div>
                <input type="text" className='bg-white border-0  p-3   focus:outline-amber-300 rounded-lg  ml-5 mr-4' placeholder='image' />
                <button className='rounded-lg bg-white p-3 ' type='button'>uploading </button>
                </div>
                
              </div>
            
          
        
        </form>

      </div>
    </div>
  )
}


// amirhttp://localhost:5173/Amir@   http://localhost:5173/Amir@