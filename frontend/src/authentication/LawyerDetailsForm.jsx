// src/components/LawyerDetailsForm.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { server_url } from '../../config.json';

const counties = [
  { name: "Mombasa", number: 1 },
  { name: "Kwale", number: 2 },
  { name: "Kilifi", number: 3 },
  { name: "Tana River", number: 4 },
  { name: "Lamu", number: 5 },
  { name: "Taita Taveta", number: 6 },
  { name: "Garissa", number: 7 },
  { name: "Wajir", number: 8 },
  { name: "Mandera", number: 9 },
  { name: "Marsabit", number: 10 },
  { name: "Isiolo", number: 11 },
  { name: "Meru", number: 12 },
  { name: "Tharaka-Nithi", number: 13 },
  { name: "Embu", number: 14 },
  { name: "Kitui", number: 15 },
  { name: "Machakos", number: 16 },
  { name: "Makueni", number: 17 },
  { name: "Nyandarua", number: 18 },
  { name: "Nyeri", number: 19 },
  { name: "Kirinyaga", number: 20 },
  { name: "Murang'a", number: 21 },
  { name: "Kiambu", number: 22 },
  { name: "Turkana", number: 23 },
  { name: "West Pokot", number: 24 },
  { name: "Samburu", number: 25 },
  { name: "Trans Nzoia", number: 26 },
  { name: "Uasin Gishu", number: 27 },
  { name: "Elgeyo Marakwet", number: 28 },
  { name: "Nandi", number: 29 },
  { name: "Baringo", number: 30 },
  { name: "Laikipia", number: 31 },
  { name: "Nakuru", number: 32 },
  { name: "Narok", number: 33 },
  { name: "Kajiado", number: 34 },
  { name: "Kericho", number: 35 },
  { name: "Bomet", number: 36 },
  { name: "Kakamega", number: 37 },
  { name: "Vihiga", number: 38 },
  { name: "Bungoma", number: 39 },
  { name: "Busia", number: 40 },
  { name: "Siaya", number: 41 },
  { name: "Kisumu", number: 42 },
  { name: "Homa Bay", number: 43 },
  { name: "Migori", number: 44 },
  { name: "Kisii", number: 45 },
  { name: "Nyamira", number: 46 },
  { name: "Nairobi", number: 47 },
];

const LawyerDetailsForm = () => {
  const { token } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',  
    phone: '',
    expertise: '',
    experience: '',
    bio: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${server_url}/api/lawyer/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update details');
      }

      const data = await response.json();
      setSuccess(true);
      console.log('Lawyer Details Updated:', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      const response = await fetch(`${server_url}/api/lawyer/details`, { 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data); 
      }
    };

    fetchLawyerDetails();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Lawyer Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="Work Email"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Expertise"
            className="w-full px-4 py-2 border rounded-lg"
          />

            <input
              type="number"  // Change input type to number
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience (in years)"
              className="w-full px-4 py-2 border rounded-lg"
              min="0" 
            />


          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Short Bio"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select your location</option>
            {counties.map((county) => (
              <option key={county.number} value={county.name}>
                {county.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Details'}
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Details updated successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default LawyerDetailsForm;
