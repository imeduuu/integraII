"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { getMarkers, addMarker } from './mockData';
import MarkerPopup from './MarkerPopup';
import ReportModal from './ReportModal';

const TEMUCO_CENTER = { lat: -38.7359, lng: -72.5904 };

export default function MapClient() {
  const [markers, setMarkers] = useState([]);
  const [modal, setModal] = useState({ open: false, position: null });

  useEffect(() => {
    getMarkers().then(setMarkers);
  }, []);

  function handleMapClick(e) {
    setModal({ open: true, position: e.latlng });
  }

  function handleAddMarker(type, description) {
    const newMarker = {
      type,
      position: modal.position,
      description,
    };
    addMarker(newMarker).then(() => {
      getMarkers().then(setMarkers);
      setModal({ open: false, position: null });
    });
  }

  function MapClickHandler() {
    useMapEvents({ click: handleMapClick });
    return null;
  }

  return (
    <div className="h-[70vh] w-full rounded-lg overflow-hidden shadow-lg dark:bg-gray-800">
      <MapContainer center={TEMUCO_CENTER} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler />
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={MarkerPopup.getIcon(marker.type)}
          >
            <Popup>
              <MarkerPopup marker={marker} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <ReportModal
        open={modal.open}
        onClose={() => setModal({ open: false, position: null })}
        onSubmit={handleAddMarker}
      />
    </div>
  );
}
