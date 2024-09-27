import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

// List of counties
const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", 
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", 
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", 
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", 
  "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", 
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", 
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const LawyerSearchCard = () => {
  const [location, setLocation] = useState(''); // State to hold user input
  const [filteredCounties, setFilteredCounties] = useState(counties); // State to hold filtered list

  // Handle input change for the location field
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    // Filter the counties based on user input (case-insensitive)
    const filtered = counties.filter(county =>
      county.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCounties(filtered);
  };

  return (
    <div className="mt-4 ">
      <h2 className="text-center text-4xl font-bold">Search Lawyers</h2>
      <div className="bg-lime-700 rounded-lg w-full mt-4 py-16 flex flex-col items-center justify-center">
        <form action="" className="bg-white border-2 border-white w-3/4 rounded-lg  flex">
          {/* Lawyer Name input */}
          <input 
            type="text" 
            className="w-[45%] py-4 px-4 focus:outline-none rounded-lg" 
            placeholder="Enter Lawyer Name"
            aria-label="Lawyer Name"
          />
          
          {/* Location input with dynamic dropdown */}
          <div className="relative w-[45%]">
            <input 
              type="text" 
              value={location} 
              onChange={handleLocationChange}
              className="w-full py-4 px-4 focus:outline-none border-l  border-gray-300"
              placeholder="Enter Location"
              aria-label="Location"
            />
            {/* Dropdown list to show filtered counties */}
            {location && (
              <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-y-auto z-10">
                {filteredCounties.length > 0 ? (
                  filteredCounties.map((county, index) => (
                    <li 
                      key={index} 
                      className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                      onClick={() => setLocation(county)}
                    >
                      {county}
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Search button */}
          <button 
            className="bg-lime-700 border-2 border-lime-700 rounded-r-lg text-white w-[10%] flex items-center justify-center" 
            aria-label="Search"
          >
            <MdSearch size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LawyerSearchCard;
