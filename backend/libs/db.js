import mongoose from "mongoose"; // Import Mongoose for database connection
import dotenv from "dotenv"; // Load environment variables

dotenv.config(); // Load environment variables from .env file

const MONGODB_URL = process.env.MONGODB_URL; // Retrieve MongoDB connection URL from environment variables

// Function to connect to MongoDB
const ConnectToDB = async () => {
    try {
        // Attempt to establish a connection to MongoDB
        await mongoose.connect(MONGODB_URL);
        
        // Log successful connection with the database host information
        console.log("MONGODB connected on cluster:", mongoose.connection.host);
    } catch (error) {
        // Log any connection errors
        console.log("Error connecting to MongoDB:", error.message);
    }
};

export default ConnectToDB; // Export the database connection function
