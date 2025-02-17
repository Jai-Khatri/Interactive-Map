import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"; // Import necessary components from React-Leaflet
import L from "leaflet"; // Import Leaflet for custom marker icons
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for map styling
import FlyToLocation from "./FlyToLocation"; // Import the FlyToLocation component

// Import custom Leaflet marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define a custom icon for the marker
const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map click events
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e.latlng), // Trigger onMapClick callback with clicked coordinates
  });
  return null;
};

// Main map view component
const MapView = ({ markers, onMapClick, centerPosition, onFlyComplete, onDelete }) => {
  return (
    <MapContainer
      center={centerPosition || [51.505, -0.09]} // Set initial center position of the map
      zoom={13} // Set zoom level
      className="h-full w-full relative z-[50]" // Set map container styles
    >
      {/* TileLayer for the base map */}
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" // Google Maps tile URL
        attribution='&copy; Google Maps' // Attribution for map tiles
      />
      {/* Handle map clicks */}
      <MapClickHandler onMapClick={onMapClick} />
      {/* Fly the map to the specified position */}
      <FlyToLocation position={centerPosition} onFlyComplete={onFlyComplete} />
      {/* Render markers on the map */}
      {markers.map((location) => (
        <Marker key={location._id} position={[location.latitude, location.longitude]} icon={customIcon}>
          <Popup>
            {/* Popup content for each marker */}
            <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-64">
              <h3 className="text-lg font-bold text-blue-400">{location.name}</h3>
              <p className="text-sm text-gray-300">{location.description}</p>
              {/* Delete button for each marker */}
              <button
                onClick={() => onDelete(location._id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-md transition duration-200"
              >
                Delete Marker
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
