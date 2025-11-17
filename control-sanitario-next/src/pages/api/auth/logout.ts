import type { NextApiRequest, NextApiResponse } from 'next';
import { validateAuthToken } from '../../../utils/jwtUtils';

interface LogoutResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
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

    // En una implementación real, se podría:
    // 1. Añadir el token a una blacklist
    // 2. Invalidar sesiones en la BD
    // Por ahora, simplemente confirmamos el logout

    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    });
  } catch (error) {
    console.error('Error en logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al cerrar sesión',
    });
  }
}
