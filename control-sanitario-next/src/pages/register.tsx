/**
 * Página de registro de nuevos usuarios con llamada real a API
 */
import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotification } from '../components/NotificationProvider';

interface RegisterFormInputs {
  nombre_usuario: string;
  apellido_paterno?: string;
  email: string;
  password: string;
  confirm: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  id?: number;
}

const formStyle: React.CSSProperties = {
  maxWidth: '500px',
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

const successBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: '16px',
  background: '#d1fae5',
  border: '1px solid #6ee7b7',
  borderRadius: '8px',
  color: '#047857',
  fontWeight: 600,
};

const errorBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: '16px',
  background: '#fee2e2',
  border: '1px solid #fca5a5',
  borderRadius: '8px',
  color: '#dc2626',
  fontWeight: 600,
};

const infoBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: '16px',
  background: '#dbeafe',
  border: '1px solid #93c5fd',
  borderRadius: '8px',
  color: '#1e40af',
  fontSize: '13px',
  lineHeight: '1.5',
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();
  const { addToast } = useNotification();
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const password = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      setApiResponse(null);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: data.nombre_usuario,
          apellido_paterno: data.apellido_paterno || null,
          email: data.email,
          password: data.password,
        }),
      });

      const result: ApiResponse = await response.json();
      setApiResponse(result);

      if (result.success) {
        addToast('¡Registro exitoso! Bienvenido a la plataforma.', 'success');
        reset();
        setAcceptedPolicy(false);
      } else {
        addToast(result.message || 'Error al registrar usuario.', 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setApiResponse({
        success: false,
        message: errorMsg,
      });
      addToast('Error al registrar usuario. Por favor intenta de nuevo.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center tablet:min-h-[calc(100vh-250px)] py-8">
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

          {/* Campo Nombre Usuario */}
          <label className="tablet:text-lg" style={labelStyle}>
            Nombre de usuario *
          </label>
          <Input
            type="text"
            placeholder="Tu nombre de usuario"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('nombre_usuario', {
              required: 'El nombre de usuario es obligatorio',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
            })}
          />
          {errors.nombre_usuario && (
            <span style={errorStyle}>{errors.nombre_usuario.message}</span>
          )}

          {/* Campo Apellido Paterno */}
          <label className="tablet:text-lg" style={labelStyle}>
            Apellido paterno
          </label>
          <Input
            type="text"
            placeholder="Tu apellido paterno (opcional)"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('apellido_paterno')}
          />

          {/* Campo Email */}
          <label className="tablet:text-lg" style={labelStyle}>
            Correo electrónico *
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
            Contraseña *
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
            Confirmar contraseña *
          </label>
          <Input
            type="password"
            placeholder="Repite tu contraseña"
            className="tablet:text-lg tablet:py-3 tablet:min-h-[48px]"
            {...register('confirm', {
              required: 'Confirma tu contraseña',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden.',
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
            style={{ width: '100%', marginTop: 16 }}
            className="tablet-button tablet:text-lg touch-feedback"
            disabled={!acceptedPolicy || isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Button>

          {/* Botón para crear cuenta con Google (flujo OAuth) */}
          <a href="/api/auth/google" aria-label="Crear cuenta con Google" style={{ textDecoration: 'none' }}>
            <Button
              type="button"
              style={{ width: '100%', marginTop: 12, background: '#ffffff', color: '#111827', border: '1px solid #e5e7eb' }}
              className="tablet-button touch-feedback"
            >
              Crear con cuenta de Google
            </Button>
          </a>

          {/* Respuesta del API */}
          {apiResponse && (
            <div style={apiResponse.success ? successBoxStyle : errorBoxStyle}>
              <div style={{ marginBottom: 8 }}>
                {apiResponse.success ? '✓' : '✗'} {apiResponse.message}
              </div>
              {apiResponse.success && apiResponse.id && (
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  ID de usuario: {apiResponse.id}
                </div>
              )}
            </div>
          )}

          {/* Info sobre campos requeridos */}
          <div style={infoBoxStyle}>
            * Campos obligatorios. Los datos se envían directamente a la base de datos
            mediante la API /api/auth/register
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
