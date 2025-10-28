/**
 * Página de inicio de sesión con validación de formularios
 */
import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotification } from '../components/NotificationProvider';

interface LoginFormInputs {
  email: string; // Email del usuario
  password: string; // Contraseña
}

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '20px auto',
  padding: '32px',
  background: '#f3f4f6',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  width: '90%'
};

// Media query para tablets se maneja con clase CSS
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

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      console.log('Datos del formulario:', data);
      
      // Simulación de validación (reemplazar con API real)
      if (data.email === 'error@test.com') {
        addToast('Credenciales incorrectas. Verifica tu correo y contraseña.', 'error');
        return;
      }
      
      // Simulación de login exitoso
      setMensaje('Login simulado (sin backend)');
      addToast('¡Bienvenido! Inicio de sesión exitoso.', 'success');
      
      // Aquí iría la redirección después del login
      // router.push('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      addToast('Error al iniciar sesión. Por favor, intenta nuevamente.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center tablet:min-h-[calc(100vh-250px)]">
        <form 
          style={formStyle} 
          onSubmit={handleSubmit(onSubmit)} 
          noValidate
          className="tablet:max-w-xl tablet:p-10"
        >
        <h2 className="tablet:text-3xl" style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Iniciar Sesión</h2>
        
        <label className="tablet:text-lg" style={labelStyle}>Correo electrónico</label>
        {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
        <Input
          type="email"
          placeholder="correo@ejemplo.com"
          className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Por favor, ingresa un correo válido.'
            }
          })}
        />
        {errors.email && <span style={errorStyle}>{errors.email.message}</span>}

        <label className="tablet:text-lg" style={labelStyle}>Contraseña</label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
          {...register('password', { 
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres.'
            }
          })}
        />
        {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

  {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
  <Button 
    type="submit" 
    style={{ width: '100%', marginTop: 8 }}
    className="tablet-button tablet:text-lg touch-feedback"
  >
    Entrar
  </Button>
        
        <div style={{ marginTop: 12 }}>
          <a href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '0.95rem' }} className="tablet:text-base">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;