import axios from "axios";

const API_URL = "http://localhost:3000/api/full-animal"; // usa tu API local

export async function createFullAnimal(data: any) {
  try {
    const res = await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear el animal:", error);
    throw error;
  }
}

export async function getFullAnimals() {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error al obtener animales:", error);
    return [];
  }
}
