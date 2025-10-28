/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Añadir headers de seguridad incluyendo CSP
  async headers() {
    // Ajusta estas directivas a los orígenes que tu app realmente usa:
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: permitir analytics/CDN según sea necesario. Evitar 'unsafe-eval'/'unsafe-inline' en producción si es posible.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Estilos: permitir Google Fonts u otros CDNs si se usan
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Imágenes: self, data, blob y dominios de imágenes/CDN que uses
      "img-src 'self' data: blob: https://images.unsplash.com",
      // Conexiones (APIs, websockets): ajustar a tus endpoints
      "connect-src 'self' https://api.example.com wss:",
      // Fuentes: Google fonts u otros
      "font-src 'self' https://fonts.gstatic.com data:",
      // Evita que la app sea embebida en frames externos
      "frame-ancestors 'none'",
      // Base URI y form actions
      "base-uri 'self'",
      "form-action 'self'"
    ];

    // Construir header como string
    const contentSecurityPolicy = cspDirectives.join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy
          },
          // Otros headers de seguridad opcionales
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(self), microphone=()' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;