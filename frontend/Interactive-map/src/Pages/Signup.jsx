import React, { useState } from "react"; // Import React and useState hook
import useAuthStore from "../stores/useAuthStore"; // Import custom auth store for register action
import { useNavigate } from "react-router-dom"; // Import navigate for programmatic routing
import { toast } from "react-toastify"; // Import toast notifications

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" }); // Manage form data for name, email, and password
  const registerUser = useAuthStore((state) => state.registerUser); // Access registerUser action from the auth store
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await registerUser(formData.name, formData.email, formData.password); // Attempt to register
    if (success) navigate("/home"); // Redirect to home on successful registration
    else toast.error(message); // Show error message if registration fails
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] sm:w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-4">Sign Up</h2>

        {/* Name input field */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full h-12 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        {/* Email input field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full h-12 p-3 mt-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        {/* Password input field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-12 p-3 mt-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {/* Sign Up button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
