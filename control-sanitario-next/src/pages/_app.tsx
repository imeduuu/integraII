/**
 * Componente raíz de la aplicación Next.js
 * Configura providers globales y estilos base
 */
import '../styles/globals.css';
import { NotificationProvider } from '../components/NotificationProvider';
import { ThemeProvider } from '../context/ThemeContext';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { notificationService } from '../services/notificationService';

const MotionDiv: any = motion.div;

/**
 * App wrapper que envuelve todas las páginas de la aplicación
 * Incluye ThemeProvider para tema dark/light y NotificationProvider para notificaciones toast globales
 */
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const initNotifications = async () => {
      const initialized = await notificationService.initialize();
      if (initialized) {
        console.log('Servicio de notificaciones inicializado');
      }
    };
    initNotifications();
  }, []);

  return (
    <>
      <Head>
        {/* Meta viewport CRÍTICO para responsive en móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="description" content="Sistema de control sanitario y seguimiento de animales" />
      </Head>
      <ThemeProvider>
        <NotificationProvider>
          <AnimatePresence mode="wait">
            <MotionDiv
              key={router.route}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
            >
              <Component {...pageProps} />
            </MotionDiv>
          </AnimatePresence>
        </NotificationProvider>
      </ThemeProvider>
    </>
    )
  }

export default MyApp;
