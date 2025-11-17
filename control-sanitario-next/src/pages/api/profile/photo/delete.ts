import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface DeleteResponse {
  success: boolean;
  message: string;
  id_usuario?: number;
}

/**
 * DELETE /api/profile/photo/delete
 * Elimina la foto de perfil del usuario autenticado
 * 
 * Requiere:
 * - Header: Authorization: Bearer <JWT_TOKEN>
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({
      success: false,
      message: 'Solo se permite DELETE',
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

    if (!(user as any).foto_perfil) {
      return res.status(404).json({
        success: false,
        message: 'El usuario no tiene foto de perfil para eliminar',
      });
    }

    // Eliminar foto de la BD
    const updatedUser = await prisma.usuario.update({
      where: { id_usuario },
      // `foto_perfil` is present in Prisma schema, but generated types
      // may be out of sync. Cast `data` to `any` to avoid TS complaints
      data: ({ foto_perfil: null } as any),
    });

    return res.status(200).json({
      success: true,
      message: 'Foto de perfil eliminada exitosamente',
      id_usuario: updatedUser.id_usuario,
    });
  } catch (error) {
    console.error('Error al eliminar foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar foto de perfil',
    });
  }
}
