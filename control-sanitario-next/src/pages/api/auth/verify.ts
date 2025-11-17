import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { validateAuthToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface VerifyResponse {
  success: boolean;
  message: string;
  user?: {
    id_usuario: number;
    email: string;
    nombre_usuario: string;
    apellido_paterno?: string | null;
    apellido_materno?: string | null;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    // Validar token
    const authHeader = req.headers.authorization;
    const payload = validateAuthToken(authHeader);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado',
      });
    }

    // Buscar usuario en BD
    const user = await prisma.usuario.findUnique({
      where: { id_usuario: payload.id_usuario },
      select: {
        id_usuario: true,
        email: true,
        nombre_usuario: true,
        apellido_paterno: true,
        apellido_materno: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Token válido',
      user,
    });
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar token',
    });
  }
}
