import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LawyersPage = () => {
  const { area } = useParams(); 
  const [lawyers, setLawyers] = useState([]);

  // Mock API call to fetch lawyers for the selected area
  const fetchLawyers = async (area) => {
    const mockLawyers = [
      {
        name: 'Jeremy Pollack',
        location: 'Mill Valley, CA',
        phone: '(415) 292-4100',
        consultation: 'Free Consultation',
        lawSchool: 'University of Colorado Law School',
        state: 'California'
      }
    ];
    setLawyers(mockLawyers);
  };

  useEffect(() => {
    fetchLawyers(area); 
  }, [area]);

  return (
    <div className="bg-white shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Lawyers Practicing in {area}</h1>
      {lawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lawyers.map((lawyer, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800">{lawyer.name}</h3>
              <p className="text-gray-600">{lawyer.location}</p>
              <p className="text-gray-600">{lawyer.phone}</p>
              <p className="text-blue-600 font-semibold">{lawyer.consultation}</p>
              <p className="text-gray-500">{lawyer.lawSchool}</p>
              <p className="text-gray-500">{lawyer.state}</p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">View Profile</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Email Lawyer</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No lawyers found for {area}</p>
      )}
    </div>
  );
};

export default LawyersPage;
