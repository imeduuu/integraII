import React, { useEffect, useRef } from 'react';
import styles from '../styles/toast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onDismiss: (id: number) => void;
  duration?: number; // Duración en milisegundos antes del auto-cierre
  dismissible?: boolean; // Si se puede cerrar manualmente
}

// Iconos SVG para cada tipo de notificación
const ToastIcons = {
  success: (
    <svg 
      className="w-6 h-6" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
        clipRule="evenodd" 
      />
    </svg>
  ),
  error: (
    <svg 
      className="w-6 h-6" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
        clipRule="evenodd" 
      />
    </svg>
  ),
  info: (
    <svg 
      className="w-6 h-6" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
        clipRule="evenodd" 
      />
    </svg>
  ),
  warning: (
    <svg 
      className="w-6 h-6" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
  ),
};

const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type, 
  onDismiss, 
  duration = 5000,
  dismissible = true 
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Configuración de colores y estilos por tipo - Diseño más limpio y profesional
  const toastConfig = {
    success: {
      border: 'border-green-500',
      text: 'text-gray-800 dark:text-gray-100',
      icon: 'text-white',
      iconBg: 'bg-green-500',
      label: 'Éxito'
    },
    error: {
      border: 'border-red-500',
      text: 'text-gray-800 dark:text-gray-100',
      icon: 'text-white',
      iconBg: 'bg-red-500',
      label: 'Error'
    },
    info: {
      border: 'border-blue-500',
      text: 'text-gray-800 dark:text-gray-100',
      icon: 'text-white',
      iconBg: 'bg-blue-500',
      label: 'Información'
    },
    warning: {
      border: 'border-yellow-500',
      text: 'text-gray-800 dark:text-gray-100',
      icon: 'text-white',
      iconBg: 'bg-yellow-500',
      label: 'Advertencia'
    },
  };

  const config = toastConfig[type];

  // Auto-cierre después de la duración especificada
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  // Gestión de focus para accesibilidad
  useEffect(() => {
    // Enfocar el toast cuando aparece para notificar a lectores de pantalla
    if (toastRef.current) {
      toastRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Permitir cerrar con la tecla Escape
    if (e.key === 'Escape' && dismissible) {
      onDismiss(id);
    }
  };

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      aria-labelledby={`toast-title-${id}`}
      data-type={type}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ position: 'relative', zIndex: 99999 }}
      className={`
        ${styles.toast}
        ${config.border}
        ${config.text}
        border-l-4 rounded-lg mb-3 p-4
        shadow-lg
        transform transition-all duration-300 ease-in-out
        hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-white dark:focus:ring-offset-gray-900
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icono con fondo circular de color */}
        <div className={`
          flex-shrink-0 
          ${config.iconBg} 
          ${config.icon} 
          w-10 h-10 
          rounded-full 
          flex items-center justify-center
          transform transition-transform duration-300
        `}>
          <div className="w-6 h-6">
            {ToastIcons[type]}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0 pt-1">
          <p id={`toast-title-${id}`} className="sr-only">
            {config.label}
          </p>
          <p className="text-sm font-medium leading-5 break-words">
            {message}
          </p>
        </div>

        {/* Botón de cierre */}
        {dismissible && (
          <button
            ref={closeButtonRef}
            onClick={() => onDismiss(id)}
            aria-label="Cerrar notificación"
            className={`
              flex-shrink-0 inline-flex rounded-md p-1
              text-gray-400 hover:text-gray-600 
              dark:text-gray-500 dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-gray-400
              transition-all duration-200
            `}
          >
            <svg 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
