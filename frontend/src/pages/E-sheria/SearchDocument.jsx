import React, { useContext, useState } from 'react';
import { server_url } from "../../../config.json";
import { AuthContext } from '../../context/AuthContext';

const document = [
  {
    parentCategory: "Affidavits",
    category: [
      "Companies",
      "Marriage",
      "Motor Vehicle",
      "Others",
      "Real Estate",
      "Travel"
    ]
  },
  {
    parentCategory: "Companies",
    category: [
      "Deeds and Agreements",
      "Letters and Notices"
    ]
  },
  {
    parentCategory: "Employment",
    category: [
      "Employee Letters",
      "Employer Letters",
      "Employment Contracts"
    ]
  },
  {
    parentCategory: "Family",
    category: [
      "Change of Name",
      "Deeds and Agreement",
      "Letters and Notices",
      "Wills"
    ]
  },
  {
    parentCategory: "Letters and Notices",
    category: [
      "Agency & Brokerage",
      "Companies",
      "Employment",
      "Finance & Credit",
      "Others",
      "Powers of Attorney",
      "Real Estate",
      "Travel"
    ]
  },
  {
    parentCategory: "Library",
    category: [
      "Articles",
      "How To"
    ]
  },
  {
    parentCategory: "Resource Library",
    category: [
      "Articles",
      "How To"
    ]
  },
  {
    parentCategory: "Real Estate",
    category: [
      "Transfers",
      "Agreements",
      "Letters and Notices"
    ]
  }
];

const SearchDocument = () => {
  const { token,  loading } = useContext(AuthContext); // Correctly destructure context
  const [filter, setFilter] = useState('');

  if (loading) return <div>Loading...</div>; // Handle loading state

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredDocuments = document.filter((doc) => 
    doc.parentCategory.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDownload = async (fileId) => {
    try {
      const response = await fetch(`${server_url}/file/download/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from context
        },
      });

      if (response.ok) {
        const fileUrl = response.url; // The redirected URL will be the file URL
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = ''; // Optional: specify a filename if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const errorData = await response.json();
        console.error('Error downloading file:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:block md:w-full lg:w-1/5 p-4 bg-gray-100 border border-gray-300 lg:mr-4 mb-4 lg:mb-0">
        <h2 className="text-lg font-bold mb-4">Existing Documents</h2>
        <ul>
          {document.map((cat, index) => (
            <li className='pl-4 font-semibold pb-4' key={index}>{cat.parentCategory}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4">
        {/* Search */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search Document"
            className="border p-2 w-full"
            value={filter}
            onChange={handleFilter}
          />
        </div>

        {/* Document Grid */}
        <div className='bg-gray-100 shadow-md border border-gray-300 pl-2 p-5'>
          {filteredDocuments.map((doc, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{doc.parentCategory}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {doc.category.map((category, titleIndex) => (
                  <div key={titleIndex} className="text-gray-700 p-3 border border-gray-300 hover:bg-gray-200 shadow-md cursor-pointer">
                    <h5 className='text-md font-semibold text-center pb-3'>{category}</h5>
                    <p className='pb-3'>Preview</p>
                    <button
                      className='bg-lime-400 px-2 rounded-md text-white hover:bg-lime-600'
                      onClick={() => handleDownload(titleIndex + 1)}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDocument;
