import React, { useState } from "react"; // Import React and useState hook
import useAuthStore from "../stores/useAuthStore"; // Import custom auth store for login action
import { toast } from "react-toastify"; // Import toast notifications
import { useNavigate } from "react-router-dom"; // Import navigate for programmatic routing

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); // State for form data (email, password)
  const loginUser = useAuthStore((state) => state.loginUser); // Access login action from the auth store
  const navigate = useNavigate(); // Initialize navigate hook for redirecting

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await loginUser(formData.email, formData.password); // Attempt to login
    if (success) navigate("/home"); // Redirect to home on successful login
    else toast.error(message); // Show error message if login fails
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] sm:w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-4">Log In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full h-12 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email in form data
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-12 p-3 mt-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Update password in form data
          required
        />

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
