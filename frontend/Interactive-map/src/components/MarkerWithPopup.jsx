import { Marker, Popup } from "react-leaflet"; // Import Marker and Popup from React-Leaflet
import L from "leaflet"; // Import Leaflet for custom marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png"; // Import marker icon image
import markerShadow from "leaflet/dist/images/marker-shadow.png"; // Import marker shadow image

// Define a custom Leaflet icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to display a marker with a popup
const MarkerWithPopup = ({ location, onDelete }) => {
  return (
    <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
      <Popup>
        {/* Popup content */}
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-64">
          <h3 className="text-lg font-bold text-blue-400">{location.name}</h3>
          <p className="text-sm text-gray-300">{location.description}</p>
          {/* Display the creator's name */}
          <p className="text-xs text-gray-500 mt-2">
            Added by: <span className="font-semibold text-gray-400">{location.createdByName}</span>
          </p>
          {/* Button to delete the marker */}
          <button
            onClick={() => onDelete(location._id)} // Trigger onDelete callback with the marker's ID
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-md transition duration-200"
          >
            Delete Marker
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerWithPopup;
