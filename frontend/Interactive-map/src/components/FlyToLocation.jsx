import { useEffect } from "react";
import { useMap } from "react-leaflet";

// FlyToLocation component to animate map view to a new position
const FlyToLocation = ({ position, onFlyComplete }) => {
  const map = useMap();

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, 13, { animate: true });
      setTimeout(() => onFlyComplete(), 1000);
    }
  }, [position, map, onFlyComplete]); // Re-run effect when position, map, or onFlyComplete changes

  return null; // This component does not render anything, it only triggers the map fly animation
};

export default FlyToLocation;
