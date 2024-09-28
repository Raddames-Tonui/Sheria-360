import React from 'react';
import { useNavigate } from 'react-router-dom';

const counties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho",
  "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya",
  "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

const PracticeLocations = () => {
  const navigate = useNavigate();

  // Navigate to the lawyers page for the selected area
  const handleCountyClick = (county) => navigate(`/lawyers-county/${encodeURIComponent(county)}`);

  return (
    <div className='bg-lime-100'>
      <div className="container p-8 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">FIND LAWYERS BY KENYAN COUNTIES</h2>

        {/* Counties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:w-[80vw] mx-auto">
          {counties.map((county, index) => (
            <div key={index} className="flex items-start hover:rounded-sm hover:text-lime-600 hover:underline">
              <span 
                className="hover:font-bold cursor-pointer hover:text-lime-600 text-left w-full"
                onClick={() => handleCountyClick(county)}
              >
                {county}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeLocations;
