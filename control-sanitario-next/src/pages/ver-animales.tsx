import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/animals.module.css";
import { useTheme } from "../context/ThemeContext";
import { getFullAnimals } from "../services/animal_form";

type Animal = {
  id: number;
  nombre: string;
  especie: string;
  estado_general: string;
  zona: string;
};

const VerAnimales = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getFullAnimals();
        if (Array.isArray(data)) {
          setAnimals(data as Animal[]);
        } else {
          console.warn("getFullAnimals returned non-array:", data);
          setAnimals([]);
        }
      } catch (err) {
        console.error("Error al cargar animales:", err);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <>
      <Head>
        <title>Animales Registrados - Control Sanitario</title>
      </Head>

      <Navbar />

      <main className={`${styles.root} ${theme === "dark" ? styles.dark : ""}`}>
        <h2 className={styles.title}>Animales Registrados</h2>

        {animals.length === 0 ? (
          <div className={styles.noResults}>No hay animales registrados.</div>
        ) : (
          <ul className={styles.list}>
            {animals.map((animal) => (
              <li key={animal.id} className={styles.item}>
                <strong>🆔 ID:</strong> {animal.id} <br />
                <strong>🐾 Nombre:</strong> {animal.nombre || "Desconocido"} <br />
                <strong>🧬 Especie:</strong> {animal.especie || "Desconocida"} <br />
                <strong>❤️ Estado:</strong> {animal.estado_general || "Sin estado"} <br />
                <strong>📍 Zona:</strong> {animal.zona || "No especificada"}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
};

export default VerAnimales;
