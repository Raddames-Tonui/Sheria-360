import React, { useState, useEffect } from 'react';
import CaseDetailsDisplay from './track-case/CaseDetailsDisplay';
import { server_url } from '../../config.json';

const TrackCases = () => {
  const [formState, setFormState] = useState({
    station: "",
    court: "",
    caseCode: "",
    caseNumber: "",
    year: "",
  });

  const [judiciaryData, setJudiciaryData] = useState({
    stations: [],
    availableCourts: [],
    caseCodes: [],
  });

  const [error, setError] = useState("");
  const [caseDetails, setCaseDetails] = useState(null);

  const stations = {
    "Milimani Law Courts": {
      "Milimani Environment and Land Court": [
        { code: "C100", label: "Environment and Land Court" },
        { code: "C101", label: "ELC Land" },
        { code: "C102", label: "ELC Environment & Planning" },
      ],
      "Milimani High Court": [
        { code: "C103", label: "High Court Judicial Review" },
        {
          code: "C104",
          label: "High Court Anti Corruption and Economic Crimes",
        },
        { code: "C105", label: "High Court Family" },
        { code: "C106", label: "High Court Commercial and Tax" },
        { code: "C107", label: "High Court Constitution and Human Rights" },
        { code: "C108", label: "High Court Civil" },
        { code: "C109", label: "Court Annexed Mediation" },
        { code: "C110", label: "High Court Criminal" },
      ],
      "Milimani Magistrate Court": [
        { code: "C111", label: "Magistrate Court Anti Corruption" },
        { code: "C112", label: "Magistrate Court Criminal" },
        { code: "C113", label: "Magistrate Court Traffic Case" },
        { code: "C114", label: "Magistrate Court Children" },
      ],
    },
    "Nairobi City Law Courts": {
      "Nairobi City Magistrates Court": [
        { code: "C115", label: "Magistrate Court Traffic Case" },
        { code: "C116", label: "Magistrate Court Petty Criminal" },
        { code: "C117", label: "Magistrate Court Traffic Case" },
        { code: "C118", label: "Magistrates Gender Justice Criminal Case" },
        { code: "C119", label: "Inquest" },
        { code: "C120", label: "Magistrate Court Criminal Miscellaneous" },
      ],
    },
    "Naivasha ELC Environment and Land Court": {
      "Naivasha High Court": [{ code: "C121", label: "High Court Div" }],
      "Naivasha Magistrate Court": [
        { code: "C122", label: "Magistrate Court Traffic" },
        { code: "C123", label: "Magistrate Court Civil" },
        { code: "C124", label: "Magistrate Court Criminal" },
      ],
      "Naivasha Small Claims Court": [
        { code: "C125", label: "Small Claims Court" },
      ],
    },
  };

  useEffect(() => {
    const transformedStations = Object.keys(stations).map((station) => ({
      name: station,
      courts: Object.keys(stations[station]),
    }));
    setJudiciaryData({
      stations: transformedStations,
      availableCourts: [],
      caseCodes: [],
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "station") {
      setFormState((prevState) => ({
        ...prevState,
        court: "",
        caseCode: "",
      }));

      const selectedStationCourts = stations[value]
        ? Object.keys(stations[value])
        : [];
      setJudiciaryData((prevData) => ({
        ...prevData,
        availableCourts: selectedStationCourts,
        caseCodes:
          selectedStationCourts.length > 0
            ? stations[value][selectedStationCourts[0]]
            : [],
      }));
    }

    if (name === "court") {
      const selectedStation = formState.station;
      const selectedCourtCodes = selectedStation
        ? stations[selectedStation][value] || []
        : [];
      setJudiciaryData((prevData) => ({
        ...prevData,
        caseCodes: selectedCourtCodes,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { station, court, caseCode, caseNumber, year } = formState;

    if (!station || !court || !caseCode || !caseNumber || !year) {
      setError("Please fill in all fields.");
      return;
    }

    const serverUrl = `${server_url}`;
    try {
      const response = await fetch(
        `${serverUrl}/case/search-case?station=${encodeURIComponent(
          station
        )}&court=${encodeURIComponent(court)}&caseCode=${encodeURIComponent(
          caseCode
        )}&caseNumber=${encodeURIComponent(caseNumber)}&year=${year}`
      );

      if (response.ok) {
        const data = await response.json();
        setCaseDetails(data);
        setError("");
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Failed to fetch case details. Please try again."
        );
        setCaseDetails(null);
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      setCaseDetails(null);
    }
  };

  return (
    <div className="md:px-20 md:py-8  h-[90vh]">
      <div className="bg-lime-700 rounded-sm p-8">
        <h1 className="text-white text-lg font-bold mb-6">
          Enter your case details to track
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex gap-8 px-4">
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="station"
                  className="block text-white font-medium mb-2"
                >
                  Select Station
                </label>
                <select
                  id="station"
                  name="station"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={formState.station}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Station</option>
                  {judiciaryData.stations.map((station, index) => (
                    <option key={index} value={station.name}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 w-1/2">
                <label
                  htmlFor="court"
                  className="block text-white font-medium mb-2"
                >
                  Choose the court in which your case is filed
                </label>
                <select
                  id="court"
                  name="court"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={formState.court}
                  onChange={handleChange}
                  required
                  disabled={!judiciaryData.availableCourts?.length}
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
              <div className="mb-4">
                <label
                  htmlFor="caseCode"
                  className="block text-white font-medium mb-2"
                >
                  Case Code
                </label>
                <select
                  id="caseCode"
                  name="caseCode"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={formState.caseCode}
                  onChange={handleChange}
                  required
                  disabled={!judiciaryData.caseCodes?.length}
                >
                  <option value="">Select Case Code</option>
                  {judiciaryData.caseCodes.map((code) => (
                    <option key={code.code} value={code.code}>
                      {code.code}. {code.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="caseNumber"
                  className="block text-white font-medium mb-2"
                >
                  Case Number
                </label>
                <input
                  type="text"
                  id="caseNumber"
                  name="caseNumber"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={formState.caseNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="year"
                  className="block text-white font-medium mb-2"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  className="p-2 w-full rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  value={formState.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a year</option>
                  {Array.from(
                    { length: new Date().getFullYear() - 2015 + 1 },
                    (_, i) => {
                      const year = 2015 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-white text-lime-700 font-semibold px-4 py-2 rounded hover:bg-gray-100"
            >
              Search Case
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-2 font-semibold text-xl">
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {caseDetails && <CaseDetailsDisplay caseDetails={caseDetails} />}
    </div>
  );
};

export default TrackCases;