import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface Verify2FARequest {
  email: string;
  code: string;
}

interface Verify2FAResponse {
  success: boolean;
  message: string;
  token?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Verify2FAResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const { email, code }: Verify2FARequest = req.body;

    // Validación de campos requeridos
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email y código de 2FA son requeridos',
      });
    }

    // Buscar usuario por email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    // TODO: Implementar verificación real de 2FA
    // Por ahora, simplemente validar que el código sea numérico
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'Código de 2FA inválido',
      });
    }

    // Generar token JWT
    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Verificación 2FA exitosa',
      token,
    });
  } catch (error) {
    console.error('Error en verificación 2FA:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar 2FA',
    });
  }
}
