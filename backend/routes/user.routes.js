import express from "express"; // Import Express for handling routes
import { 
    createUser, 
    verifyUser, 
    logout, 
    getMe 
} from "../controllers/user.controller.js"; // Import user-related controllers

import authenticateToken from "../middlewares/authenticateToken.middleware.js"; // Import authentication middleware

const router = express.Router(); // Create an Express router instance

// Route to register a new user
router.post("/register", createUser);

// Route to log in an existing user
router.post("/login", verifyUser);

// Route to log out the user by clearing authentication cookies
router.post("/logout", logout);

// Route to get the authenticated user's details (Requires authentication)
router.get("/me", authenticateToken, getMe); 

export default router; // Export the router for use in the main application
