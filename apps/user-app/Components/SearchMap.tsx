'use client'

import { useState, useRef } from "react"
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import { useRouter } from "next/navigation";

export function SearchboxMapClient({ initialCoords }: { initialCoords?: { lat: number, lng: number } }) {
  const router = useRouter();

  const [coords, setCoords] = useState(initialCoords || null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places', 'maps'], // Important! Enables Places API
  });

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        // setCoords({ lat, lng });
        router.push(`/searchresult?lat=${lat}&lng=${lng}`);

        
      }
    }
  };
  
  const delhiBounds = {
    north: 28.8795,
    south: 28.4042,
    west: 76.8374,
    east: 77.3890,
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (

    <div className="w-full px-4 md:px-10 py-4">
          {/* Map */}
    <div className="w-full h-[280px] md:h-[350px] rounded overflow-hidden shadow">
    <GoogleMap
  mapContainerStyle={{ width: '100%', height: '100%' }}
  center={coords || { lat: 28.6139, lng: 77.2090 }}
  zoom={14}
  options={{
    disableDefaultUI: true, // Disable all default UI controls (including the map data and keyboard shortcuts)
    zoomControl: false, // You can enable the zoom control if needed
    streetViewControl: false, // Optionally disable StreetView control
    mapTypeControl: false, // Optionally disable the map type selector (roadmap/satellite)
    fullscreenControl: false, // Optionally disable the fullscreen button 
    styles: [
      {
        featureType: 'poi', // Point of Interest
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }, // Hides the labels of POI
        ],
      },
      {
        featureType: 'landscape', // You can hide landscape labels too if needed
        elementType: 'labels',
        stylers: [
          { visibility: 'off' },
        ],
      },
      {
        featureType: 'transit', // Hide transit labels (like bus stops, etc.)
        elementType: 'labels',
        stylers: [
          { visibility: 'off' },
        ],
      },
    ],
  }}
>
  {coords && <Marker position={coords} />}
</GoogleMap>

    </div>


    {/* Search Box */}
    <div className=" mt-4 w-full">
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a location"
          className="border p-2 rounded w-full text-sm md:text-xl"
        />
      </Autocomplete>
    </div>


  </div>
  );
}
