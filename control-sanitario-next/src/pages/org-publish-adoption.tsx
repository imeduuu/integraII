import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-publish-adoption.module.css";

type AdoptionFormData = {
  nombre: string;
  edad?: number;
  tipo: string;
  descripcion: string;
  foto?: FileList;
};

const OrgPublishAdoption = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionFormData>();

  const onSubmit = (data: AdoptionFormData) => {
    console.log("Datos enviados:", data);
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Publicar Adopción</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          
          {/* Nombre de la mascota */}
          <div>
            <label className={styles.label}>Nombre de la mascota</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ejemplo: Luna"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className={styles.error}>{errors.nombre.message}</p>
            )}
          </div>

          {/* Edad */}
          <div>
            <label className={styles.label}>Edad</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Ejemplo: 2"
              {...register("edad")}
            />
          </div>

          {/* Tipo */}
          <div>
            <label className={styles.label}>Tipo</label>
            <select
              className={styles.input}
              {...register("tipo", { required: "El tipo es obligatorio" })}
            >
              <option value="">Selecciona una opción</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
            {errors.tipo && (
              <p className={styles.error}>{errors.tipo.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="Describe la mascota..."
              {...register("descripcion", {
                required: "La descripción es obligatoria",
              })}
            />
            {errors.descripcion && (
              <p className={styles.error}>{errors.descripcion.message}</p>
            )}
          </div>

          {/* Foto */}
          <div>
            <label className={styles.label}>Foto (opcional)</label>
            <input className={styles.input} type="file" {...register("foto")} />
          </div>

          {/* Botón */}
          <button className={styles.button} type="submit">
            Publicar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default OrgPublishAdoption;
