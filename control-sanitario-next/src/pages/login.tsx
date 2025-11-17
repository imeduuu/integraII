/**
 * Página de inicio de sesión con integración real de API
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotification } from '../components/NotificationProvider';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  requires2FA?: boolean;
  email?: string;
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600
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

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const { addToast } = useNotification();
  const [apiResponse, setApiResponse] = useState<LoginResponse | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setApiResponse(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result: LoginResponse = await response.json();
      setApiResponse(result);

      if (result.success) {
        addToast('¡Bienvenido! Inicio de sesión exitoso.', 'success');
        
        // Guardar token en localStorage o sessionStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('email', data.email);
        }

        // Redireccionar después de 1 segundo
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        addToast(result.message || 'Error al iniciar sesión.', 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setApiResponse({
        success: false,
        message: errorMsg,
      });
      addToast('Error al iniciar sesión. Por favor, intenta nuevamente.', 'error');
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
          <h2 className="text-responsive-h2 font-bold leading-snug" style={{ marginBottom: 20 }}>
            Iniciar Sesión
          </h2>
        
          <label className="text-responsive-body font-semibold" style={labelStyle}>
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
                message: 'Por favor, ingresa un correo válido.'
              }
            })}
          />
          {errors.email && <span style={errorStyle}>{errors.email.message}</span>}

          <label className="text-responsive-body font-semibold" style={labelStyle}>
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
                message: 'La contraseña debe tener al menos 6 caracteres.'
              }
            })}
          />
          {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="acceptPolicy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            <label htmlFor="acceptPolicy" style={{ fontSize: '0.9rem', color: '#4b5563' }}>
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

          <Button 
            type="submit" 
            style={{ width: '100%', marginTop: 16 }}
            className="tablet-button tablet:text-lg touch-feedback"
            disabled={!acceptedPolicy || isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        
          <div style={{ marginTop: 12 }}>
            <a href="/forgot-password" className="text-responsive-small font-medium hover:underline" style={{ color: '#2563eb' }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#4b5563', marginTop: 10 }}>
            Al iniciar sesión aceptas nuestra{' '}
            <a
              href="/politica-privacidad"
              style={{ color: '#2563eb', textDecoration: 'underline' }}
            >
              Política de Privacidad
            </a>.
          </p>

          {/* Respuesta del API */}
          {apiResponse && (
            <div style={apiResponse.success ? successBoxStyle : errorBoxStyle}>
              <div style={{ marginBottom: 8 }}>
                {apiResponse.success ? '✓' : '✗'} {apiResponse.message}
              </div>
            </div>
          )}
      </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;