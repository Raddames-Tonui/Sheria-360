import React, { useState, useEffect } from 'react';
import { server_url } from '../../../config.json';
import SearchResults from '../../components/SearchResults';
import Pagination from '../../components/Pagination';


const counties = [
  { name: "Mombasa", number: 1 },
  { name: "Kwale", number: 2 },
  { name: "Kilifi", number: 3 },
  { name: "Tana River", number: 4 },
  { name: "Lamu", number: 5 },
  { name: "Taita Taveta", number: 6 },
  { name: "Garissa", number: 7 },
  { name: "Wajir", number: 8 },
  { name: "Mandera", number: 9 },
  { name: "Marsabit", number: 10 },
  { name: "Isiolo", number: 11 },
  { name: "Meru", number: 12 },
  { name: "Tharaka-Nithi", number: 13 },
  { name: "Embu", number: 14 },
  { name: "Kitui", number: 15 },
  { name: "Machakos", number: 16 },
  { name: "Makueni", number: 17 },
  { name: "Nyandarua", number: 18 },
  { name: "Nyeri", number: 19 },
  { name: "Kirinyaga", number: 20 },
  { name: "Murang'a", number: 21 },
  { name: "Kiambu", number: 22 },
  { name: "Turkana", number: 23 },
  { name: "West Pokot", number: 24 },
  { name: "Samburu", number: 25 },
  { name: "Trans Nzoia", number: 26 },
  { name: "Uasin Gishu", number: 27 },
  { name: "Elgeyo Marakwet", number: 28 },
  { name: "Nandi", number: 29 },
  { name: "Baringo", number: 30 },
  { name: "Laikipia", number: 31 },
  { name: "Nakuru", number: 32 },
  { name: "Narok", number: 33 },
  { name: "Kajiado", number: 34 },
  { name: "Kericho", number: 35 },
  { name: "Bomet", number: 36 },
  { name: "Kakamega", number: 37 },
  { name: "Vihiga", number: 38 },
  { name: "Bungoma", number: 39 },
  { name: "Busia", number: 40 },
  { name: "Siaya", number: 41 },
  { name: "Kisumu", number: 42 },
  { name: "Homa Bay", number: 43 },
  { name: "Migori", number: 44 },
  { name: "Kisii", number: 45 },
  { name: "Nyamira", number: 46 },
  { name: "Nairobi", number: 47 },
];

const LegalSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

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

  useEffect(() => {
    if (query || selectedCounty) {
      handleSearch();
    }
  }, [query, selectedCounty]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="bg-gray-100 h-[90vh]">
      {/* Background image wrapper */}
      <div 
        className="h-[90vh] p-20   relative flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url("/Images/books2.jpeg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}  
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center text-white p-4 md:p-6 overflow-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-6">
            Helping You With Your Legal Needs
          </h1>

          {/* Search Form */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Legal Issue or Lawyer Name"
              className="p-2 md:p-3 text-gray-800 w-64 sm:w-72 md:w-96 rounded-md focus:outline-none"
            />
            <div className="flex items-center space-x-2">
              <span className="text-white hidden sm:inline">in</span>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="p-2 md:p-3 text-gray-800 w-32 sm:w-36 md:w-48 rounded-md focus:outline-none"
              >
                <option value="">Select County</option>
                {counties.map((county) => (
                  <option key={county.number} value={county.name}>
                    {county.number}. {county.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results Box */}
          <SearchResults isSearching={isSearching} currentResults={currentResults} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalSearch;
