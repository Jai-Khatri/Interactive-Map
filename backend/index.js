import express from "express"; // Import Express for routing and middleware handling
import dotenv from "dotenv"; // Load environment variables
import userRoutes from "./routes/user.routes.js"; // Import user-related routes
import markerRoutes from "./routes/marker.routes.js"; // Import marker-related routes
import ConnectToDB from "./libs/db.js"; // Import the database connection function
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing (CORS)
import path from "path";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 5000; // Get the port from environment variables or default to 5000
const __dirname = path.resolve();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"; // Get the client URL for CORS from environment variables

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from requests
app.use(cors({
  origin: CLIENT_URL, // Allow requests from the specified client URL
  credentials: true, // Allow cookies to be sent with cross-origin requests
}));

// Route setup
app.use("/api/users", userRoutes); // Route to handle user-related requests
app.use("/api/markers", markerRoutes); // Route to handle marker-related requests

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/Interactive-map/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend/Interactive-map" , "dist" , "index.html"))
  })
}

// Start the server and connect to the database
app.listen(PORT, () => {
  ConnectToDB(); // Connect to the database when the server starts
  console.log(`Server listening on PORT: ${PORT}`); // Log the server's port
});
