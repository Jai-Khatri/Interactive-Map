import { Navigate } from "react-router-dom"; // Import Navigate for redirecting user
import useAuthStore from "../stores/useAuthStore"; // Import authentication store

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore(); // Get the user from the authentication store

  // If the user is not authenticated, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children (protected content)
  return children;
};

export default ProtectedRoute;
