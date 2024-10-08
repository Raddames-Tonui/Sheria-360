import React from 'react';

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      {/* 404 Message */}
      <h1 className="text-8xl font-bold text-lime-600 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page not found</h2>
      <p className="text-lg mt-2 text-gray-500">Looks like you've wandered off...</p>

      {/* Fun Animation */}
      <div className="mt-8 w-48 h-48 relative flex justify-center items-center">
        <div className="absolute w-32 h-32 bg-lime-600 rounded-full animate-ping"></div>
        <div className="absolute w-20 h-20 bg-lime-500 rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 bg-lime-400 rounded-full"></div>
      </div>

      {/* Go Back Button */}
      <button
        className="mt-8 px-6 py-2 text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-lime-300 font-semibold rounded-full transition duration-300 ease-in-out"
        onClick={() => window.location.href = '/'}>
        Take Me Home
      </button>
    </div>
  );
};

export default NoPage;
