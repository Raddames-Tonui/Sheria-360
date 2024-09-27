import React from 'react';
import { useNavigate } from 'react-router-dom';

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nyeri', 'Meru',
  'Machakos', 'Uasin Gishu', 'Kakamega', 'Kitui', 'Bomet', 'Trans Nzoia', 'Kirinyaga',
  'Embu', 'Homa Bay', 'Busia', 'Siaya', 'Taita Taveta', 'Narok', 'Laikipia'
];

const PracticeLocations = () => {
  const navigate = useNavigate();

  const handleCountyClick = (county) => navigate(`/lawyers-county/${encodeURIComponent(county)}`);

  return (
    <div className="container mx-auto p-8">
      {/* FAQ and Get Listed Buttons */}
      <div className="flex justify-center mb-8">
        {['FAQ', 'Lawyers Get Listed'].map((text, idx) => (
          <button key={idx} className="bg-lime-700 hover:bg-lime-700 text-white py-2 px-6 rounded-md mx-2">
            {text}
          </button>
        ))}
      </div>

      {/* Counties Section */}
      {/* <h2 className="text-xl font-bold text-gray-700 mb-4">Find Lawyers by</h2>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">KENYAN COUNTIES</h1> */}

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
