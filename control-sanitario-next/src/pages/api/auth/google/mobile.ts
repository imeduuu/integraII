import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import { generateToken } from '../../../../utils/jwtUtils';

const prisma = new PrismaClient();

/**
 * POST /api/auth/google/mobile
 * Body: { id_token: string }
 * Verifica `id_token` enviado desde cliente móvil y crea/une usuario.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { id_token } = req.body || {};
  if (!id_token) {
    return res.status(400).json({ success: false, message: 'id_token requerido' });
  }

  const clientId = process.env.GOOGLE_MOBILE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ success: false, message: 'GOOGLE_MOBILE_CLIENT_ID / GOOGLE_CLIENT_ID no configurado' });
  }

  try {
    const oauth2Client = new OAuth2Client();
    const ticket = await oauth2Client.verifyIdToken({ idToken: id_token, audience: clientId });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
      return res.status(400).json({ success: false, message: 'id_token inválido' });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const nombre = payload.name || '';

    // Buscar cuenta Google existente
    // `google_account_id` is not the model's primary key, so use findFirst
    // to search by that (non-unique) field and include the related usuario.
    let googleAccount = await prisma.google_accounts.findFirst({
      where: { google_account_id: googleId },
      include: { usuario: true },
    });

    let user = googleAccount?.usuario as any;

    if (!user) {
      // Si no hay google_account, intentar encontrar usuario por email
      user = await prisma.usuario.findUnique({ where: { email } }) as any;
    }

    if (!user) {
      // Crear nuevo usuario mínimo
      user = await prisma.usuario.create({
        data: {
          nombre_usuario: nombre || email.split('@')[0],
          email,
          password_hash: '',
        },
      }) as any;
    }

    // Crear o actualizar google_accounts (sin tokens de acceso en mobile flow)
    if (!googleAccount) {
      await prisma.google_accounts.create({
        data: {
          id_usuario: user.id_usuario,
          google_account_id: googleId,
          google_email: email,
        },
      });
    }

    const jwt = generateToken({ id_usuario: user.id_usuario, email: user.email });

    return res.status(200).json({ success: true, token: jwt, id_usuario: user.id_usuario });
  } catch (error) {
    console.error('Google mobile auth error:', error);
    return res.status(500).json({ success: false, message: 'Error verificando id_token' });
  }
}
