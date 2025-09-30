/**
 * Modal de inicio de sesión con validaciones básicas
 */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';

/**
 * Modal de login con validación de email y contraseña
 * Incluye enlace de recuperación de contraseña
 */
const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Validador de formato de email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Manejo de envío con validaciones
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(''); // Limpiamos mensajes anteriores

    // 1. Validar email
    if (!validateEmail(email)) {
      setMensaje('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 2. Validar contraseña
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // 3. Si todo es válido, continuar
    setMensaje('Login simulado (sin backend)');
    console.log('Login exitoso con:', { email, password });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form className="flex flex-col gap-3" style={{ minWidth: 320 }} onSubmit={handleSubmit} noValidate>
        <h2 className="font-bold text-xl mb-2">Iniciar Sesión</h2>
        <label className="font-semibold">Correo electrónico</label>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="font-semibold">Contraseña</label>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full mt-2">Entrar</Button>
        <div className="mt-2 text-center">
          <a href="/forgot-password" className="text-blue-600 underline text-sm">¿Olvidaste tu contraseña?</a>
        </div>
        {mensaje && <p className="mt-2 text-blue-600 font-semibold">{mensaje}</p>}
      </form>
    </Modal>
  );
};

export default LoginModal;