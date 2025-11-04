

export async function getHealthStates() {
  try {
    const response = await fetch("/api/health-states");

    if (!response.ok) {
      throw new Error("Error al obtener los estados de salud");
    }

    const data = await response.json();
    return data; // Devuelve la lista de estados
  } catch (error) {
    console.error("Error en getHealthStates:", error);
    return [];
  }
}
