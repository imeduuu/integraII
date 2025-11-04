// Servicio para consumir la API de Dogland
const API_URL = process.env.NEXT_PUBLIC_DOG_API_URL;

export async function fetchDogs() {
  const res = await fetch(`${API_URL}/dogs`);
  if (!res.ok) throw new Error('Error al obtener los perros');
  return res.json();
}

// Puedes agregar más funciones según los endpoints disponibles
