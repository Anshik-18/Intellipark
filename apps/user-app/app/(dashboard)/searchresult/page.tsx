"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { InfoWindow } from "@react-google-maps/api";

export default function SearchResult() {
    const router = useRouter()
    function handleClick(lot: any) {
      router.push(`/bookparking?lotid=${lot.id}`);
    }
    
    const searchParams = useSearchParams();
    const lat = parseFloat(searchParams.get("lat") || "28.6139");
    const lng = parseFloat(searchParams.get("lng") || "77.2090");
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    

  const [parkingLots, setParkingLots] = useState<any[]>([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places', 'maps'], // Important! Enables Places API
  });

  const handleMarkerClick = (i: number, lot: any) => {
    setActiveMarker(i);
    if (map) {
      map.panTo({ lat: lot.lat, lng: lot.lng });
    }
  };
  

  useEffect(() => {
    async function fetchNearbyParking() {
      const res = await fetch(`/api/nearbyparking?lat=${lat}&lng=${lng}`)
      
      if(res.ok){
          const data = await res.json();
          console.log(data)
          setParkingLots(data);
      }
      console.log(res.status)
    }

    fetchNearbyParking();
  }, [lat, lng]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="px-4 md:px-10 py-4">
      <div className="w-full h-[280px] md:h-[350px] rounded overflow-hidden shadow mb-6">
        <GoogleMap

         mapContainerStyle={{ width: '100%', height: '100%' }}
         center={{ lat, lng }}
  zoom={14}
  onLoad={setMap}

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
          <Marker position={{ lat, lng }}
              icon={{
                url: "/icon/user-location.png", // custom icon for user search
                scaledSize: new window.google.maps.Size(40, 40),
              }}/>
{parkingLots.map((p, i) => (
  <Marker
    key={i}
    position={{ lat: p.lat, lng: p.lng }}
    icon={{
      url: "/icon/parking-marker.png",
      scaledSize: new window.google.maps.Size(35, 35),
    }}
    onClick={() => handleMarkerClick(i, p)}
  >
    {activeMarker === i && (
      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
        <div className="text-sm">
          <h3 className="font-bold">{p.Name}</h3>
          <p className="text-xs">{p.Adress}</p>
          <p>₹{p.price} · {p.vacantslots} slots</p>
        </div>
      </InfoWindow>
    )}
  </Marker>
))}

        </GoogleMap>
      </div>
       
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {parkingLots.map((lot, i) => (
    <div
      key={i}
      className={`border rounded-2xl p-5 shadow-md transition transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
        lot.isempty ? 'bg-white border-green-200' : 'bg-red-100 border-red-400'
      }`}
    >
      {/* Status Tag */}
      <div className="flex justify-end">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            lot.isempty
              ? 'bg-green-100 text-green-700'
              : 'bg-red-200 text-red-700'
          }`}
        >
          {lot.isempty ? 'Available' : 'Full'}
        </span>
      </div>

      {/* Parking Lot Info */}
      <h2 className="text-xl font-bold text-gray-800 mt-2">{lot.Name}</h2>
      <h4 className="text-md font-medium text-gray-600 mb-2">{lot.Adress}</h4>

      <div className="space-y-1 text-sm text-gray-700">
        <p> <span className="font-medium">Price:</span> ₹{lot.price}</p>
        <p> <span className="font-medium">Vacant Slots:</span> {lot.vacantslots}</p>
        <p> <span className="font-medium">Distance:</span> {lot.distance}</p>
        <p> <span className="font-medium">Time:</span> {lot.duration}</p>
      </div>

     
      <div className="pt-4">
      <Button children="Book now " onClick={()=>{
    handleClick(lot)
            }}/>
      
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

