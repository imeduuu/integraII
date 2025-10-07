/**
 * Componente raíz de la aplicación Next.js
 * Configura providers globales y estilos base
 */
import '../styles/globals.css';
import { NotificationProvider } from '../components/NotificationProvider';
import { ThemeProvider } from '../context/ThemeContext';
import type { AppProps } from 'next/app';

/**
 * App wrapper que envuelve todas las páginas de la aplicación
 * Incluye NotificationProvider para notificaciones toast globales
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
