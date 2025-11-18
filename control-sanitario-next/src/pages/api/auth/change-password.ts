import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { validateAuthToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChangePasswordResponse>
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

    const { currentPassword, newPassword }: ChangePasswordRequest = req.body;

    // Validación de campos requeridos
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña actual y nueva son requeridas',
      });
    }

    // Validar que la nueva contraseña cumpla requisitos mínimos
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña debe tener al menos 8 caracteres',
      });
    }

    // Verificar que no sean la misma
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña debe ser diferente a la actual',
      });
    }

    // Buscar usuario
    const user = await prisma.usuario.findUnique({
      where: { id_usuario: payload.id_usuario },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    // Verificar contraseña actual
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual es incorrecta',
      });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await prisma.usuario.update({
      where: { id_usuario: user.id_usuario },
      data: { password_hash: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada exitosamente',
    });
  } catch (error) {
    console.error('Error en change-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al cambiar contraseña',
    });
  }
}
