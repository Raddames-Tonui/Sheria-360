import React, { useState, useEffect } from 'react';
import { server_url } from '../../../config.json';

// County list
const counties = [
  { name: 'Mombasa', number: 1 },
  { name: 'Kwale', number: 2 },
  { name: 'Kilifi', number: 3 },
  { name: 'Tana River', number: 4 },
  { name: 'Lamu', number: 5 },
  { name: 'Taita Taveta', number: 6 },
  { name: 'Garissa', number: 7 },
  { name: 'Wajir', number: 8 },
  { name: 'Mandera', number: 9 },
  { name: 'Marsabit', number: 10 },
  { name: 'Isiolo', number: 11 },
  { name: 'Meru', number: 12 },
  { name: 'Tharaka-Nithi', number: 13 },
  { name: 'Embu', number: 14 },
  { name: 'Kitui', number: 15 },
  { name: 'Machakos', number: 16 },
  { name: 'Makueni', number: 17 },
  { name: 'Nyandarua', number: 18 },
  { name: 'Nyeri', number: 19 },
  { name: 'Kirinyaga', number: 20 },
  { name: "Murang'a", number: 21 },
  { name: 'Kiambu', number: 22 },
  { name: 'Turkana', number: 23 },
  { name: 'West Pokot', number: 24 },
  { name: 'Samburu', number: 25 },
  { name: 'Trans Nzoia', number: 26 },
  { name: 'Uasin Gishu', number: 27 },
  { name: 'Elgeyo Marakwet', number: 28 },
  { name: 'Nandi', number: 29 },
  { name: 'Baringo', number: 30 },
  { name: 'Laikipia', number: 31 },
  { name: 'Nakuru', number: 32 },
  { name: 'Narok', number: 33 },
  { name: 'Kajiado', number: 34 },
  { name: 'Kericho', number: 35 },
  { name: 'Bomet', number: 36 },
  { name: 'Kakamega', number: 37 },
  { name: 'Vihiga', number: 38 },
  { name: 'Bungoma', number: 39 },
  { name: 'Busia', number: 40 },
  { name: 'Siaya', number: 41 },
  { name: 'Kisumu', number: 42 },
  { name: 'Homa Bay', number: 43 },
  { name: 'Migori', number: 44 },
  { name: 'Kisii', number: 45 },
  { name: 'Nyamira', number: 46 },
  { name: 'Nairobi', number: 47 },
];

const LegalSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  // Function to fetch search results
  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const countyQueryParam = selectedCounty ? `&location=${encodeURIComponent(selectedCounty)}` : '';
      const response = await fetch(`${server_url}/api/users/search?query=${encodeURIComponent(query)}${countyQueryParam}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Trigger search when query or location changes
  useEffect(() => {
    handleSearch();
  }, [query, selectedCounty]);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(results.length / resultsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1); // Creates an array of page numbers

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white p-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">Helping You With Your Legal Needs</h1>

        {/* Search Form */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Legal Issue or Lawyer Name"
            className="p-3 text-gray-800 w-72 md:w-96 rounded-md focus:outline-none"
          />

          {/* Location Dropdown */}
          <div className="flex justify-center items-center space-x-4">
          {/* Location Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-white">in</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="p-3 text-gray-800 w-36 md:w-48 rounded-md focus:outline-none"
            >
              <option value="">Select County</option>
              {counties.map((county) => (
                <option key={county.number} value={county.name}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md focus:outline-none"
            onClick={handleSearch}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md focus:outline-none"
            onClick={handleSearch}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Search Results Box */}
        <div className="mt-8 w-full max-w-3xl bg-white p-4 rounded-md shadow-lg">
          {isSearching ? (
            <div className="text-center text-gray-600">Searching...</div>
          ) : currentResults.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {currentResults.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">
                    {result.first_name} {result.last_name}
                  </h3>
                  <p className="text-gray-700">
                  <span className='font-bold'>Expertise: </span> {result.expertise}   <span className='font-bold'>Location:</span>  {result.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No results found.</div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
  <div className="flex justify-center mt-4">
    {currentPage > 1 && (
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-md"
      >
        Previous
      </button>
    )}
    {[...Array(4)].map((_, idx) => {
      const pageNumber = currentPage + idx - 1;
      if (pageNumber < 1 || pageNumber > totalPages) return null;
      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
        >
          {pageNumber}
        </button>
      );
    })}
    {currentPage < totalPages && (
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-md"
      >
        Next
      </button>
    )}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default LegalSearch;
