import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  requires2FA?: boolean;
  email?: string;
  example?: unknown;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  // If someone opens this URL in a browser (GET), return a helpful instruction.
  if (req.method === 'GET') {
    res.setHeader('Allow', 'POST');
    return res.status(200).json({
      success: false,
      message: 'Use POST con JSON {email, password}',
      example: { method: 'POST', body: { email: 'usuario@ejemplo.com', password: 'tu_contraseña' } },
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Método no permitido. Use POST con JSON {email, password}',
    });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    // Validación de campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
    }

    // Buscar usuario por email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Verificar que el usuario esté activo
    if (!user.activo) {
      return res.status(403).json({
        success: false,
        message: 'Usuario desactivado',
      });
    }

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // TODO: Implementar 2FA cuando sea necesario
    const requires2FA = false; // Por ahora deshabilitado

    if (requires2FA) {
      return res.status(200).json({
        success: true,
        requires2FA: true,
        message: 'Se requiere verificación de 2FA',
        email: user.email,
      });
    }

    // Generar token JWT
    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
    });

    // Actualizar último login
    await prisma.usuario.update({
      where: { id_usuario: user.id_usuario },
      data: { fecha_ultimo_login: new Date() },
    });

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
    });
  }
}
