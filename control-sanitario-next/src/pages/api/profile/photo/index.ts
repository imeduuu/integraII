import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PhotoResponse {
  success: boolean;
  message: string;
  foto_perfil?: string;
  usuario?: {
    id_usuario: number;
    nombre_usuario: string;
    email: string;
  };
}

/**
 * GET /api/profile/photo/:id o /api/profile/photo?id=1
 * Obtiene la foto de perfil de un usuario específico
 * 
 * Parámetros:
 * - id: ID del usuario (en URL como ruta dinámica o query parameter)
 * 
 * Retorna la foto en formato base64 o URL
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoResponse>
) {
  // Si es GET, mostrar instrucciones si no tiene ID
  if (req.method === 'GET') {
    let { id } = req.query;

    // Si no hay ID en query, mostrar instrucciones
    if (!id) {
      return res.status(200).json({
        success: false,
        message: 'Uso: GET /api/profile/photo/:id o /api/profile/photo?id=1',
        foto_perfil: undefined,
        usuario: undefined,
      });
    }

    if (typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'ID de usuario debe ser un número',
      });
    }

    const idUsuario = parseInt(id, 10);

    if (isNaN(idUsuario)) {
      return res.status(400).json({
        success: false,
        message: 'ID de usuario inválido (debe ser un número)',
      });
    }

    try {
      // Buscar usuario y su foto
      const user = await prisma.usuario.findUnique({
        where: { id_usuario: idUsuario },
        select: {
          id_usuario: true,
          nombre_usuario: true,
          email: true,
          // `foto_perfil` exists in schema but generated types may be stale.
          // Use `any` cast to avoid TypeScript errors until `prisma generate` runs.
          foto_perfil: true as any,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      if (!(user as any).foto_perfil) {
        return res.status(404).json({
          success: false,
          message: 'Este usuario no tiene foto de perfil',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Foto de perfil obtenida exitosamente',
        foto_perfil: user.foto_perfil,
        usuario: {
          id_usuario: user.id_usuario,
          nombre_usuario: user.nombre_usuario,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error al obtener foto de perfil:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener foto de perfil',
      });
    }
  }

  // Si no es GET, rechazar
  return res.status(405).json({
    success: false,
    message: 'Solo se permite GET',
  });

}
