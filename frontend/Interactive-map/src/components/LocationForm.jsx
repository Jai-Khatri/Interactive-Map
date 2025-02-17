import React, { useState } from "react";

const LocationForm = ({ onSave, onCancel }) => {
  // State to manage the name and description inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only call onSave if the name is provided
    if (name.trim()) {
      onSave(name, description); // Pass name and description to onSave callback
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Location Name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update name state on change
        className="w-full p-2 border rounded"
        required // Makes the input field mandatory
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state on change
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-2">
        {/* Save button triggers the form submission */}
        <button
          type="submit"
          className="flex-grow p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        {/* Cancel button calls onCancel callback */}
        <button
          type="button"
          onClick={onCancel}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
