/**
 * Página de registro de nuevos usuarios con validación de formularios
 */
import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RegisterFormInputs {
  nombre: string; // Nombre completo del usuario
  email: string; // Email único
  password: string; // Contraseña
  confirm: string; // Confirmación de contraseña
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

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const [mensaje, setMensaje] = React.useState('');
  const password = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log('Datos del formulario:', data);
    setMensaje('Registro simulado (sin backend)');
  };

  return (
    <>
      <Navbar />
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Crear Cuenta</h2>
        
        <label style={labelStyle}>Nombre</label>
        {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
        <Input
          type="text"
          placeholder="Tu nombre"
          {...register('nombre', { required: 'El nombre es obligatorio' })}
        />
        {errors.nombre && <span style={errorStyle}>{errors.nombre.message}</span>}
        
        <label style={labelStyle}>Correo electrónico</label>
        <Input
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
        <Input
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
        
        <label style={labelStyle}>Confirmar contraseña</label>
        <Input
          type="password"
          placeholder="Repite tu contraseña"
          {...register('confirm', {
            required: 'Confirma tu contraseña',
            validate: value => value === password || 'Las contraseñas no coinciden.'
          })}
        />
        {errors.confirm && <span style={errorStyle}>{errors.confirm.message}</span>}

  {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
  <Button type="submit" style={{ width: '100%', marginTop: 8 }}>Registrarse</Button>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
      <Footer />
    </>
  );
};

export default Register;