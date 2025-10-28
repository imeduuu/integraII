import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Head from 'next/head';

// Carga dinámica para evitar problemas SSR con Leaflet
const MapView = dynamic(() => import('../map/MapView'), { ssr: false });

export default function MapaPage() {
  return (
    <>
    <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Mapa Interactivo - Control Sanitario",
              "url": "https://HuellaSegura.vercel.app/mapa",
              "description": "Mapa interactivo para reportar y consultar animales en situación de calle y focos sanitarios.",
              "publisher": {
                "@type": "Organization",
                "name": "Control Sanitario",
                "logo": "https://HuellaSegura.vercel.app/logo.png"
              }
            })
          }}
        />
      </Head>
      
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-start py-8 px-2">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 text-center">Mapa Interactivo</h1>
          <div className="w-full max-w-3xl mx-auto">
            <MapView />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .leaflet-container {
            min-height: 350px !important;
            height: 55vh !important;
          }
        }
        .leaflet-container {
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          min-height: 400px;
          max-height: 70vh;
          height: 60vh;
          width: 100%;
        }
      `}</style>
    </>
  );
}
