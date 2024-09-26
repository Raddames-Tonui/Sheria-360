import React from 'react';

const PracticeAreas = () => {
  const areas = [
    { category: 'Commercial Law', areas: ['Banking & Finance', 'Real Estate', 'Intellectual Property'] },
    { category: 'Public Law', areas: ['Constitutional Law', 'Environmental Law', 'Administrative Law'] },
    { category: 'Private Law', areas: ['Family Law', 'Probate & Estate Administration', 'Employment Law'] },
    { category: 'Criminal Law', areas: ['Criminal Defense', 'Traffic Offenses', 'Anti-Corruption'] },
    { category: 'Specialized Areas', areas: ['Maritime Law', 'Aviation Law', 'Sports Law'] }
  ];

  return (
    <div className="bg-white shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Lawyers by PRACTICE AREA</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas.map((group, index) => (
          <div key={index} className="p-4 hover:bg-blue-100 rounded-lg">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">{group.category}</h2>
            <ul>
              {group.areas.map((area, i) => (
                <li key={i} className="text-gray-600 hover:text-blue-600 cursor-pointer">{area}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeAreas;
