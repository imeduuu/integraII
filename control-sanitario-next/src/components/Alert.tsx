import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info' }) => (
  <div className={`p-2 rounded mb-2 ${type === 'error' ? 'bg-red-200 text-red-800' : type === 'success' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
    {message}
  </div>
);

export default Alert;
