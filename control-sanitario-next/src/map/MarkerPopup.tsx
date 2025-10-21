"use client";

import L from 'leaflet';
import { FaPaw, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

type Marker = {
  type: 'report' | 'adoption' | 'want_adopt' | string;
  description?: string;
};

export default function MarkerPopup({ marker }: { marker: Marker }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {marker.type === 'report' && <FaMapMarkerAlt className="text-red-500" />}
        {marker.type === 'adoption' && <FaPaw className="text-blue-500" />}
        {marker.type === 'want_adopt' && <FaHeart className="text-green-500" />}
        <span className="font-semibold capitalize">{marker.type.replace('_', ' ')}</span>
      </div>
      <div className="mt-1 text-sm text-gray-700 dark:text-gray-200">{marker.description}</div>
    </div>
  );
}

// Iconos personalizados para Leaflet
const iconMap = {
  report: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  }),
  adoption: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  }),
  want_adopt: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  }),
};

// Para usar en MapView
MarkerPopup.getIcon = function(type) {
  return iconMap[type] || iconMap.report;
};
