/**
 * Componente de alerta con diferentes tipos de mensaje
 */
import React from 'react';

interface AlertProps {
  message: string; // Texto del mensaje
  type?: 'success' | 'error' | 'info'; // Tipo de alerta
}

/**
 * Alerta simple con colores según el tipo (éxito, error, información)
 */
const Alert: React.FC<AlertProps> = ({ message, type = 'info' }) => (
  <div className={`p-2 rounded mb-2 ${type === 'error' ? 'bg-red-200 text-red-800' : type === 'success' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
    {message}
  </div>
);

export default Alert;
