/**
 * Modal de autenticación con toggle entre login y registro
 */
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';

import { sanitizeFormData } from "../utils/sanitize";

import Loader from './ui/Loader';
import { useNotification } from '../components/NotificationProvider';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'login' | 'register'; // Modo actual del modal
  setMode: (mode: 'login' | 'register') => void;
}

// Validador de email con regex
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Modal unificado para login y registro con validaciones en tiempo real
 * Incluye toggle entre modos y validación de formulario
 */
const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [touched, setTouched] = useState(false);

  const { addToast } = useNotification();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Manejo de envío con validaciones
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(email)) {
      setMensaje('Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);
    Promise.resolve()
      .then(() => {
        const successMessage = mode === 'login'
          ? 'Inicio de sesión exitoso (simulado)'
          : 'Registro exitoso (simulado)';
        setMensaje(successMessage);
        addToast(successMessage, 'success');
      })
      .catch(() => addToast('Error en la operación', 'error'))
      .finally(() => setIsSubmitting(false));
  };

  React.useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setMensaje('');
      setTouched(false);
    }
  }, [open, mode]);

  if (!open) return null;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="relative">
        {/* Toggle entre login y registro */}
        <div className="flex mb-6 border-b border-gray-200">
          <Button
            type="button"
            variant={mode === 'register' ? 'primary' : 'secondary'}
            className={`flex-1 rounded-none border-b-2 ${mode === 'register' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
            onClick={() => setMode('register')}
          >
            Crear cuenta
          </Button>
          <Button
            type="button"
            variant={mode === 'login' ? 'primary' : 'secondary'}
            className={`flex-1 rounded-none border-b-2 ${mode === 'login' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
            onClick={() => setMode('login')}
          >
            Iniciar sesión
          </Button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
          <label className="font-semibold">Correo electrónico</label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            onBlur={() => setTouched(true)}
            placeholder="correo@ejemplo.com"
          />
          {touched && !validateEmail(email) && (
            <span className="text-pink-600 text-xs">Correo inválido</span>
          )}
          <label className="font-semibold mt-2">Contraseña</label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Mínimo 6 caracteres"
          />
          {touched && password.length > 0 && password.length < 6 && (
            <span className="text-pink-600 text-xs">Mínimo 6 caracteres</span>
          )}
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? <span className="inline-flex items-center gap-2"><Loader size={16} />{mode === 'login' ? 'Entrando...' : 'Creando...'}</span> : (mode === 'login' ? 'Entrar' : 'Crear cuenta')}
          </Button>
        </form>
        {mensaje && <p className="mt-4 text-blue-600 font-semibold">{mensaje}</p>}
      </div>
    </Modal>
  );
};

export default AuthModal;