/**
 * Provider de notificaciones usando react-toastify
 */
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationContextProps {
  addToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

/**
 * Provider que maneja notificaciones toast en toda la aplicación
 * Utilizado para mostrar mensajes de éxito, error y advertencia
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Función para mostrar diferentes tipos de notificaciones
  const addToast = (message: string, type: 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <NotificationContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};