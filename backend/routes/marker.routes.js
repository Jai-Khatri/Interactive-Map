import express from "express"; // Import Express for handling routes
import { 
    createMarker, 
    getAllMarkers,
    deleteMarker 
} from "../controllers/marker.controller.js"; // Import marker-related controllers

import authenticateToken from "../middlewares/authenticateToken.middleware.js"; // Import authentication middleware

const router = express.Router(); // Create an Express router instance

// Route to create a new marker (Requires authentication)
router.post("/createMarker", authenticateToken, createMarker);

// Route to get all markers (Public access)
router.get("/getAllMarkers", getAllMarkers);

// Route to delete a specific marker by its ID (Requires authentication)
router.delete("/:id", authenticateToken, deleteMarker); 

export default router; // Export the router for use in the main application
