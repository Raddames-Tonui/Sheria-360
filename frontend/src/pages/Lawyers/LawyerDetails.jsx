import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
import { server_url } from '../../../config.json';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../../App.css';

const LawyerDetails = () => {
  const { id } = useParams(); 
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const form = useRef();

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

  const {
    profile_picture,
    first_name,
    last_name,
    expertise,
    experience,
    location,
    law_firm,
    bio,
    phone,
    work_email
  } = lawyer;

  const DEFAULT_PROFILE_IMAGE_SVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-32 h-32 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14c-3.313 0-6-2.686-6-6s2.687-6 6-6 6 2.686 6 6-2.687 6-6 6zm0 2c4.418 0 8 2.686 8 6v2H4v-2c0-3.314 3.582-6 8-6z"
      />
    </svg>
  );

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_u2eng7g', 'template_88yjp5h', form.current, 'RlUTpTp2Kj8YRExYO')
      .then(
        () => {
          console.log('SUCCESS!');
          setShowContactForm(false);
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <div className="bg-gray-100 p-10 h-[90vh]">
      <div className="bg-lime-200 py-10 w-[80vw] mx-auto shadow-xl">
        <div className="ml-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {profile_picture ? (
            <img
              src={profile_picture}
              alt={`${first_name} ${last_name}`}
              className="w-32 h-32 border border-gray-300 object-cover"
            />
          ) : (
            DEFAULT_PROFILE_IMAGE_SVG
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{`${first_name} ${last_name}`}</h1>
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
          <button
            onClick={() => setShowContactForm(!showContactForm)}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          >
            Contact Us
          </button>
          {showContactForm && (
            <div className="mt-6 w-[60vw] mx-auto">
              <form ref={form} onSubmit={sendEmail}>
                <input type="hidden" name="work_email" value={work_email} />
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Jon Doe"
                  required
                />
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                  Your Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message here..."
                  rows="4"
                  required
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="ml-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerDetails;
