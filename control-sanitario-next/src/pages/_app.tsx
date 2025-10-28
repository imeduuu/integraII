/**
 * Componente raíz de la aplicación Next.js
 * Configura providers globales y estilos base
 */
import '../styles/globals.css';
import { NotificationProvider } from '../components/NotificationProvider';
import { ThemeProvider } from '../context/ThemeContext';
import Head from 'next/head';
import type { AppProps } from 'next/app';

/**
 * App wrapper que envuelve todas las páginas de la aplicación
 * Incluye ThemeProvider para tema dark/light y NotificationProvider para notificaciones toast globales
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Meta viewport CRÍTICO para responsive en móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </Head>
      <ThemeProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
