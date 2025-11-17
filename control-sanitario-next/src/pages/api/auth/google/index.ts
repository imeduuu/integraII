import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

/**
 * GET /api/auth/google
 * Redirige al usuario a la pantalla de consentimiento de Google
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <html>
        <head><title>Google OAuth - Missing configuration</title></head>
        <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;line-height:1.6;padding:24px;">
          <h2>Google OAuth not configured</h2>
          <p>The environment variables required for Google OAuth are not set.</p>
          <p>Create a file named <code>.env.local</code> in the project root with the values from <code>.env.local.example</code>.</p>
          <pre style="background:#f6f8fa;padding:12px;border-radius:6px;">GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
JWT_SECRET=your-jwt-secret
</pre>
          <p>After creating the file, restart the Next.js dev server and open <a href="/api/auth/google">/api/auth/google</a> again to start the sign-in flow.</p>
        </body>
      </html>
    `);
  }

  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['openid', 'email', 'profile'],
  });
  // Log para depuración: muestra en la terminal el URL de autenticación
  try {
    // eslint-disable-next-line no-console
    console.log('[google auth] redirect URL:', url);
  } catch (e) {}

  // Redirigir al usuario al URL de autenticación
  // Do not return the result of `res.redirect` (Next.js warns if API handlers return a value)
  res.redirect(url);
  res.end();
}
