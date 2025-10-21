// mockData.js
// Datos mock locales para marcadores del mapa

export const mockMarkers = [
  // Ejemplo de marcador inicial
  {
    id: 1,
    type: 'report', // 'report' | 'adoption' | 'want_adopt'
    position: { lat: -38.7359, lng: -72.5904 },
    description: 'Animal abandonado en la plaza',
  },
  {
    id: 2,
    type: 'adoption',
    position: { lat: -38.7400, lng: -72.6000 },
    description: 'Punto de adopción: Refugio Temuco',
  },
];

// Funciones para simular carga y guardado (fácil de reemplazar por API)
export function getMarkers() {
  return Promise.resolve([...mockMarkers]);
}

export function addMarker(marker) {
  mockMarkers.push({ ...marker, id: Date.now() });
  return Promise.resolve();
}
