import React from 'react';

const LegalSearch = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/path-to-your-image.png')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Helping You With Your Legal Needs
        </h1>
        
        {/* Search Form */}
        <div className="flex justify-center items-center space-x-4">
          {/* Legal Issue or Lawyer Search */}
          <input
            type="text"
            placeholder="Search Legal Issue or Lawyer Name"
            className="p-3 text-gray-800 w-72 md:w-96 rounded-md focus:outline-none"
          />
          
          {/* Location Search */}
          <div className="flex items-center space-x-2">
            <span className="text-white">in</span>
            <input
              type="text"
              placeholder="County"
              className="p-3 text-gray-800 w-36 md:w-48 rounded-md focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md focus:outline-none">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalSearch;
