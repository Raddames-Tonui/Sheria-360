import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { server_url } from "../../../config.json";
import { AuthContext } from '../../context/AuthContext';
import { FaArrowAltCircleDown } from "react-icons/fa";
import toast from 'react-hot-toast';
import DownloadButton from './DownLoadButton';

//  document array with summaries
const document = [
  {
    parentCategory: "Affidavits",
    category: [
      { name: "Companies", summary: "Affidavit for companies serves as a sworn statement for business purposes." },
      { name: "Marriage", summary: "Affidavit used in marriage-related legal matters." },
      { name: "Motor Vehicle", summary: "Affidavit for vehicle ownership or related disputes." },
      { name: "Others", summary: "Miscellaneous affidavits for general purposes." },
      { name: "Real Estate", summary: "Affidavit for real estate transactions and disputes." },
      { name: "Travel", summary: "Affidavit for travel purposes such as legal declarations for minors." }
    ]
  },
  {
    parentCategory: "Companies",
    category: [
      { name: "Deeds and Agreements", summary: "Legal agreements between businesses and other parties." },
      { name: "Letters and Notices", summary: "Formal letters and legal notices related to business operations." }
    ]
  },
  {
    parentCategory: "Employment",
    category: [
      { name: "Employee Letters", summary: "Official letters written by employees for employment-related purposes." },
      { name: "Employer Letters", summary: "Letters from employers addressing employment matters." },
      { name: "Employment Contracts", summary: "Formal agreements outlining the terms and conditions of employment." }
    ]
  },
  {
    parentCategory: "Family",
    category: [
      { name: "Change of Name", summary: "Legal documents for name change processes within a family." },
      { name: "Deeds and Agreements", summary: "Agreements related to family matters, such as property." },
      { name: "Letters and Notices", summary: "Official family-related letters and legal notices." },
      { name: "Wills", summary: "Legal documents outlining the distribution of assets after death." }
    ]
  },
  {
    parentCategory: "Letters and Notices",
    category: [
      { name: "Agency & Brokerage", summary: "Letters related to agency or brokerage services and contracts." },
      { name: "Companies", summary: "Official company letters and notices for business correspondence." },
      { name: "Employment", summary: "Employment-related letters such as resignation or recommendation." },
      { name: "Finance & Credit", summary: "Financial and credit-related letters for various purposes." },
      { name: "Others", summary: "Miscellaneous letters and notices not categorized elsewhere." },
      { name: "Powers of Attorney", summary: "Legal notices related to granting power of attorney." },
      { name: "Real Estate", summary: "Real estate-related legal notices and letters." },
      { name: "Travel", summary: "Letters and notices related to travel arrangements and permissions." }
    ]
  },
  {
    parentCategory: "Library",
    category: [
      { name: "Articles", summary: "Informative articles on various legal topics." },
      { name: "How To", summary: "Guides explaining how to handle different legal matters." }
    ]
  },
  {
    parentCategory: "Resource Library",
    category: [
      { name: "Articles", summary: "Comprehensive legal articles for public resource." },
      { name: "How To", summary: "Step-by-step guides on handling legal procedures." }
    ]
  },
  {
    parentCategory: "Real Estate",
    category: [
      { name: "Transfers", summary: "Documents related to the transfer of real estate ownership." },
      { name: "Agreements", summary: "Legal agreements in real estate transactions." },
      { name: "Letters and Notices", summary: "Real estate-related letters such as eviction notices." }
    ]
  }
];


const SearchDocument = () => {
  const { token,  userRole } = useContext(AuthContext);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handlePreview = (doc) => {
    setSelectedDoc(doc); // Set the selected document for preview
    setIsModalOpen(true); // Open the modal
  };

  const handleDownload = async (fileId) => {

      const response = await fetch(`${server_url}/file/download/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fileUrl = response.url;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error('Document not yet uploaded. ');
      }
    } 
   

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Sidebar */}
      <div className="hidden lg:block md:w-full lg:w-1/5 p-4 bg-slate-100 border border-gray-300 lg:mr-4  lg:mb-0 mb-10">
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
        <div className='bg-slate-100 shadow-md border border-gray-300 pl-2 p-5 mb-10'>
          {document
            .filter(doc => doc.parentCategory.toLowerCase().includes(filter.toLowerCase()))
            .map((doc, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2 underline text-lime-700">{doc.parentCategory}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {doc.category.map((category, titleIndex) => (
                    <div key={titleIndex} className="text-gray-700 p-3 border border-gray-300 hover:bg-gray-200 shadow-md cursor-pointer">
                      <h5 className='text-md font-semibold text-center pb-3'>{category.name}</h5>
                      <p className='pb-3 cursor-pointer' onClick={() => handlePreview(category)}>Preview</p>
                      <button
                        className='hover:bg-lime-600 hover:text-white text-lime-600 font-semibold p-2 rounded-md flex items-center '
                        onClick={() => handleDownload(titleIndex + 1)}
                      >
                        Download <span className='pl-1'><FaArrowAltCircleDown /></span>
                      </button>
                    </div>
                  ))}
                  {/* FOR INITIATING PAYMENT. Still in testing mode
                  
                  {doc.category.map((category, titleIndex) => (
                        <div key={titleIndex} className="text-gray-700 p-3 border border-gray-300 hover:bg-gray-200 shadow-md cursor-pointer">
                            <h5 className='text-md font-semibold text-center pb-3'>{category.name}</h5>
                            <p className='pb-3 cursor-pointer' onClick={() => handlePreview(category)}>Preview</p>
                            <DownloadButton 
                                titleIndex={titleIndex + 1} 
                                handleDownload={handleDownload} // Pass the handleDownload function
                            />
                        </div>
                    ))} */}

                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Modal for preview */}
      {isModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedDoc.name}</h2>
            <p>{selectedDoc.summary}</p>
            <div className='flex  justify-center'>
            <button className="mt-4 bg-gray-500  text-white p-2 rounded" onClick={() => setIsModalOpen(false)}>Close</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDocument;
