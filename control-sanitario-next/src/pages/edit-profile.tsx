import React from 'react';
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Head from 'next/head';
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationProvider';
import styles from '../styles/edit-profile.module.css';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const { addToast } = useNotification();

  const onSubmit = (data: FormData) => {
    console.log('Datos del formulario:', data);
    
    try {
      // Simulación: En producción, aquí harías la llamada a la API
      addToast('✅ Perfil actualizado correctamente', 'success');
      // reset(); // Opcional: descomentar si quieres limpiar el formulario
    } catch (error) {
      addToast('Error al actualizar el perfil. Por favor intenta de nuevo.', 'error');
    }
  };

  return (
    <>
    <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Editar Perfil - Control Sanitario",
              "url": "https://HuellaSegura.vercel.app/perfil",
              "description": "Página para que los usuarios puedan actualizar su información personal dentro de la plataforma Control Sanitario.",
              "publisher": {
                "@type": "Organization",
                "name": "Control Sanitario",
                "logo": "https://HuellaSegura.vercel.app/logo.png"
              }
            })
          }}
        />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className={styles.container}>
          <h1 className={styles.title}>
            Editar Perfil
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Campo Nombre */}
            <div className={styles.field}>
              <label className={styles.label}>
                Nombre completo
              </label>
              {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
              <Input
                type="text"
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres'
                  }
                })}
                className={styles.input}
                placeholder="Ingresa tu nombre completo"
              />
              {errors.nombre && (
                <p className={styles.error}>{errors.nombre.message}</p>
              )}
            </div>

            {/* Campo Email */}
            <div className={styles.field}>
              <label className={styles.label}>
                Correo electrónico
              </label>
              <Input
                type="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'El email no es válido'
                  }
                })}
                className={styles.input}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            {/* Campo Teléfono */}
            <div className={styles.field}>
              <label className={styles.label}>
                Teléfono
              </label>
              <Input
                type="tel"
                {...register('telefono', {
                  required: 'El teléfono es obligatorio',
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: 'El teléfono solo puede contener números, espacios y símbolos (+, -, (), )'
                  },
                  minLength: {
                    value: 10,
                    message: 'El teléfono debe tener al menos 10 dígitos'
                  }
                })}
                className={styles.input}
                placeholder="555-123-4567"
              />
              {errors.telefono && (
                <p className={styles.error}>{errors.telefono.message}</p>
              )}
            </div>

            {/* Campo Dirección */}
            <div className={styles.field}>
              <label className={styles.label}>
                Dirección
              </label>
              <textarea
                {...register('direccion', {
                  required: 'La dirección es obligatoria',
                  minLength: {
                    value: 10,
                    message: 'La dirección debe tener al menos 10 caracteres'
                  }
                })}
                rows={3}
                className={styles.textarea}
                placeholder="Calle, número, colonia, ciudad, estado, código postal"
              />
              {errors.direccion && (
                <p className={styles.error}>{errors.direccion.message}</p>
              )}
            </div>

            {/* Botones */}
            <div className={styles.buttonContainer}>
              {/* Migración: Se reemplazan los botones nativos por el componente Button UI estándar. */}
              <Button type="submit" className={styles.submitButton}>Guardar Cambios</Button>
              <Button type="button" onClick={() => reset()} className={styles.resetButton} variant="secondary">Limpiar</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EditProfile;
