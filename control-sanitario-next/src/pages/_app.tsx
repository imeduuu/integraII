/**
 * Componente raíz de la aplicación Next.js
 * Configura providers globales y estilos base
 */
import '../styles/globals.css';
import { NotificationProvider } from '../components/NotificationProvider';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

const MotionDiv: any = motion.div;

/**
 * App wrapper que envuelve todas las páginas de la aplicación
 * Incluye NotificationProvider para notificaciones toast globales
 */
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
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
  );
}

export default MyApp;
