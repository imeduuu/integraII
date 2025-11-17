import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { verifyToken } from '../../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface UploadResponse {
  success: boolean;
  message: string;
  foto_url?: string;
  id_usuario?: number;
}

/**
 * POST /api/profile/photo/upload
 * Sube o reemplaza la foto de perfil del usuario autenticado
 * 
 * Requiere:
 * - Header: Authorization: Bearer <JWT_TOKEN>
 * - Body: multipart/form-data con archivo "file" (imagen)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Solo se permite POST',
    });
  }

  try {
    // Verificar autenticación
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token requerido en header Authorization',
      });
    }

    const tokenPayload = verifyToken(authHeader.replace('Bearer ', ''));
    if (!tokenPayload || !tokenPayload.id_usuario) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado',
      });
    }

    const id_usuario = tokenPayload.id_usuario;

    // Validar que el usuario exista
    const user = await prisma.usuario.findUnique({
      where: { id_usuario },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    // Obtener archivo del body (multipart)
    const { file, fileBase64, fileName } = req.body;

    if (!fileBase64 || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'Archivo base64 y nombre de archivo requeridos',
      });
    }

    // Validar tipo de archivo (solo imágenes)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const mimeType = req.body.mimeType || 'image/jpeg';

    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({
        success: false,
        message: 'Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)',
      });
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const fileSizeInBytes = Buffer.byteLength(fileBase64, 'base64');

    if (fileSizeInBytes > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'El archivo es muy grande (máximo 5MB)',
      });
    }

    // Guardar imagen (opción 1: usar base64 en BD)
    // También podemos guardar en filesystem si lo preferimos
    const photoPath = `data:${mimeType};base64,${fileBase64}`;

    // Eliminar foto anterior si existe
    if ((user as any).foto_perfil && (user as any).foto_perfil.startsWith('data:')) {
      // Si es base64, simplemente será reemplazado
      // Si es ruta de archivo, eliminar archivo
      const oldPath = join(process.cwd(), 'public', 'uploads', 'profiles', user.foto_perfil);
      if (existsSync(oldPath)) {
        try {
          unlinkSync(oldPath);
        } catch (error) {
          console.error('Error al eliminar foto anterior:', error);
        }
      }
    }

    // Actualizar usuario con nueva foto
    const updatedUser = await prisma.usuario.update({
      where: { id_usuario },
      data: ({ foto_perfil: photoPath } as any),
    });

    return res.status(200).json({
      success: true,
      message: 'Foto de perfil actualizada exitosamente',
      foto_url: photoPath,
      id_usuario: updatedUser.id_usuario,
    });
  } catch (error) {
    console.error('Error al subir foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al subir foto de perfil',
    });
  }
}
