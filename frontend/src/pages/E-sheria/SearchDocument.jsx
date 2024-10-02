import React, { useState } from 'react';

const documents = [
  {
    category: "Agency",
    title: "Agent's Mandate Letter to Sell",
    price: "250.00 KSh"
  },
  {
    category: "Commercial",
    title: "Arbitration Agreement",
    price: "5000.00 KSh"
  },
  {
    category: "Commercial",
    title: "Borehole Water Supply Agreement",
    price: "2000.00 KSh"
  },
  {
    category: "Agency",
    title: "Brokerage Agreement to find Goods or Services",
    price: "5000.00 KSh"
  },
  {
    category: "Commercial",
    title: "Car Hire Agreement",
    price: "5000.00 KSh"
  },
  {
    category: "Commercial",
    title: "Car Sale Agreement",
    price: "1000.00 KSh"
  },
  {
    category: "Agency",
    title: "Commission Agreement to Sell",
    price: "750.00 KSh"
  },
  {
    category: "Commercial",
    title: "Confidentiality, Non-Disclosure Agreement & Non-Circumvention Agreement",
    price: "4500.00 KSh"
  }
];

const SearchDocument = () => {
  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Search By Category</h2>
        <ul className="mb-4">
          <li className="mb-2">
            <input type="radio" name="category" id="employment" />
            <label className="ml-2" htmlFor="employment">Employment</label>
          </li>
          <li className="mb-2">
            <input type="radio" name="category" id="family" />
            <label className="ml-2" htmlFor="family">Family</label>
          </li>
          <li className="mb-2">
            <input type="radio" name="category" id="commercial" />
            <label className="ml-2" htmlFor="commercial">Commercial</label>
          </li>
        </ul>
        <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg">Clear</button>
        <button className="bg-orange-600 text-white py-2 px-4 rounded-lg ml-2">Filter</button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
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
        <div className="grid grid-cols-3 gap-4">
          {filteredDocuments.map((doc, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <h4 className="text-sm text-gray-500">{doc.category}</h4>
              <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
              <p className="text-orange-500 font-bold mb-4">{doc.price}</p>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDocument;
