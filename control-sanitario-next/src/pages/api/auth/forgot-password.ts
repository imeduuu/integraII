import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    : undefined,
});

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ForgotPasswordResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const { email }: ForgotPasswordRequest = req.body;

    // Validación de campos requeridos
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email es requerido',
      });
    }

    // Buscar usuario por email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return res.status(200).json({
        success: true,
        message: 'Si el email existe, recibirá instrucciones para resetear la contraseña',
      });
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // Guardar token de reset en BD
    await prisma.password_reset.create({
      data: {
        id_usuario: user.id_usuario,
        token: hashedToken,
        created_at: new Date(),
        expires_at: expiresAt,
      },
    });

    // Enviar email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@example.com',
        to: email,
        subject: 'Instrucciones para resetear contraseña',
        html: `
          <h2>Resetear Contraseña</h2>
          <p>Has solicitado resetear tu contraseña. Haz click en el enlace de abajo para continuar:</p>
          <a href="${resetUrl}">Resetear Contraseña</a>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste esto, ignora este email.</p>
        `,
      });
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
      // Continuar aunque falle el email (no es crítico)
    }

    return res.status(200).json({
      success: true,
      message: 'Si el email existe, recibirá instrucciones para resetear la contraseña',
    });
  } catch (error) {
    console.error('Error en forgot-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar solicitud',
    });
  }
}
