import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-300 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold">Legal Tracker</h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {/* Links for larger screens */}
            <Link to="/" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/lawyers" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Lawyers
            </Link>
            <Link to="/courts" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Courts
            </Link>
            <Link to="/track-cases" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Track Cases
            </Link>
            <Link to="/help" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Help
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/lawyers" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">
            Lawyers
          </Link>
          <Link to="/courts" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">
            Courts
          </Link>
          <Link to="/track-cases" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">
            Track Cases
          </Link>
          <Link to="/help" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">
            Help
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
