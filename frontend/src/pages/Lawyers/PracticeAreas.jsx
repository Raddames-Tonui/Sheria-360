import React from 'react';
import { useNavigate } from 'react-router-dom';

const PracticeAreas = () => {
  const navigate = useNavigate(); 

  const areas = [
    { category: 'Commercial Law', areas: ['Banking & Finance', 'Real Estate', 'Intellectual Property'] },
    { category: 'Public Law', areas: ['Constitutional Law', 'Environmental Law', 'Administrative Law'] },
    { category: 'Private Law', areas: ['Family Law', 'Probate & Estate Administration', 'Employment Law'] },
    { category: 'Criminal Law', areas: ['Criminal Defense', 'Traffic Offenses', 'Anti-Corruption'] },
    { category: 'Specialized Areas', areas: ['Maritime Law', 'Aviation Law', 'Sports Law'] }
  ];

  const handleAreaClick = (area) => {
    navigate(`/lawyers-expertise/${encodeURIComponent(area)}`);
  };

  return (
    <div className='bg-lime-100'>
      <div className="container p-8 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">FIND LAWYERS BY PRACTICE AREA</h2>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:w-[80vw] mx-auto">
          {areas.map((group, index) => (
            <div key={index} className="flex flex-col items-center p-4 hover:bg-lime-200 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">{group.category}</h3>
              <ul className="text-center">
                {group.areas.map((area, i) => (
                  <li
                    key={i}
                    className="text-gray-600 hover:text-lime-700 cursor-pointer"
                    onClick={() => handleAreaClick(area)}
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
