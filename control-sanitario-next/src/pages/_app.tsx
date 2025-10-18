/**
 * Componente raíz de la aplicación Next.js
 * Configura providers globales y estilos base
 */
import '../styles/globals.css';
import { NotificationProvider } from '../components/NotificationProvider';
import '../styles/theme.css'; // <-- LÍNEA CORRECTA
import type { AppProps } from 'next/app';

/**
 * App wrapper que envuelve todas las páginas de la aplicación
 * Incluye NotificationProvider para notificaciones toast globales
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;
