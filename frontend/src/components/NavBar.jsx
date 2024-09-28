import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust import path as necessary
import toast from 'react-hot-toast'; // Import toast for notifications

const Navbar = () => {
  const { token, logout } = useContext(AuthContext); // Get token and logout from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleSignOut = async () => {
    try {
      await logout(); // Call logout from AuthContext
      toast.success('Signed out successfully!'); // Show success notification
      navigate('/'); // Redirect to home or login page
    } catch (err) {
      toast.error(`Sign out failed: ${err.message}`); // Show error notification
    }
  };

  // Debugging: Check current user token status
  console.log("User Token:", token);

  return (
    <nav className="bg-white text-lime-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div>
            <img src="/logo/Sheria360.png" alt="" className="object-cover h-16 w-40" />
          </div>
          <div className="hidden bg-gray-300 rounded-lg md:flex mt-4 space-x-4 items-center">
            <Link to="/" className="hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium">Home</Link>
            <Link to="/lawyers" className="hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium">Lawyers</Link>
            <Link to="/courts" className="hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium">Courts</Link>
            <Link to="/track-cases" className="hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium">Track Cases</Link>
            <Link to="/lawyer-registration" className="hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium">Help</Link>
          </div>
          <div className="mt-4">
            {token ? (
              <button onClick={handleSignOut} className="border-red-500 border-2 text-red-500 p-2 rounded-md text-md">
                Sign Out
              </button>
            ) : (
              <div className="space-x-6">
                <Link to="/login" className="hover:bg-lime-600 border-2 border-lime-700 hover:text-white px-3 py-2 rounded-md text-md font-medium">Login</Link>
                <Link to="/signup" className="bg-lime-700 text-white border-2 border-lime-700 px-3 py-2 rounded-md text-md font-medium">Sign up</Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-lime-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu (conditional rendering based on isMobileMenuOpen state) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/lawyers" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Lawyers</Link>
            <Link to="/courts" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Courts</Link>
            <Link to="/track-cases" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Track Cases</Link>
            <Link to="/lawyer-registration" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Help</Link>

            {token ? (
              <button onClick={handleSignOut} className="bg-red-500 p-2 rounded-md w-full">
                Sign Out
              </button>
            ) : (
              <div>
                <Link to="/login" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
