import { create } from "zustand"; // Import Zustand for state management
import { axiosInstance } from "../libs/axios.js"; // Import the Axios instance for making API calls
import { toast } from "react-toastify"; // Import toast notifications for error/success messages

const useAuthStore = create((set, get) => ({
  user: null, // Store the authenticated user
  markers: [], // Store all markers
  userMarkers: [], // Store markers created by the logged-in user

  /** Fetch Authenticated User */
  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/api/users/me"); // Fetch the current authenticated user
      set({ user: res.data.user }); // Update the user state with the fetched user data
      return res.data.user;
    } catch (error) {
      set({ user: null }); // If an error occurs, set the user to null
      return null;
    }
  },

  /** Register User */
  registerUser: async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/api/users/register", { name, email, password }); // Register a new user
      set({ user: res.data.user }); // Update the user state with the new user data
      toast.success("Account created successfully!"); // Show success message
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!"); // Show error message if registration fails
      return { success: false };
    }
  },

  /** Login User */
  loginUser: async (email, password) => {
    try {
      const res = await axiosInstance.post("/api/users/login", { email, password }); // Attempt login
      set({ user: res.data.user }); // Update the user state on successful login
      toast.success("Logged in successfully!"); // Show success message
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!"); // Show error message if login fails
      return { success: false };
    }
  },

  /** Logout User */
  logoutUser: async () => {
    try {
      await axiosInstance.post("/api/users/logout"); // Logout the user
      set({ user: null, markers: [], userMarkers: [] }); // Clear user and markers data
      toast.success("Successfully logged out!"); // Show success message
    } catch (error) {
      toast.error("Logout failed!"); // Show error message if logout fails
    }
  },

  /** Create Marker */
  createMarker: async (name, latitude, longitude, description) => {
    try {
      const { user } = get();
      if (!user) {
        toast.error("User not authenticated!"); // Show error if user is not authenticated
        return { success: false };
      }

      const res = await axiosInstance.post("/api/markers/createMarker", {
        name, 
        latitude,
        longitude,
        description,
        createdById: user._id,
        createdByName: user.name,
      });

      set((state) => ({
        markers: [...state.markers, res.data.marker], // Add new marker to the markers list
        userMarkers: [...state.userMarkers, res.data.marker], // Add new marker to the user's markers list
      }));

      toast.success("Marker created successfully!"); // Show success message
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create marker!"); // Show error message if marker creation fails
      return { success: false };
    }
  },

  /** Fetch All Markers */
  fetchAllMarkers: async () => {
    try {
      const res = await axiosInstance.get("/api/markers/getAllMarkers"); // Fetch all markers
      set({ markers: res.data.markers || [] }); // Update the markers state with the fetched markers
    } catch (error) {
      toast.error("Error fetching markers!"); // Show error message if fetching markers fails
      set({ markers: [] }); // Set an empty array if fetching markers fails
    }
  },

  /** Delete Marker */
  deleteMarker: async (markerId) => {
    try {
      const res = await axiosInstance.delete(`/api/markers/${markerId}`); // Attempt to delete a marker

      if (res.data.success) {
        set((state) => ({
          markers: state.markers.filter((marker) => marker._id !== markerId), // Remove the deleted marker from the markers list
          userMarkers: state.userMarkers.filter((marker) => marker._id !== markerId), // Remove the deleted marker from the user's markers list
        }));

        toast.success("Marker deleted successfully!"); // Show success message
        return { success: true };
      } else {
        toast.error(res.data.message || "Failed to delete marker!"); // Show error message if marker deletion fails
        return { success: false };
      }
    } catch (error) {
      toast.error("Failed to delete marker!"); // Show error message if marker deletion fails
      return { success: false };
    }
  },

}));

export default useAuthStore;
