import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotification } from '../components/NotificationProvider';

interface LoginFormInputs {
  email: string;
  password: string;
}

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '32px',
  background: '#f3f4f6',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};
const errorStyle: React.CSSProperties = {
  color: '#e11d48',
  fontSize: '13px',
  marginTop: '-8px',
  marginBottom: '16px',
};
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer'
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { addToast } = useNotification();
  const [mensaje, setMensaje] = React.useState('');

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Datos del formulario:', data);
    setMensaje('Login simulado (sin backend)');
    addToast('Inicio de sesión exitoso', 'success');
  };

  return (
    <>
      <Navbar />
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Iniciar Sesión</h2>
        
        <label style={labelStyle}>Correo electrónico</label>
        <input
          style={inputStyle}
          type="email"
          placeholder="correo@ejemplo.com"
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Por favor, ingresa un correo válido.'
            }
          })}
        />
        {errors.email && <span style={errorStyle}>{errors.email.message}</span>}

        <label style={labelStyle}>Contraseña</label>
        <input
          style={inputStyle}
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register('password', { 
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres.'
            }
          })}
        />
        {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

        <button style={buttonStyle} type="submit">Entrar</button>
        
        <div style={{ marginTop: 12 }}>
          <a href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '0.95rem' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
      <Footer />
    </>
  );
};

export default Login;