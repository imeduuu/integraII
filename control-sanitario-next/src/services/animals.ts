import api from './api';

export interface Animal {
  id: number | string;
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  gender?: string;
  organizationId?: number | string;
  [key: string]: any;
}

export interface CreateAnimalPayload {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender?: string;
  organizationId?: number | string;
  [key: string]: any;
}

export interface UpdateAnimalPayload extends Partial<CreateAnimalPayload> {}

export interface MedicalHistoryEntry {
  id?: number | string;
  date?: string;
  notes?: string;
  type?: string;
  [key: string]: any;
}

// Animals endpoints
export async function getAnimals(params?: Record<string, any>): Promise<Animal[]> {
  const res = await api.get('/animals', { params });
  return res.data as Animal[];
}

export async function getAnimalById(id: number | string): Promise<Animal> {
  const res = await api.get(`/animals/${id}`);
  return res.data as Animal;
}

export async function getAnimalsByOrganization(orgId: number | string, params?: Record<string, any>): Promise<Animal[]> {
  const res = await api.get(`/animals/organization/${orgId}`, { params });
  return res.data as Animal[];
}

export async function createAnimal(payload: CreateAnimalPayload): Promise<Animal> {
  const res = await api.post('/animals', payload);
  return res.data as Animal;
}

export async function updateAnimal(id: number | string, payload: UpdateAnimalPayload): Promise<Animal> {
  const res = await api.put(`/animals/${id}`, payload);
  return res.data as Animal;
}

export async function deleteAnimal(id: number | string): Promise<void> {
  await api.delete(`/animals/${id}`);
}

// Medical History nested endpoints
export async function getAnimalMedicalHistory(animalId: number | string, params?: Record<string, any>): Promise<MedicalHistoryEntry[]> {
  const res = await api.get(`/animals/${animalId}/medicalHistory`, { params });
  return res.data as MedicalHistoryEntry[];
}

export async function createMedicalHistory(animalId: number | string, payload: MedicalHistoryEntry): Promise<MedicalHistoryEntry> {
  const res = await api.post(`/animals/${animalId}/medicalHistory`, payload);
  return res.data as MedicalHistoryEntry;
}

export async function getMedicalHistoryDetail(animalId: number | string, historyId: number | string): Promise<MedicalHistoryEntry> {
  const res = await api.get(`/animals/${animalId}/medicalHistory/${historyId}`);
  return res.data as MedicalHistoryEntry;
}

export async function updateMedicalHistory(animalId: number | string, historyId: number | string, payload: MedicalHistoryEntry): Promise<MedicalHistoryEntry> {
  const res = await api.put(`/animals/${animalId}/medicalHistory/${historyId}`, payload);
  return res.data as MedicalHistoryEntry;
}

export async function deleteMedicalHistory(animalId: number | string, historyId: number | string): Promise<void> {
  await api.delete(`/animals/${animalId}/medicalHistory/${historyId}`);
}

export default {
  getAnimals,
  getAnimalById,
  getAnimalsByOrganization,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalMedicalHistory,
  createMedicalHistory,
  getMedicalHistoryDetail,
  updateMedicalHistory,
  deleteMedicalHistory,
};
