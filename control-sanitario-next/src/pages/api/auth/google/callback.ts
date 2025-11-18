import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import { generateToken } from '../../../../utils/jwtUtils';

const prisma = new PrismaClient();

/**
 * GET /api/auth/google/callback?code=...
 * Intercambia el `code` por tokens, verifica el id_token y crea/une usuario.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
  if (!code) {
    // If callback is opened directly (no code), redirect to start the flow
    res.redirect('/api/auth/google');
    res.end();
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    res.status(500).json({ success: false, message: 'Google OAuth env vars not configured' });
    return;
  }

  try {
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
    const { tokens } = await oauth2Client.getToken(code as string);

    const idToken = tokens.id_token;
    if (!idToken) {
      res.status(400).json({ success: false, message: 'No id_token returned from Google' });
      return;
    }

    const ticket = await oauth2Client.verifyIdToken({ idToken, audience: clientId });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
      res.status(400).json({ success: false, message: 'Invalid id_token payload' });
      return;
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

    let user = googleAccount?.usuario;

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

    // Crear o actualizar google_accounts
    if (!googleAccount) {
      googleAccount = await prisma.google_accounts.create({
        data: {
          id_usuario: user.id_usuario,
          google_account_id: googleId,
          google_email: email,
          access_token: tokens.access_token || null,
          refresh_token: tokens.refresh_token || null,
        },
        include: { usuario: true },
      });
    } else {
      await prisma.google_accounts.update({
        where: { id_google_account: googleAccount.id_google_account },
        data: {
          access_token: tokens.access_token || null,
          refresh_token: tokens.refresh_token || null,
          google_email: email,
        },
      });
    }

    // Generar JWT propio
    const jwt = generateToken({ id_usuario: user.id_usuario, email: user.email });

    // En este ejemplo devolvemos JSON; en apps web querremos redirigir con token en cookie o query
    res.status(200).json({ success: true, token: jwt, id_usuario: user.id_usuario });
    return;
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ success: false, message: 'Error en Google OAuth callback' });
    return;
  }
}
