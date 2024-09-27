import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {server_url} from '../../../config.json'

const LawyersByExpertise = () => {
  const { expertise } = useParams(); // Get the selected expertise from the URL
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch lawyers based on expertise when the component mounts or expertise changes
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch(`${server_url}/api/users/by-filters?expertise=${encodeURIComponent(expertise)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lawyers');
        }
        const data = await response.json();
        setLawyers(data); // Set the list of lawyers
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [expertise]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lawyers Specialized in {expertise}</h1>

      {lawyers.length > 0 ? (
        <ul className="space-y-4">
          {lawyers.map((lawyer) => (
            <li key={lawyer.id} className="border p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">{lawyer.first_name} {lawyer.last_name}</h2>
              <p className="text-gray-700">{lawyer.expertise}</p>
              <p className="text-gray-700">{lawyer.experience} years of experience</p>
              <p className="text-gray-700">{lawyer.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lawyers found with expertise in {expertise}</p>
      )}
    </div>
  );
};

export default LawyersByExpertise;
