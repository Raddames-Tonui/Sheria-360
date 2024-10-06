import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LawyerSearchCard = () => {
  return (
    <div className="mt-4 mx-4 sm:mx-0">
      <h2 className="text-center text-4xl font-bold">Search Lawyers</h2>
      <div className="bg-lime-700 rounded-lg w-full mt-4 py-8 sm:py-16 flex flex-col items-center justify-center">
        <p className="text-center text-lg sm:text-2xl text-white mb-4">
          You can now easily find lawyers based on their area of expertise and the counties they serve.
        </p>
        <Link 
          to="/lawyers" 
          className="flex items-center text-white text-md sm:text-lg font-semibold px-4 py-2 border border-white rounded hover:bg-white hover:text-lime-700 transition duration-300"
        >
          <MdSearch className="mr-2" /> Search Lawyers
        </Link>
      </div>
    </div>
  );
};

export default LawyerSearchCard;
