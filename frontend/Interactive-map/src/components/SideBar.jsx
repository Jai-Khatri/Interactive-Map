import React, { useState } from "react"; // Import React and useState hook

const SideBar = ({ locations, searchQuery, onSearchChange, onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(true)} // Open sidebar on button click
        className="md:hidden fixed top-4 left-4 z-0 bg-gray-800 text-white p-3 rounded-md shadow-lg"
      >
        Locations
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-72 p-4 sm:p-6 shadow-lg transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-72 md:h-screen`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(false)} // Close sidebar on button click
          className="md:hidden absolute top-4 right-4 bg-red-600 text-white p-2 rounded-md"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4"> Saved Locations</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search locations..."
          value={searchQuery} // Controlled input for search
          onChange={onSearchChange} // Handle search input change
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location List */}
        <ul className="mt-4 space-y-4 overflow-y-auto max-h-[70vh] md:max-h-full">
          {locations.length === 0 ? (
            <p className="text-gray-400 text-center">No locations saved yet.</p>
          ) : (
            locations.map((location) => (
              <li key={location._id} className="bg-gray-800 p-3 rounded-lg shadow">
                <div
                  onClick={() => onLocationSelect([location.latitude, location.longitude])} // Handle location selection
                  className="cursor-pointer"
                >
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-sm text-gray-400">{location.description}</p>
                  <p className="text-xs text-gray-500">Added by: {location.createdByName}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
