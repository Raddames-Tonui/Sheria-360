// LawyerDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server_url } from '../../../config.json';
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

const LawyerDetailsForm = () => {
  const { id } = useParams(); 
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(`${server_url}/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lawyer details');
        }
        const data = await response.json();
        setLawyer(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {lawyer ? (
        <>
          {/* Lawyer Profile */}
          <div className="flex items-center space-x-4">
            <div>
              {lawyer.profile_picture ? (
                <img
                  src={lawyer.profile_picture}
                  alt={`${lawyer.first_name} ${lawyer.last_name}`}
                  className="w-32 h-32 object-cover rounded-full"
                />
              ) : (
                <BiUserCircle className="w-32 h-32 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{lawyer.first_name} {lawyer.last_name}</h1>
              <p className="text-gray-700">Expertise: {lawyer.expertise}</p>
              <p className="text-gray-700">{lawyer.experience} years of experience</p>
              <p className="text-gray-700">Location: {lawyer.location}</p>
              <p className="text-gray-700">Law Firm: {lawyer.law_firm}</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="text-gray-700">{lawyer.bio}</p>
          </div>

          {/* Contact Information */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p>
              <FaPhoneAlt /> <span className="ml-2">{lawyer.phone}</span>
            </p>
            <p>
              <FaEnvelope /> <span className="ml-2">{lawyer.email}</span>
            </p>
            {lawyer.work_email && (
              <p>
                <FaEnvelope /> <span className="ml-2">{lawyer.work_email} (Work Email)</span>
              </p>
            )}
          </div>

          {/* Additional Information */}
          {/* <div className="mt-6">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <p><strong>Created at:</strong> {moment(lawyer.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><strong>Last updated at:</strong> {moment(lawyer.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
          </div> */}
        </>
      ) : (
        <p>No details available for this lawyer.</p>
      )}
    </div>
  );
};

export default LawyerDetailsForm;
