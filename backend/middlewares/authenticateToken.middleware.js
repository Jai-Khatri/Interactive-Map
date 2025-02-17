import jwt from "jsonwebtoken"; // Import JWT for token verification
import dotenv from "dotenv"; // Load environment variables
import User from "../models/users.model.js"; // Import User model

dotenv.config(); // Load environment variables from .env file

// Middleware to authenticate users based on JWT token
const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies
    const JWT_SECRET = process.env.JWT_SECRET; // Get JWT secret key from environment variables

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        try {
            // Retrieve user from the database using the decoded token's user ID
            const user = await User.findById(decoded.id).select("name");
            
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Attach user details to request object for further use in routes
            req.user = { id: decoded.id, name: user.name };
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    });
};

export default authenticateToken; // Export the authentication middleware
