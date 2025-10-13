import dynamic from 'next/dynamic';

// Carga dinámica para evitar problemas SSR con Leaflet
const MapView = dynamic(() => import('../map/MapView'), { ssr: false });

export default function MapaPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Mapa Interactivo</h1>
      <MapView />
    </div>
  );
}
