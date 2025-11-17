import api from './api';

const BASE_PATH = '/full-animal';

export async function createFullAnimal(data: any) {
  try {
    const res = await api.post(BASE_PATH, data);
    return res.data;
  } catch (error) {
    console.error('Error al crear el animal:', error);
    throw error;
  }
}

export async function getFullAnimals() {
  try {
    const res = await api.get(BASE_PATH);
    return res.data;
  } catch (error) {
    console.error('Error al obtener animales:', error);
    throw error;
  }
}
