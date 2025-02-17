import React, { useEffect, useState } from "react"; // Import necessary React hooks
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"; // Import React Router for routing
import Signup from "./Pages/Signup"; // Import Signup page
import Login from "./Pages/Login"; // Import Login page
import Navbar from "./components/Navbar"; // Import Navbar component
import HomePage from "./Pages/HomePage"; // Import HomePage component
import useAuthStore from "./stores/useAuthStore"; // Import custom auth store for managing user state

function App() {
  const { user, fetchUser } = useAuthStore(); // Access user data and fetchUser action from the auth store
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get current route location
  const [loading, setLoading] = useState(true); // State to manage loading state during authentication check

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuth = async () => {
      setLoading(true); // Set loading state to true while checking auth
      const loggedInUser = await fetchUser(); // Fetch user from the auth store

      // If the user is not logged in and not on the signup page, redirect to login
      if (!loggedInUser && location.pathname !== "/signup") {
        navigate("/login");
      }
      setLoading(false); // Set loading state to false after the authentication check
    };
    
    checkAuth(); // Call the checkAuth function
  }, []); // Run only on component mount

  // If still loading, display a loading message
  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div>
      <Navbar /> {/* Render Navbar component */}
      <Routes>
        {/* Define routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
