import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

  const onSubmit = (data: FormData) => {
    console.log('Datos del formulario:', data);
    alert('Perfil actualizado correctamente');
    reset();
  };

  return (
    <>
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
              <input
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
              <input
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
              <input
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
              <button
                type="submit"
                className={styles.submitButton}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className={styles.resetButton}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EditProfile;
