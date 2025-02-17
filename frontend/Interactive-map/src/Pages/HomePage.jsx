import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar"; // Sidebar component
import LocationModal from "../components/LocationModal"; // Modal to create a new location
import MapView from "../components/MapView"; // Map view component
import useAuthStore from "../stores/useAuthStore"; // Custom store for authentication and markers
import { toast } from "react-toastify"; // For showing toast notifications

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false); // Manage modal visibility
  const [newMarkerPosition, setNewMarkerPosition] = useState(null); // Track new marker position
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering locations
  const [centerPosition, setCenterPosition] = useState(null); // Center position of the map
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  // Access store actions and data
  const { markers, fetchAllMarkers, createMarker, user, deleteMarker } = useAuthStore();

  // Fetch markers on component mount
  useEffect(() => {
    fetchAllMarkers();
  }, []);

  // Handle map click to set marker position
  const handleMapClick = (latlng) => {
    setNewMarkerPosition(latlng);
    setModalOpen(true);
  };

  // Save a new location
  const handleSaveLocation = async (name, description) => {
    if (newMarkerPosition && user) {
      const { success } = await createMarker(name, newMarkerPosition.lat, newMarkerPosition.lng, description);
      if (success) {
        fetchAllMarkers(); // Refresh markers after saving
        toast.success("Marker created successfully!"); // Show success toast
        setModalOpen(false); // Close modal
      } else {
        toast.error("Failed to create marker!"); // Show error toast
      }
    }
  };

  // Delete a location by marker ID
  const handleDeleteLocation = async (markerId) => {
    const { success } = await deleteMarker(markerId);
    if (success) {
      fetchAllMarkers(); // Refresh markers after deletion
      toast.success("Marker deleted successfully!"); // Show success toast
    } else {
      toast.error("Failed to delete marker!"); // Show error toast
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)} // Open sidebar
        className="md:hidden fixed top-20 left-4 z-[60] bg-gray-800 text-white p-3 rounded-md shadow-lg"
      >
        Locations
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-80 p-6 shadow-lg transform transition-transform duration-300 z-[60]
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-80 md:h-screen md:overflow-y-auto`}
      >
        {/* Close Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(false)} // Close sidebar
          className="md:hidden absolute top-4 right-4 bg-red-600 text-white p-2 rounded-md"
        >
          ✖
        </button>

        {/* Sidebar Content */}
        <SideBar 
          locations={markers.filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))} // Filter locations based on search query
          searchQuery={searchQuery} // Pass search query to sidebar
          onSearchChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
          onLocationSelect={(position) => {
            setCenterPosition(position); // Set center position on location click
            setIsSidebarOpen(false); // Close sidebar after location selection
          }}
        />
      </div>

      {/* Map Container */}
      <div className="flex-grow h-screen relative z-[50]">
        <MapView
          markers={markers} // Pass markers to the map
          onMapClick={handleMapClick} // Handle map click event to place marker
          centerPosition={centerPosition} // Pass center position to the map
          onFlyComplete={() => setCenterPosition(null)} // Reset center position after fly animation
          onDelete={handleDeleteLocation} // Handle delete marker
        />
      </div>

      {/* Location Modal */}
      <LocationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveLocation} />
    </div>
  );
};

export default HomePage;
