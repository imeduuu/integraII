/**
 * Página de registro de nuevos usuarios con validación de formularios
 */
import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotification } from '../components/NotificationProvider';

interface RegisterFormInputs {
  nombre: string; // Nombre completo del usuario
  email: string; // Email único
  password: string; // Contraseña
  confirm: string; // Confirmación de contraseña
}

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '20px auto',
  padding: '32px',
  background: '#f3f4f6',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  width: '90%',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600,
};

const errorStyle: React.CSSProperties = {
  color: '#e11d48',
  fontSize: '13px',
  marginTop: '-8px',
  marginBottom: '16px',
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { addToast } = useNotification();
  const [mensaje, setMensaje] = React.useState('');
  const [acceptedPolicy, setAcceptedPolicy] = React.useState(false);
  const password = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log('Datos del formulario:', data);

    try {
      addToast('¡Registro exitoso! Bienvenido a la plataforma.', 'success');
      setMensaje('');
      // Redireccionar o limpiar campos si se desea
    } catch (error) {
      addToast('Error al registrar usuario. Por favor intenta de nuevo.', 'error');
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
          <h2
            className="text-responsive-h2 font-bold leading-snug"
            style={{ marginBottom: 20 }}
          >
            Crear Cuenta
          </h2>

          {/* Campo Nombre */}
          <label className="tablet:text-lg" style={labelStyle}>
            Nombre
          </label>
          <Input
            type="text"
            placeholder="Tu nombre"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('nombre', { required: 'El nombre es obligatorio' })}
          />
          {errors.nombre && <span style={errorStyle}>{errors.nombre.message}</span>}

          {/* Campo Email */}
          <label className="tablet:text-lg" style={labelStyle}>
            Correo electrónico
          </label>
          <Input
            type="email"
            placeholder="correo@ejemplo.com"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor, ingresa un correo válido.',
              },
            })}
          />
          {errors.email && <span style={errorStyle}>{errors.email.message}</span>}

          {/* Campo Contraseña */}
          <label className="tablet:text-lg" style={labelStyle}>
            Contraseña
          </label>
          <Input
            type="password"
            placeholder="Mínimo 6 caracteres"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres.',
              },
            })}
          />
          {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

          {/* Confirmar Contraseña */}
          <label className="tablet:text-lg" style={labelStyle}>
            Confirmar contraseña
          </label>
          <Input
            type="password"
            placeholder="Repite tu contraseña"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('confirm', {
              required: 'Confirma tu contraseña',
              validate: (value) => value === password || 'Las contraseñas no coinciden.',
            })}
          />
          {errors.confirm && <span style={errorStyle}>{errors.confirm.message}</span>}

          {/* Checkbox de política */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="acceptPolicy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            <label
              htmlFor="acceptPolicy"
              style={{ fontSize: '0.9rem', color: '#4b5563' }}
            >
              Acepto la{' '}
              <a
                href="/politica-privacidad"
                style={{ color: '#2563eb', textDecoration: 'underline' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>
            </label>
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            style={{ width: '100%', marginTop: 8 }}
            className="tablet-button tablet:text-lg touch-feedback"
            disabled={!acceptedPolicy}
          >
            Registrarse
          </Button>

          {mensaje && (
            <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
