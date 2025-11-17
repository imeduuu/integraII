import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResetPasswordResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const { token, newPassword }: ResetPasswordRequest = req.body;

    // Validación de campos requeridos
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token y nueva contraseña son requeridos',
      });
    }

    // Validar que la contraseña cumpla requisitos mínimos
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
      });
    }

    // Hash del token recibido
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar el token de reset válido
    const resetRecord = await prisma.password_reset.findFirst({
      where: {
        token: hashedToken,
        expires_at: {
          gt: new Date(), // No expirado
        },
      },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message: 'Token inválido o expirado',
      });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña del usuario
    await prisma.usuario.update({
      where: { id_usuario: resetRecord.id_usuario },
      data: {
        password_hash: hashedPassword,
      },
    });

    // Marcar el token de reset como usado
    await prisma.password_reset.update({
      where: { id_reset: resetRecord.id_reset },
      data: { used: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada exitosamente',
    });
  } catch (error) {
    console.error('Error en reset-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al resetear contraseña',
    });
  }
}
