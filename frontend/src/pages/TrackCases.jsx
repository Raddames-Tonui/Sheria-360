import React, { useState } from 'react';
import CaseDetailsDisplay from '../components/CaseDetailsDisplay';

const TrackCases = () => {
  // Initialize form state as a single object
  const [formState, setFormState] = useState({
    selectedStation: '',
    selectedCourt: '',
    caseCode: '',
    caseNumber: '',
    year: ''
  });
  
  const [availableCourts, setAvailableCourts] = useState([]);
  const [caseDetails, setCaseDetails] = useState(null);
  const [error, setError] = useState('');

  const judiciaryData = {
    stations: [
      { name: "Milimani Law Courts" },
      { name: "Nairobi Law Courts" },
      { name: "Mombasa Law Courts" },
    ],
    availableCourts: [
      "Milimani Environment and Land Court",
      "Milimani High Court",
      "Mombasa High Court",
    ],
  };
  
  const CaseTypes = [
    { id: "C835", label: "C835 - Environmental Case" },
    { id: "C836", label: "C836 - Criminal Case" },
    { id: "C837", label: "C837 - Civil Case" },
  ];
  
  
  

  // Consolidated handleChange function for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,  // Keep other fields unchanged
      [name]: value  // Update the changed field
    });

    // Special handling for station change to update courts
    if (name === 'selectedStation') {
      const courts = judiciaryData.stations.find((s) => s.name === value)?.courts || [];
      setAvailableCourts(courts);
      setFormState((prevState) => ({
        ...prevState,
        selectedCourt: ''  // Reset selected court when station changes
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { caseCode, caseNumber, year, selectedStation, selectedCourt } = formState;
  
    // Input validation
    if (!caseCode || !caseNumber || !year || !selectedStation || !selectedCourt) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      // Construct URL with query parameters
      const url = `http://127.0.0.1:5555/case/search-case?station=${encodeURIComponent(selectedStation)}&court=${encodeURIComponent(selectedCourt)}&caseCode=${encodeURIComponent(caseCode)}&caseNumber=${encodeURIComponent(caseNumber)}&year=${year}`;
  
      // Make the API request
      const response = await fetch(url, {
        method: 'GET', // Assuming you are using GET for this API
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse JSON response
  
       
        if (data) {
          setCaseDetails(data);
          setError('');
        } else {
          setCaseDetails(null);
          setError('No case found matching the provided details.');
        }
      } else {
        setCaseDetails(null);
        setError('Error fetching case data from the backend.');
      }
    } catch (error) {
      console.error('Error fetching case data:', error);
      setCaseDetails(null);
      setError('Failed to connect to the server.');
    }
  };
  

return (
  <div className="px-20 py-8">
    <div className="bg-lime-700 rounded-sm p-8">
      <h1 className="text-white text-lg font-bold mb-6">Welcome to Enter your case details as per the fields below</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <div className="flex gap-8 px-4">
      {/* Select Station */}
      <div className="mb-4 w-1/3">
        <label htmlFor="selectedStation" className="block text-white font-medium mb-2">Select Station</label>
        <select
          id="selectedStation"
          name="selectedStation"
          className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
          value={formState.selectedStation}
          onChange={handleChange} 
        >
          <option value="">Select Station</option>
          {judiciaryData.stations.map((station, index) => (
            <option key={index} value={station.name}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Court */}
      <div className="mb-4 w-1/3">
        <label htmlFor="selectedCourt" className="block text-white font-medium mb-2">Choose the court in which your case is filed</label>
        <select
          id="selectedCourt"
          name="selectedCourt" 
          className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
          value={formState.selectedCourt}
          onChange={handleChange}
          disabled={!judiciaryData.availableCourts.length}
        >
          <option value="">Choose the court</option>
          {judiciaryData.availableCourts.map((court, index) => (
            <option key={index} value={court}>
              {court}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 pt-2 bg-lime-900 px-4 rounded-md justify-between">
      {/* Case Code */}
      <div className="mb-4">
        <label htmlFor="caseCode" className="block text-white font-medium mb-2">Case Code</label>
        <select
          id="caseCode"
          name="caseCode" 
          className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
          value={formState.caseCode}
          onChange={handleChange}
        >
          <option value="">Select Case Code</option>
          {CaseTypes.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* Case Number */}
      <div className="mb-4">
        <label htmlFor="caseNumber" className="block text-white font-medium mb-2">Case Number</label>
        <input
          type="text"
          id="caseNumber"
          name="caseNumber" 
          placeholder="Enter Case Number"
          className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
          value={formState.caseNumber}
          onChange={handleChange}
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label htmlFor="year" className="block text-white font-medium mb-2">Year</label>
        <select
          id="year"
          name="year" 
          className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
          value={formState.year}
          onChange={handleChange}
        >
          <option value="">Select Year</option>
          {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => (
            <option key={i} value={2000 + i}>{2000 + i}</option>
          ))}
        </select>
      </div>
    </div>
  </div>

  {/* Search Button */}
  <div className="flex justify-center mt-4">
    <button
      type="submit"
      className="bg-white text-lime-700 py-2 px-4 rounded-md hover:bg-lime-300"
    >
      Search
    </button>
  </div>

  {/* Error Message */}
</form>

    </div>
    {error && <div className="text-red-500 text-center mt-4 font-bold">{error}</div>}





       
      <div>
         {/* Case Details Display */}
         <CaseDetailsDisplay caseDetails={caseDetails} />

      </div>
    </div>
  );
};

export default TrackCases;
