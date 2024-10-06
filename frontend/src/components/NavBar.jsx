import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { server_url } from "../../config.json";

const Navbar = () => {
  const { token, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully!");
      navigate("/");
    } catch (err) {
      toast.error(`Sign out failed: ${err.message}`);
    }
  };

  const roleLinks = {
    lawyer: [
      { to: "/sheria/upload-doc", label: "Upload" },
      { to: "/lawyer/dashboard", label: "Lawyer Dashboard" },
    ],
    user: [{ to: "/lawyers", label: "Lawyers" }],
    court: [{ to: "/create/case", label: "Upload Case" }],
  };

  const renderRoleLinks = () =>
    roleLinks[userRole]?.map((link, index) => (
      <NavLink
        key={index}
        to={link.to}
        className={({ isActive }) =>
          `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`
        }
      >
        {link.label}
      </NavLink>
    ));

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const response = await fetch(`${server_url}/api/user/details`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error(error.message);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  return (
    <nav className="h-[10vh] border-b py-4 bg-gray-100 text-lime-600 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo/Sheria360.png"
            alt="Logo"
            className="object-cover pb-4 h-16 w-40"
          />
        </div>

        <div className="hidden md:flex space-x-4 rounded-md">
          
          <NavLink 
            to="/" 
            className={({ isActive }) => 
            `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline' : ''} ${isActive ? 'font-bold' : ''}`
          }
                    >
            Home
          </NavLink>
          {userRole === "user"? 
          <>
          <NavLink 
            to="/lawyers" 
            className={({ isActive }) => `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`}
          >
            Lawyers
          </NavLink>
          </>:
          null}
          {token? (
            <>
            <NavLink 
            to="/sheria/search-docs" 
            className={({ isActive }) => `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`}
          >
            Sheria Docs
          </NavLink>
          <NavLink 
            to="/sheria/chat" 
            className={({ isActive }) => `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`}
          >
            Sheria Ai
          </NavLink>
          <NavLink 
            to="/track/cases" 
            className={({ isActive }) => `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`}
          >
            Track Case
          </NavLink>
            </>
          ):
          <>
            <NavLink 
            to= "/about"
            className={({ isActive }) => `hover:bg-lime-600 hover:text-white px-6 py-2 rounded-md text-md font-medium ${isActive ? 'underline font-bold' : ''}`}
>
              About Us
            </NavLink>
          </>}
          
        </div>
          
        <div className="flex items-center space-x-6 rounded-full">
          {/* TYPE OF USERS */}
        {userRole === "lawyer" ? (
  <div>Lawyer dashboard</div>
) : userRole === "user" ? (
  <div>Citizen dashboard</div>
) : userRole === "court" ? (
  <div>Court Dashboard</div>
) : null} 


        
          {token ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex"
                aria-expanded={isDropdownOpen}
              >
                <img
                  src={userDetails?.profile_picture || "/svgs/avatar.svg"}
                  alt="User Avatar"
                  className="h-12 w-12 border-2 border-gray-200 bg-gray-200 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/svgs/avatar.svg";
                  }}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {userRole === 'lawyer' && (
                    <NavLink 
                      to="/lawyer-registration" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Update Profile
                    </NavLink>
                  )}
                  <button
                    onClick={() => { handleSignOut(); setIsDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <NavLink 
                to="/login" 
                className="hover:bg-lime-600 border-2 border-lime-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className="bg-lime-700 text-white border-2 border-lime-700 px-3 py-2 rounded-md text-md font-medium"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-lime-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/lawyers" 
              className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
            >
              Lawyers
            </NavLink>
            <NavLink 
              to="/courts" 
              className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
            >
              Courts
            </NavLink>
            <NavLink 
              to="/track-cases" 
              className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
            >
              Track Cases
            </NavLink>
            <NavLink 
              to="/lawyer-registration" 
              className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
            >
              Help
            </NavLink>
            {token ? (
              <>
                <button onClick={handleSignOut} className="bg-red-500 p-2 rounded-md w-full">Sign Out</button>
                {renderRoleLinks()}
              </>
            ) : (
              <div>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => `hover:bg-blue-400 block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'underline font-bold' : ''}`}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
