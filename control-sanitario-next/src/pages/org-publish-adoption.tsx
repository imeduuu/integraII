
import React, { useEffect, useState } from "react";
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-publish-adoption.module.css";
import ProtectedRoute from "../components/ProtectedRoute";
import { getSpecies, type Species } from "../services/species_form";

type AdoptionFormData = {
  nombre: string;
  edad?: number;
  tipo: string;
  descripcion: string;
  foto?: FileList;
};


const OrgPublishAdoption = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loadingSpecies, setLoadingSpecies] = useState<boolean>(false);
  const [errorSpecies, setErrorSpecies] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionFormData>();

  const onSubmit = (data: AdoptionFormData) => {
    console.log("Datos enviados:", data);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingSpecies(true);
      setErrorSpecies(null);
      try {
        const list = await getSpecies();
        if (mounted) setSpecies(list);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido al cargar especies";
        console.error("Error cargando especies:", err);
        if (mounted) setErrorSpecies(msg);
      } finally {
        if (mounted) setLoadingSpecies(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProtectedRoute allowedRoles={["org"]}>
      <>
        <Navbar />
        <main className={styles.container}>
          <h1 className={styles.title}>Publicar Adopción</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre de la mascota */}
            <div>
              <label className={styles.label}>Nombre de la mascota</label>
              {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
              <Input
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
              <Input
                className={styles.input}
                type="number"
                placeholder="Ejemplo: 2"
                {...register("edad")}
              />
            </div>

            {/* Especie */}
            <div>
              <label className={styles.label}>Especie</label>
              {loadingSpecies ? (
                <p className={styles.helper}>Cargando especies…</p>
              ) : errorSpecies ? (
                <p className={styles.error}>No se pudo cargar la lista de especies. {errorSpecies}</p>
              ) : (
                <select
                  className={styles.input}
                  {...register("tipo", { required: "La especie es obligatoria" })}
                >
                  <option value="">Selecciona una especie</option>
                  {species.map((sp) => (
                    <option key={sp.id_especie} value={String(sp.id_especie)}>
                      {sp.nombre_especie}
                    </option>
                  ))}
                </select>
              )}
              {errors.tipo && <p className={styles.error}>{errors.tipo.message}</p>}
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
              <Input className={styles.input} type="file" {...register("foto")} />
            </div>

            {/* Botón */}
            {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
            <Button className={styles.button} type="submit">Publicar</Button>
          </form>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  );
};

export default OrgPublishAdoption;
