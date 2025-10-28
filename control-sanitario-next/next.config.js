/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuración para Service Worker
  // Next.js automáticamente sirve archivos de /public
  // pero aquí lo hacemos explícito
  
  async headers() {
    return [
      {
        // Aplicar headers a sw.js para asegurar que se pueda cachear correctamente
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        // Headers para manifest.json
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
  
  // Asegurar que los archivos estáticos se sirvan correctamente
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
};

module.exports = nextConfig;
