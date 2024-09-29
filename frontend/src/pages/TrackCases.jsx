import React, { useState } from 'react';

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
    { id: '89w4-38', label: 'MCP&CPS - Magistrate Court Protection and Care - Police Station' },
    { id: 'cj3r-72', label: 'MCSO - Sexual Offences' },
    { id: 'gci0-33', label: 'MCCR - Magistrate Court Criminal Case' },
    { id: '3jua-83', label: 'MCP&CCO - Magistrate Court Protection and Care-Children Office' },
    { id: 'iqts-42', label: 'MCAC - Magistrate Court Anti-Corruption' },
    { id: '0meo-84', label: 'MCCHCR - Magistrate Court Criminal - Children' },
    { id: '4tty-289', label: 'MCCGCRMISC - Magistrates Court County Government Criminal Miscellaneous' },
    { id: '5j56-73', label: 'MCEO - Election Offences' },
    { id: '4o4p-116', label: 'MCPCR - Magistrate Court Petty Criminal' },
    { id: '5xh4-71', label: 'MCINQ - Inquest' },
    { id: 'r1g1-296', label: 'MGJCCR - Magistrates Gender Justice Criminal Case' },
    { id: 'nkks-70', label: 'MCACMISC - Magistrate Court Anti-Corruption Miscellaneous' },
    { id: 'wgds-35', label: 'MCTR - Magistrate Court Traffic Case' },
    { id: '85db-34', label: 'MCCRMISC - Magistrate Court Criminal Miscellaneous' },
  ];

  const casesData = [
    {
      caseNumber: "MCCGCR/E001/2024",
      citation: "Republic VS DANIEL MUTUA AND ERICK MUTWIRI AND 9 Other(s)",
      trackingNumber: "JS6X2024",
      filingDate: "18-Mar-2024 03:03:04",
      station: "Nairobi Law Courts",
      caseCategory: "Magistrates Court County Government Criminal Matters",
      caseType: "BY-LAWS - City /County inspectorate/enforcement Act",
      filedBy: "Fridah Mbae"
    },
    // ... other cases
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Input Validation
    if (!caseCode || !caseNumber || !year) {
      setError('Please fill in all fields.');
      return;
    }

    // Find the case based on user inputs
    const foundCase = casesData.find(
      (c) =>
        c.caseNumber === caseNumber && // Match caseNumber directly with caseNumber input
        c.station === selectedStation // Ensure station matches
    );

    if (foundCase) {
      setCaseDetails(foundCase);
      setError('');
    } else {
      setCaseDetails(null);
      setError('No case found matching the provided details.');
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
                  type="text" // Changed to text to allow full case number input
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
                  min="2000" // Added min value
                  max={new Date().getFullYear()} // Added max value as current year
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

       
      </div>
      <div>
         {/* Case Details Display */}
         {caseDetails && (
          <div className="mt-8 bg-white p-4 rounded-md">
            <div className='text-center space-y-4'>
                <h2 className="text-lg text-center font-bold">Case Details</h2>
            <p className='text-3xl font-semibold'><strong>Case Number:</strong> {caseDetails.caseNumber}</p>
            <p className='text-2xl font-semibold'><strong>Citation:</strong> {caseDetails.citation}</p>
            <p className='text-2xl font-semibold'><strong>Tracking Number:</strong> {caseDetails.trackingNumber}</p>
            </div>

            {/* info */}
            
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
    <thead>
      {/* <tr className='bg-amber-100'>
        <th className='border border-grey-200 text-left p-2'><strong>Detail</strong></th>
        <th className='border border-grey-200 text-left p-2'><strong>Value</strong></th>
      </tr> */}
    </thead>
    <tbody>
      <tr className='border-b border-grey-200'>
        <td className='border border-grey-200 p-2 bg-amber-100'><strong>Filing Date:</strong></td>
        <td className='border border-grey-200 p-2'>{caseDetails.filingDate}</td>
      </tr>
      <tr className='border-b border-grey-200'>
        <td className='border border-grey-200 bg-amber-100 p-2'><strong>Station:</strong></td>
        <td className='border border-grey-200 p-2'>{caseDetails.station}</td>
      </tr>
      <tr className='border-b border-grey-200'>
        <td className='border border-grey-200 bg-amber-100 p-2'><strong>Case Category:</strong></td>
        <td className='border border-grey-200 p-2'>{caseDetails.caseCategory}</td>
      </tr>
      <tr className='border-b border-grey-200'>
        <td className='border border-grey-200 bg-amber-100 p-2'><strong>Case Type:</strong></td>
        <td className='border border-grey-200 p-2'>{caseDetails.caseType}</td>
      </tr>
      <tr>
        <td className='border border-grey-200 bg-amber-100 p-2'><strong>Filed By:</strong></td>
        <td className='border border-grey-200 p-2'>{caseDetails.filedBy}</td>
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
