import React, { useState } from "react"; // Import necessary hooks and libraries
import { Link, useNavigate } from "react-router-dom"; // Import navigation components from react-router-dom
import useAuthStore from "../stores/useAuthStore"; // Import custom authentication store

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the mobile menu is open
  const { user, logoutUser } = useAuthStore(); // Access user data and logout function from the auth store
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = async () => {
    await logoutUser(); // Log out the user
    navigate("/login"); // Navigate to the login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu visibility
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Interactive Map</h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {user && (
            <Link 
              to="/home" 
              className="text-white bg-gray-800 hover:bg-gray-700 font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Home
            </Link>
          )}

          {user ? (
            <button 
              onClick={handleLogout} 
              className="text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Log In
              </Link>
              <Link 
                to="/signup"  
                className="text-white bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white bg-gray-800 hover:bg-gray-700 font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 mt-2">
          {user && (
            <Link 
              to="/home" 
              className="block text-white bg-gray-700 hover:bg-gray-600 font-semibold py-2 px-4 rounded-md transition duration-200 text-center mb-2 w-full"
              onClick={toggleMenu}
            >
              Home
            </Link>
          )}

          {user ? (
            <button 
              onClick={() => {
                handleLogout();
                toggleMenu();
              }} 
              className="block text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-md transition duration-200 w-full"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition duration-200 w-full text-center mb-2"
                onClick={toggleMenu}
              >
                Log In
              </Link>
              <Link 
                to="/signup"
                className="block text-white bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded-md transition duration-200 w-full text-center"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
