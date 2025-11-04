import api from './api';

export interface ProfilePhotoMeta {
  id?: number | string;
  userId?: number | string;
  filename?: string;
  mimeType?: string;
  size?: number;
  uploadedAt?: string;
  [key: string]: any;
}

/**
 * Obtener metadatos de la foto de perfil (no binario)
 */
export async function getProfilePhoto(userId: number | string): Promise<ProfilePhotoMeta> {
  const res = await api.get(`/user/profile-image/${userId}`);
  return res.data as ProfilePhotoMeta;
}

/**
 * Obtener el archivo binario de la foto de perfil
 * Retorna un Blob para que el caller pueda crear un object URL o procesarlo
 */
export async function getProfilePhotoFile(userId: number | string): Promise<Blob> {
  const res = await api.get(`/user/profile-image/${userId}/file`, { responseType: 'blob' });
  return res.data as Blob;
}

/**
 * Subir o actualizar foto de perfil. `file` debe ser un objeto File (desde input[type=file])
 */
export async function uploadProfilePhoto(userId: number | string, file: File): Promise<ProfilePhotoMeta> {
  const form = new FormData();
  form.append('image', file);

  // No forzamos Content-Type: let axios set the multipart boundary
  const res = await api.post(`/user/profile-image/upload/${userId}`, form);
  return res.data as ProfilePhotoMeta;
}

/**
 * Eliminar foto de perfil
 */
export async function deleteProfilePhoto(userId: number | string): Promise<void> {
  await api.delete(`/user/profile-image/${userId}`);
}

export default {
  getProfilePhoto,
  getProfilePhotoFile,
  uploadProfilePhoto,
  deleteProfilePhoto,
};
