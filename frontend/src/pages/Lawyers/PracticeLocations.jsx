import React from 'react';

const PracticeLocations = () => {
  return (
    <div className="container mx-auto p-8">
      {/* FAQ and Get Listed Buttons */}
      <div className="flex justify-center mb-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md mx-2">
          FAQ
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md mx-2">
          Lawyers Get Listed
        </button>
      </div>

      {/* Counties Section */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">Find Lawyers by</h2>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">KENYAN COUNTIES</h1>

      {/* Counties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ul className="space-y-2 text-gray-700">
          <li>Nairobi</li>
          <li>Mombasa</li>
          <li>Kisumu</li>
          <li>Nakuru</li>
          <li>Eldoret</li>
          <li>Nyeri</li>
          <li>Meru</li>
        </ul>
        <ul className="space-y-2 text-gray-700">
          <li>Machakos</li>
          <li>Uasin Gishu</li>
          <li>Kakamega</li>
          <li>Kitui</li>
          <li>Bomet</li>
          <li>Trans Nzoia</li>
          <li>Kirinyaga</li>
        </ul>
        <ul className="space-y-2 text-gray-700">
          <li>Embu</li>
          <li>Homa Bay</li>
          <li>Busia</li>
          <li>Siaya</li>
          <li>Taita Taveta</li>
          <li>Narok</li>
          <li>Laikipia</li>
        </ul>
      </div>
    </div>
  );
};

export default PracticeLocations;
