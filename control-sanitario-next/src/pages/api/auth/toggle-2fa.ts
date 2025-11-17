import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { validateAuthToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface Toggle2FARequest {
  enable: boolean;
}

interface Toggle2FAResponse {
  success: boolean;
  message: string;
  has_2fa?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Toggle2FAResponse>
) {
  if (req.method !== 'POST') {
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

    const { enable }: Toggle2FARequest = req.body;

    // Validación de campos requeridos
    if (typeof enable !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Campo "enable" debe ser un booleano',
      });
    }

    // TODO: Implementar lógica real de 2FA
    // Por ahora solo confirmamos la solicitud
    
    return res.status(200).json({
      success: true,
      message: enable
        ? 'Autenticación 2FA habilitada'
        : 'Autenticación 2FA deshabilitada',
      has_2fa: enable,
    });
  } catch (error) {
    console.error('Error en toggle-2fa:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al cambiar configuración de 2FA',
    });
  }
}
