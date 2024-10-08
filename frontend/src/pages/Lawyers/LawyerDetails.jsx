import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server_url } from '../../../config.json';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../../App.css';
import ContactLawyerModal from './ContactLawyerModal';
import { PiPhoneCallFill } from "react-icons/pi";

const LawyerDetails = () => {
  const { id } = useParams(); 
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(`${server_url}/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lawyer details');
        }
        const data = await response.json();
        setLawyer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (!lawyer) {
    return <div>No details available for this lawyer.</div>;
  }

  const { profile_picture, first_name, last_name, expertise, experience, location, law_firm, bio, phone, work_email } = lawyer;

  return (
    <div className="bg-slate-100 md:p-5 h-[90vh] overflow-y-scroll no-scrollbar">
      <div className="bg-white border border-gray-300 py-10 md:w-[80vw] mx-auto shadow-xl">
        <div className="ml-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          
          <img
            src={profile_picture || "/svgs/lawyer-icon.svg"}
            alt="User Avatar"
            className="w-32 h-32 border border-gray-300 object-cover "
            onError={(e) => {
              e.target.src = "/svgs/lawyer-icon.svg"; // Set to default avatar on error
            }}
          />

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{`${first_name || 'Profile not available'} ${last_name || ''}`}</h1>
            <p className="text-gray-700">{`${experience} years of experience`}</p>
            <p className="text-gray-700">Location: {location}</p>
            <p className="text-gray-700">Law Firm: {law_firm}</p>
          </div>
        </div>
        <div className="mt-6 ml-10">
          <h2 className='text-xl font-semibold text-lime-500'>Expertise</h2>
          <p className="text-gray-700">{expertise}</p>     
        </div>
        <div className="mt-6 ml-10">
          <h2 className="text-xl font-semibold text-lime-500">Bio</h2>
          <p className="text-gray-700">{bio}</p>
        </div>
        <div className="mt-6 ml-10">
          <h2 className="text-xl font-semibold text-lime-500">Contact Information</h2>
          <p className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span>{phone}</span>
          </p>
          {work_email && (
            <p className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>{work_email}</span>
            </p>
          )}
          <div className='flex justify-center'>
            <button
              onClick={() => setShowContactForm(true)}
              className="m-8 bg-lime-600 hover:bg-lime-700 shadow-xl text-white font-bold px-6 py-3 rounded-md flex"
            >
              Contact Us <span className='pl-2 text-2xl'><PiPhoneCallFill /></span>
            </button>
          </div>
        </div>
      </div>

      {/* Render the ContactForm Modal */}
      <ContactLawyerModal 
        showContactForm={showContactForm} 
        setShowContactForm={setShowContactForm} 
        work_email={work_email} 
      />
    </div>
  );
};

export default LawyerDetails;
