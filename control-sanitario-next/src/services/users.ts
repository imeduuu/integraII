import api from './api';

export interface User {
  id: number | string;
  name?: string;
  email?: string;
  roles?: string[];
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  roles?: string[];
  [key: string]: any;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

export interface SavePushTokenPayload {
  token: string;
  platform?: string;
}

/**
 * Listar todos los usuarios (Admin)
 */
export async function listAllUsers(params?: Record<string, any>): Promise<User[]> {
  const res = await api.get('/users', { params });
  return res.data as User[];
}

/**
 * Obtener perfil del usuario autenticado
 */
export async function getUserProfile(): Promise<User> {
  const res = await api.get('/users/profile');
  return res.data as User;
}

/**
 * Actualizar perfil del usuario autenticado
 */
export async function updateOwnProfile(payload: UpdateUserPayload): Promise<User> {
  const res = await api.put('/users/profile', payload);
  return res.data as User;
}

/**
 * Obtener usuario por ID (Admin)
 */
export async function getUserById(id: number | string): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data as User;
}

/**
 * Crear usuario (Admin)
 */
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await api.post('/users', payload);
  return res.data as User;
}

/**
 * Actualizar usuario por ID (Admin)
 */
export async function updateUser(id: number | string, payload: UpdateUserPayload): Promise<User> {
  const res = await api.put(`/users/${id}`, payload);
  return res.data as User;
}

/**
 * Eliminar usuario por ID (Admin)
 */
export async function deleteUser(id: number | string): Promise<void> {
  await api.delete(`/users/${id}`);
}

/**
 * Desactivar usuario (Admin)
 */
export async function deactivateUser(id: number | string): Promise<User> {
  const res = await api.patch(`/users/${id}/deactivate`);
  return res.data as User;
}

/**
 * Activar usuario (Admin)
 */
export async function activateUser(id: number | string): Promise<User> {
  const res = await api.patch(`/users/${id}/activate`);
  return res.data as User;
}

/**
 * Guardar token push para el usuario autenticado
 */
export async function savePushToken(payload: SavePushTokenPayload): Promise<void> {
  await api.post('/users/savePushToken', payload);
}

export default {
  listAllUsers,
  getUserProfile,
  updateOwnProfile,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
  savePushToken,
};
