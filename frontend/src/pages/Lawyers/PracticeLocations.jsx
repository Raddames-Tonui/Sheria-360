import React from 'react';
import { useNavigate } from 'react-router-dom';

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nyeri', 'Meru',
  'Machakos', 'Uasin Gishu', 'Kakamega', 'Kitui', 'Bomet', 'Trans Nzoia', 'Kirinyaga',
  'Embu', 'Homa Bay', 'Busia', 'Siaya', 'Taita Taveta', 'Narok', 'Laikipia'
];

const PracticeLocations = () => {
  const navigate = useNavigate();

  // Navigate to the lawyers page for the selected area
  const handleCountyClick = (county) => navigate(`/lawyers-county/${encodeURIComponent(county)}`);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl text-center font-bold text-gray-700 mb-4">Find Lawyers by KENYAN COUNTIES</h2>

      {/* Counties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {counties.map((county, index) => (
          <ul key={index} className="space-y-2 text-gray-700">
            <li className="hover:text-lime-700 cursor-pointer" onClick={() => handleCountyClick(county)}>
              {county}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PracticeLocations;
