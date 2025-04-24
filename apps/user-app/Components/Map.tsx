"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 28.6139, // Default to New Delhi
  lng: 77.2090,
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* You can add markers here later */}
      </GoogleMap>
    </LoadScript>
  );
}
