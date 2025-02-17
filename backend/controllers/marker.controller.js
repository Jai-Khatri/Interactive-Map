import Marker from "../models/markers.model.js"; // Import the Marker model from the database

// Controller to create a new marker
export const createMarker = async (req, res) => {
  const { name, latitude, longitude, description } = req.body; // Extract marker details from request body

  try {
    // Check if the user is not authenticated
    if (!req.user) {
      console.log("Unauthorized Request: No user attached");
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated." });
    }

    // Ensure required fields are provided
    if (!name || !latitude || !longitude) {
      console.log("Missing Required Fields");
      return res.status(400).json({ success: false, message: "Missing required fields: name, latitude, or longitude." });
    }

    // Create a new marker instance
    const newMarker = new Marker({
      name,
      latitude,
      longitude,
      description,
      createdById: req.user.id, // Associate marker with the user who created it
      createdByName: req.user.name,
    });

    // Save the new marker to the database
    await newMarker.save();

    return res.status(201).json({ success: true, marker: newMarker, message: "Marker created successfully!" });
  } catch (error) {
    console.error("Error in createMarker:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Controller to get all markers from the database
export const getAllMarkers = async (req, res) => {
  try {
    const allMarkers = await Marker.find(); // Fetch all markers

    if (allMarkers) {
      return res.status(200).json({ markers: allMarkers });
    }
  } catch (error) {
    console.log("Error in getAllMarkers controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
};

// Controller to delete a marker
export const deleteMarker = async (req, res) => {
  const { id } = req.params; // Extract marker ID from request parameters

  try {
    const marker = await Marker.findById(id); // Find the marker by its ID

    // Check if the marker exists
    if (!marker) {
      return res.status(404).json({ success: false, message: "Marker not found!" });
    }

    // Ensure only the creator can delete the marker
    if (marker.createdById.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized: You can't delete this marker!" });
    }

    // Delete the marker
    await Marker.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Marker deleted successfully!" });
  } catch (error) {
    console.error("Error deleting marker:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
