import React from 'react';

export default function Owner() {
  return (
    <div className="min-h-screen sm:flex">

      {/* Sidebar / Menu */}
      <div className="flex sm:flex-col gap-17 overflow-x-auto sm:overflow-x-visible bg-amber-400 p-4 border-white sm:border-r-2 border-b-1">
        <div className="flex-shrink-0 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-md cursor-pointer text-white  font-semibold italic sm:text-2xl">Edit</div>
        <div className="flex-shrink-0 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-md cursor-pointer text-white  font-semibold italic sm:text-2xl">ምግብ ጨምር</div>
        <div className="flex-shrink-0 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-md cursor-pointer text-white  font-semibold italic sm:text-2xl">ምድብ ጨምር</div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Your main content here */}
      </div>

    </div>
  );
}
