import React, { useState } from 'react';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    bio: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lawyer Details Submitted:', formData);
    // Here, you would typically send the formData to your backend
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Lawyer Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="" disabled>Select County</option>
              {counties.map((county) => (
                <option key={county.number} value={county.name}>
                  {county.number}. {county.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              required
              placeholder="Area of Expertise"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="Years of Experience"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              placeholder="Brief Bio"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 h-24"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LawyerDetailsForm;
