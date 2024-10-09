import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { server_url } from '../../../config.json';
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa"; 
import "../../App.css"

const LawyersByExpertise = () => {
  const { expertise } = useParams(); 
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch(`${server_url}/api/users/by-filters?expertise=${encodeURIComponent(expertise)}`);
        if (!response.ok) {
          throw new Error("Hmm, can't reach this page");
        }
        const data = await response.json();
        setLawyers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [expertise]);

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="loader-container"><div>Error: {error}</div></div>;
  }

  return (
    <div className='bg-slate-100 min-h-[90vh]'>
      <div className="container mx-auto p-8 ">
        <div className='bg-white py-4 shadow-2xl md:w-[80vw] mx-auto border border-gray-300'>
        <h1 className="text-center text-3xl font-bold text-lime-600 mb-3">Lawyers Specialized in {expertise}</h1>

          {lawyers.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {lawyers.map((lawyer) => (
                <li key={lawyer.id} className="border border-gray-300 p-4 rounded-md shadow-sm bg-gray-100 hover:bg-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 border-b border-gray-300">
                    <div className='p-4 flex justify-center'>
                    {lawyer.profile_picture ? (
                          <img
                            src={lawyer.profile_picture}
                            alt={`${lawyer.first_name} ${lawyer.last_name}`}
                            className="w-40 h-40 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "/svgs/lawyer-icon.svg"; 
                            }}
                          />
                        ) : (
                          <img
                            src="/svgs/lawyer-icon.svg"
                            alt="Default Avatar"
                            className="w-40 h-40 object-cover rounded-lg"
                          />
                        )}
                    </div>
                    <div className="flex flex-col col-span-2 space-y-2">
                      <h2 className="text-2xl font-semibold">{lawyer.first_name} {lawyer.last_name}</h2>
                      <p className="text-gray-700 font-semibold">{lawyer.expertise}</p>
                      <p className="text-gray-700">{lawyer.experience} years of experience</p>
                      <p className="text-gray-700">{lawyer.location}</p>
                      <p className="text-gray-700">{lawyer.law_firm}</p>
                      <div className="flex space-x-4 mt-2">
                        <a href={`tel:${lawyer.phone}`} className="text-lime-500 hover:text-lime-700 flex items-center space-x-1">
                          <FaPhoneAlt /> <span>{lawyer.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around mt-4">
                    <Link to={`/lawyer/${lawyer.id}`} className="text-lime-500 hover:text-lime-700 flex justify-center items-center">
                      <FaUser className="text-xl" />
                      <span className="text-md pl-2">View Profile</span>
                    </Link>
                    <a href={`mailto:${lawyer.email}`} className="text-lime-500 hover:text-lime-700 flex items-center">
                      <FaEnvelope className="text-xl" />
                      <span className="text-sm pl-2">Email</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center font-semibold text-red-600'>No lawyers found with expertise in {expertise}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyersByExpertise;
