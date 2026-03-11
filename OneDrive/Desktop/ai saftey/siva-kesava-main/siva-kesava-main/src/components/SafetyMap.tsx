import React, { useState, useEffect, useCallback } from 'react';
import { Map as MapIcon, Shield, Heart, Navigation, LocateFixed, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const policeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map center updates
const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

interface EmergencyPlace {
  id: number;
  name: string;
  type: string;
  pos: [number, number];
}

const SafetyMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [emergencyPlaces, setEmergencyPlaces] = useState<EmergencyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyPlaces = useCallback(async (lat: number, lon: number) => {
    try {
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:5000,${lat},${lon});
          node["amenity"="police"](around:5000,${lat},${lon});
          way["amenity"="hospital"](around:5000,${lat},${lon});
          way["amenity"="police"](around:5000,${lat},${lon});
        );
        out center;
      `;
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      const places: EmergencyPlace[] = data.elements.map((el: any) => ({
        id: el.id,
        name: el.tags.name || (el.tags.amenity === 'hospital' ? 'Hospital' : 'Police Station'),
        type: el.tags.amenity === 'hospital' ? 'Hospital' : 'Police',
        pos: [el.lat || el.center.lat, el.lon || el.center.lon]
      }));
      
      setEmergencyPlaces(places);
    } catch (err) {
      console.error("Failed to fetch nearby places:", err);
      setError("Could not load nearby emergency services.");
    }
  }, []);

  useEffect(() => {
    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyPlaces(latitude, longitude);
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Please enable GPS.");
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [fetchNearbyPlaces]);

  if (loading) return (
    <div className="h-[600px] flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-200">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium">Tracking your location...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center">
              <MapIcon className="mr-3 w-8 h-8 text-teal-600" />
              Real-Time Safety Map
            </h2>
            <p className="mt-2 text-slate-600">Showing real nearby hospitals and police stations based on your live location.</p>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl text-teal-700 text-sm font-bold">
              <LocateFixed className="w-4 h-4" />
              Live Tracking Active
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 flex items-center gap-2 border-b border-red-100">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="h-[600px] relative">
          <MapContainer 
            center={userLocation || [51.505, -0.09]} 
            zoom={14} 
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <>
                <RecenterAutomatically lat={userLocation[0]} lng={userLocation[1]} />
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold">You are here</p>
                      <p className="text-xs text-slate-500">Live tracking enabled</p>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
            {emergencyPlaces.map(place => (
              <Marker 
                key={place.id} 
                position={place.pos} 
                icon={place.type === 'Hospital' ? hospitalIcon : policeIcon}
              >
                <Popup>
                  <div className="p-1">
                    <p className="font-bold text-slate-900">{place.name}</p>
                    <p className={`text-xs font-semibold uppercase ${place.type === 'Hospital' ? 'text-red-600' : 'text-amber-600'}`}>
                      {place.type}
                    </p>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.pos[0]},${place.pos[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs bg-teal-600 text-white px-3 py-1 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="p-8 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-amber-100 p-3 rounded-xl mr-4">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Police Stations</p>
              <p className="text-xs text-slate-500">Gold markers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-red-100 p-3 rounded-xl mr-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Hospitals</p>
              <p className="text-xs text-slate-500">Red markers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <Navigation className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Your Location</p>
              <p className="text-xs text-slate-500">Blue marker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
