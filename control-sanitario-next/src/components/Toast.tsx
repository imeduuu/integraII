import React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onDismiss: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onDismiss }) => {
  const color =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`text-white px-4 py-2 rounded mb-2 shadow ${color}`}>
      <div className="flex items-center justify-between">
        <div>{message}</div>
        <button onClick={() => onDismiss(id)} className="ml-4 font-bold">✕</button>
      </div>
    </div>
  );
};

export default Toast;
