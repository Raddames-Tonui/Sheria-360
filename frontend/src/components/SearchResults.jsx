import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ isSearching, currentResults }) => {
  return (
    <div className="mt-2 w-full max-w-3xl bg-white p-4 rounded-md shadow-lg">
      {isSearching ? (
        <div className="text-center text-gray-600">Searching...</div>
      ) : currentResults.length > 0 ? (
        <div className="flex flex-col space-y-1">
          {currentResults.map((result, index) => (
            <Link 
              to={`/lawyer/${result.id}`} 
              key={index} 
              className="border border-gray-200 rounded-lg p-2 bg-gray-100 hover:bg-lime-200 transition-colors duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900">
                {result.first_name} {result.last_name}
              </h3>
              <p className="text-gray-700">
                <span className='font-bold'>Expertise: </span> {result.expertise} <span className='font-bold'>Location:</span> {result.location}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
