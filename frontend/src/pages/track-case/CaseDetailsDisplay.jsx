import React from 'react';

const CaseDetailsDisplay = ({ caseDetails }) => {
  if (!caseDetails) return null; // Return null if no case details are provided

  return (
    <div className="mt-8 bg-white p-4 rounded-md">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold underline">Case Details</h2>
        <p className="text-3xl font-semibold">
          <strong>Case Number:</strong> {caseDetails.case_number}
        </p>
        <p className="text-2xl font-semibold capitalize">
          <strong>Citation:</strong> {caseDetails.parties}
        </p>
        <p className="text-2xl font-semibold">
          <strong>Tracking Number:</strong> {caseDetails.case_code}
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-gray-100 p-10 mt-3">
        <div className="border-t-2 mt-4 border-collapse border-lime-500">
          <div className="w-3/4 mx-auto">
            <ul className="grid grid-cols-5 my-2 bg-lime-300 font-bold text-lg">
              <li className="p-2 border">Case Summary</li>
              <li className="p-2 border">Parties</li>
              <li className="p-2 border">Case Activities</li>
              <li className="p-2 border">Invoice</li>
              <li className="p-2 border">Receipts</li>
            </ul>
          </div>

          {/* Wrapper for horizontal scrolling on small screens */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse border-lime-500">
              <thead>
                <tr className="bg-lime-200">
                  <th className="border border-grey-200 text-left p-2">
                    <strong>Detail</strong>
                  </th>
                  <th className="border border-grey-200 text-left p-2">
                    <strong>Value</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-grey-200">
                  <td className="border border-grey-200 p-2">
                    <strong>Filing Date:</strong>
                  </td>
                  <td className="border border-grey-200 p-2">{caseDetails.created_at}</td>
                </tr>
                <tr className="border-b border-grey-200">
                  <td className="border border-grey-200 p-2">
                    <strong>Station:</strong>
                  </td>
                  <td className="border border-grey-200 p-2">{caseDetails.station}</td>
                </tr>
                <tr className="border-b border-grey-200">
                  <td className="border border-grey-200 p-2">
                    <strong>Case Category:</strong>
                  </td>
                  <td className="border border-grey-200 p-2">{caseDetails.division}</td>
                </tr>
                <tr className="border-b border-grey-200">
                  <td className="border border-grey-200 p-2">
                    <strong>Case Type:</strong>
                  </td>
                  <td className="border border-grey-200 p-2">{caseDetails.description}</td>
                </tr>
                <tr>
                  <td className="border border-grey-200 p-2">
                    <strong>Filed By:</strong>
                  </td>
                  <td className="border border-grey-200 p-2">{caseDetails.filed_by}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsDisplay;
