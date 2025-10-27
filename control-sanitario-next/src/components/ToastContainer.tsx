/**
 * Contenedor de notificaciones Toast
 * Gestiona la posición y el stack de múltiples notificaciones
 */
import React, { useState, useCallback, createContext, useContext } from 'react';
import Toast, { ToastType } from './Toast';
import styles from '../styles/toast.module.css';

export interface ToastData {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
  dismissible?: boolean;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number; // Máximo número de toasts visibles a la vez
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onDismiss, 
  position = 'top-right',
  maxToasts = 5 
}) => {
  // Limitar el número de toasts visibles
  const visibleToasts = toasts.slice(0, maxToasts);

  // Configuración de posición
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`
        ${styles.toastContainer}
        fixed ${positionClasses[position]}
        flex flex-col gap-3
        pointer-events-none
      `}
      style={{ zIndex: 999999 }}
      aria-live="polite"
      aria-atomic="false"
      role="region"
      aria-label="Notificaciones"
    >
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto" style={{ position: 'relative', zIndex: 999999 }}>
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onDismiss={onDismiss}
            duration={toast.duration}
            dismissible={toast.dismissible}
          />
        </div>
      ))}
    </div>
  );
};

// Context para el ToastProvider
interface ToastContextValue {
  toasts: ToastData[];
  addToast: (message: string, type: ToastType, duration?: number, dismissible?: boolean) => void;
  removeToast: (id: number) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext debe usarse dentro de ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'top-right',
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [nextId, setNextId] = useState(1);

  const addToast = useCallback((
    message: string, 
    type: ToastType, 
    duration?: number,
    dismissible: boolean = true
  ) => {
    const id = nextId;
    setNextId(prev => prev + 1);
    setToasts(prev => [...prev, { id, message, type, duration, dismissible }]);
  }, [nextId]);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onDismiss={removeToast} 
        position={position}
        maxToasts={maxToasts}
      />
    </ToastContext.Provider>
  );
};

export default ToastContainer;
