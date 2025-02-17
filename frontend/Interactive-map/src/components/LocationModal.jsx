import React, { useState } from "react";

const LocationModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState(""); // State for marker name
  const [description, setDescription] = useState(""); // State for marker description

  // If the modal is not open, return null (do not render)
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only save if both name and description are provided
    if (!name.trim() || !description.trim()) return;
    onSave(name, description); // Call the onSave callback
    setName(""); // Clear the name field after saving
    setDescription(""); // Clear the description field after saving
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4" style={{ zIndex: 10000 }}>
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-[90%] sm:w-96 relative" style={{ zIndex: 10001 }}>
        <h2 className="text-xl font-bold mb-4 text-white text-center">Add New Marker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Marker Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            {/* Save button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
