import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const TrackCases = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [caseCode, setCaseCode] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [year, setYear] = useState('');
  const [caseDetails, setCaseDetails] = useState(null);
  const [error, setError] = useState('');

  const CaseTypes = [
    { id: 'yy4q-288', label: 'MCCGCR - Magistrates Court County Government Criminal Matters' },
    { id: '19vo-229', label: 'MCCHSO - Sexual Offence - Children' },
    // ... other case types
  ];

  const judiciaryData = {
    stations: [
      {
        name: "Nairobi Law Courts",
        courts: ["Milimani High Court", "Nairobi Magistrate Court"]
      },
      {
        name: "Mombasa Law Courts",
        courts: ["Mombasa High Court", "Mombasa Magistrate Court"]
      }
    ]
  };

  const handleStationChange = (e) => {
    const station = e.target.value;
    setSelectedStation(station);
    const courts = judiciaryData.stations.find((s) => s.name === station)?.courts || [];
    setAvailableCourts(courts);
    setSelectedCourt('');
  };

  const handleCourtChange = (e) => {
    setSelectedCourt(e.target.value);
  };

  const handleCaseCodeChange = (e) => {
    setCaseCode(e.target.value);
  };

  const handleCaseNumberChange = (e) => {
    setCaseNumber(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input Validation
    if (!caseCode || !caseNumber || !year) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Fetch case details from the API
      const response = await axios.get(`/cases`, {
        params: {
          station: selectedStation,
          caseNumber: caseNumber,
        }
      });

      // Check if cases were found
      if (response.data && response.data.length > 0) {
        setCaseDetails(response.data[0]); // Assuming you want the first case
        setError('');
      } else {
        setCaseDetails(null);
        setError('No case found matching the provided details.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching case details.');
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
                <label htmlFor="station" className="block text-white font-medium mb-2">Select Station</label>
                <select
                  id="station"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={selectedStation}
                  onChange={handleStationChange}
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
                <label htmlFor="court" className="block text-white font-medium mb-2">Choose the court in which your case is filed</label>
                <select
                  id="court"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={selectedCourt}
                  onChange={handleCourtChange}
                  disabled={!availableCourts.length}
                >
                  <option value="">Choose the court</option>
                  {availableCourts.map((court, index) => (
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
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={caseCode}
                  onChange={handleCaseCodeChange}
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
                  placeholder="Enter Case Number"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={caseNumber}
                  onChange={handleCaseNumberChange}
                />
              </div>

              {/* Year */}
              <div className="mb-4">
                <label htmlFor="year" className="block text-white font-medium mb-2">Year</label>
                <input
                  type="number"
                  id="year"
                  min="2000"
                  max={new Date().getFullYear()}
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={year}
                  onChange={handleYearChange}
                />
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
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </form>

        {/* Case Details Display */}
        {caseDetails && (
          <div className="mt-8 bg-white p-4 rounded-md">
            <div className='text-center space-y-4'>
              <h2 className="text-lg text-center font-bold">Case Details</h2>
              <p className='text-3xl font-semibold'><strong>Case Number:</strong> {caseDetails.caseNumber}</p>
              <p className='text-2xl font-semibold'><strong>Citation:</strong> {caseDetails.citation}</p>
              <p className='text-2xl font-semibold'><strong>Tracking Number:</strong> {caseDetails.trackingNumber}</p>
            </div>

            {/* Info */}
            <div className='border-t-2 mt-4 border-collapse border-amber-500'>
              <div className='w-3/4'>
                <ul className='grid grid-cols-5  my-2 '>
                  <li className='p-2 border'>Case Summary</li>
                  <li className='p-2 border'>Parties</li>
                  <li className='p-2 border'>Case Activities</li>
                  <li className='p-2 border'>Invoice</li>
                  <li className='p-2 border'>Receipts</li>
                </ul>
              </div>
              <table className='min-w-1/4 border border-collapse border-amber-500'>
                <tbody>
                  <tr className='border-b border-grey-200'>
                    <td className='border border-grey-200 p-2 bg-amber-100'>Case Status</td>
                    <td className='border border-grey-200 p-2'>{caseDetails.status}</td>
                  </tr>
                  <tr className='border-b border-grey-200'>
                    <td className='border border-grey-200 p-2 bg-amber-100'>Last Updated</td>
                    <td className='border border-grey-200 p-2'>{caseDetails.lastUpdated}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCases;
