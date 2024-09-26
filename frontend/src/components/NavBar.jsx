import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../authentication/firebase'; // Import auth from your firebase configuration
import { signOut } from 'firebase/auth'; // Import signOut function
import toast from 'react-hot-toast'; // Import toast for notifications
import { AuthContext } from '../context/AuthContext'; // Adjust import path as necessary

const Navbar = () => {
  const { userLoggedIn, logout } = useContext(AuthContext); // Get userLoggedIn and logout from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await logout(); // Call logout from AuthContext
      toast.success('Signed out successfully!'); // Show success notification
      navigate('/'); // Redirect to home or login page
    } catch (err) {
      toast.error(`Sign out failed: ${err.message}`); // Show error notification
    }
  };

  return (
    <nav className="bg-blue-300 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold">Legal Tracker</h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/lawyers" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">Lawyers</Link>
            <Link to="/courts" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">Courts</Link>
            <Link to="/track-cases" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">Track Cases</Link>
            <Link to="/help" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">Help</Link>

            {userLoggedIn ? (
              <button onClick={handleSignOut} className='bg-red-500 p-2 rounded-md'>
                Sign Out
              </button>
            ) : (
              <div>
                <Link to="/login" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                  Sign up
                </Link>
              </div>
            )}
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
          <Link to="/" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/lawyers" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Lawyers</Link>
          <Link to="/courts" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Courts</Link>
          <Link to="/track-cases" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Track Cases</Link>
          <Link to="/help" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Help</Link>

          {userLoggedIn ? (
            <button onClick={handleSignOut} className='bg-red-500 p-2 rounded-md'>
              Sign Out
            </button>
          ) : (
            <div>
              <Link to="/login" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
              <Link to="/sign-in" className="hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
