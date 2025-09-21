import styles from "../styles/adopcion.module.css";

import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Formulario de solicitud de adopción para usuarios
// Este formulario puede ser accedido por cualquier usuario

const ANIMALES = [
  "Bella",
  "Coco",
  "Kira",
  "Luna",
  "Max",
  "Milo",
  "Nina",
  "Rocky",
  "Simba",
  "Toby",
  "Firulais",
];

type AdoptionRequestFormData = {
  animal: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
};

const Adopcion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionRequestFormData>();

  const onSubmit = (data: AdoptionRequestFormData) => {
    // Aquí iría la lógica para enviar la solicitud
    alert(`¡Solicitud de adopción enviada para ${data.animal}! Nos pondremos en contacto contigo.`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center" style={{background: '#eaf4ff'}}>
        <div className={styles.card}>
    <h2 className={styles.title}>Solicitud de Adopción</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
      <div className={styles.group}>
        <label className={styles.label}>Animal que quieres adoptar</label>
        <select
          className={styles.select}
          {...register("animal", { required: "Selecciona un animal" })}
        >
          <option value="">Selecciona un animal</option>
          {ANIMALES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {errors.animal && <p className="text-red-500 text-sm mt-1">{errors.animal.message}</p>}
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Nombre completo</label>
        <input
          className={styles.input}
          type="text"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Teléfono</label>
        <input
          className={styles.input}
          type="tel"
          {...register("telefono", { required: "El teléfono es obligatorio" })}
        />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Mensaje</label>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="¿Por qué quieres adoptar?"
          {...register("mensaje", { required: "El mensaje es obligatorio" })}
        />
        {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>}
      </div>
      <div className={styles.actions}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          Enviar solicitud
        </button>
      </div>
    </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Adopcion;
