import User from "../models/users.model.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Library for hashing passwords
import jwt from "jsonwebtoken"; // Library for generating JWT tokens
import dotenv from "dotenv"; // Load environment variables

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Secret key for JWT authentication

// Controller to create a new user account
export const createUser = async (req, res) => {
    const { name, email, password } = req.body; // Extract user details from request body

    try {
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(401).json({ message: "Please provide all credentials to proceed" });
        }

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Generate a salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user instance
        const newUser = { name: name, email: email, password: hashedPassword };
        const savedUser = await User.create(newUser);
        await savedUser.save();

        // Generate a JWT token for authentication
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // Token expires in 1 hour
        });

        return res.status(201).json({ message: "User Created!", user: savedUser });
    } catch (error) {
        console.log("Error in createUser controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Controller to verify user credentials and log them in
export const verifyUser = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all the essential credentials!" });
        }

        // Find the user by email
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            // Compare provided password with stored hashed password
            const passwordCorrect = await bcryptjs.compare(password, userExists.password);

            if (passwordCorrect) {
                // Generate a new JWT token
                const token = jwt.sign({ id: userExists._id }, JWT_SECRET, { expiresIn: '1h' });

                // Store the token in an HTTP-only cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000 // Token expires in 1 hour
                });

                // Exclude password from the response
                const { password, ...userData } = userExists.toObject();
                return res.status(200).json({ message: "User verified!", user: userData });
            } else {
                return res.status(401).json({ message: "Password is incorrect!" });
            }
        } else {
            return res.status(404).json({ message: "User doesn't exist!" });
        }
    } catch (error) {
        console.log("Error in verifyUser controller:", error.message);
        return res.status(500).json({ message: "Internal server Error!", error: error.message });
    }
};

// Controller to log the user out by clearing the authentication cookie
export const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return res.status(200).json({ message: "Successfully logged out!" });
};

// Controller to fetch the authenticated user's details
export const getMe = async (req, res) => {
    try {
        // Find the user by ID and exclude the password from the response
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
