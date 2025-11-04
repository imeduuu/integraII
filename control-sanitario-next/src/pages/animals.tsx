  import React, { useState, useEffect } from 'react';
  import Navbar from '../components/Navbar';
  import Head from 'next/head';
  import Footer from '../components/Footer';
  import AnimalCard from '../components/AnimalCard';
  import Button from '../components/ui/Button';
  import AnimalGallery from "../components/AnimalGallery";
  // ...import eliminado: Map...
  import { animalsData } from '../utils/AnimalsData';
  import styles from '../styles/animals.module.css';
  import { useTheme } from '../context/ThemeContext';

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '1.08rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(37,99,235,0.12)',
    transition: 'transform 0.2s',
  };

  type Animal = {
    id: number;
    nombre: string;
    especie: string;
    estado_general: string;
    zona: string;
    images?: string[];
  };

  const Animals = () => {
    const [animals, setAnimals] = useState<Animal[]>(animalsData);
    const [estado, setEstado] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [especie, setEspecie] = useState('');
    // ...eliminado showMap para mapa antiguo...

    // Listas únicas para los filtros
    const estados = Array.from(new Set(animals.map(a => a.estado_general)));
    const ubicaciones = Array.from(new Set(animals.map(a => a.zona)));
    const especies = Array.from(new Set(animals.map(a => a.especie)));

    // Filtrado dinámico
    const filtered = animals.filter(a =>
      (estado ? a.estado_general === estado : true) &&
      (ubicacion ? a.zona === ubicacion : true) &&
      (especie ? a.especie === especie : true)
    );

    const { theme } = useTheme();
    return (
      <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Animales en Adopción y Rescatados - Control Sanitario",
              "url": "https://HuellaSegura.vercel.app/animales",
              "description": "Listado de animales disponibles para adopción y rescatados, con filtros por estado, especie y ubicación.",
              "publisher": {
                "@type": "Organization",
                "name": "Control Sanitario",
                "logo": "https://HuellaSegura.vercel.app/logo.png"
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": filtered.map((animal, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": animal.nombre,
                  "url": `https://HuellaSegura.vercel.app/animales#${animal.id}`,
                  "item": {
                    "@type": "Thing",
                    "name": animal.nombre,
                    "additionalProperty": [
                      { "@type": "PropertyValue", "name": "Especie", "value": animal.especie },
                      { "@type": "PropertyValue", "name": "Estado", "value": animal.estado_general },
                      { "@type": "PropertyValue", "name": "Ubicación", "value": animal.zona },
                      { "@type": "PropertyValue", "name": "Imagen", "value": Array.isArray(animal.images) ? animal.images[0] : animal.images || "/animals/dog1.webp" }
                    ]
                  }
                }))
              }
            })
          }}
        />
      </Head>
      
        <Navbar />
        <main className={`${styles.root} ${theme === 'dark' ? styles.dark : ''}`}>
          <h2 className={styles.title}>Animales en Adopción y Rescatados</h2>
          
          <AnimalGallery
            images={[
              "/animals/dog4.webp",
              "/animals/cat3.webp",
              "/animals/cat4.webp",
            ]}
          />


          <div className={styles.filters}>
            <select
              className={styles.select}
              value={estado}
              onChange={e => setEstado(e.target.value)}
              aria-label="Filtrar por estado"
            >
              <option value="">Todos los estados</option>
              {estados.map((est, i) => <option key={i} value={est}>{est}</option>)}
            </select>

            <select
              className={styles.select}
              value={ubicacion}
              onChange={e => setUbicacion(e.target.value)}
              aria-label="Filtrar por ubicación"
            >
              <option value="">Todas las ubicaciones</option>
              {ubicaciones.map((ubi, i) => <option key={i} value={ubi}>{ubi}</option>)}
            </select>

            <select
              className={styles.select}
              value={especie}
              onChange={e => setEspecie(e.target.value)}
              aria-label="Filtrar por especie"
            >
              <option value="">Todas las especies</option>
              {especies.map((esp, i) => <option key={i} value={esp}>{esp}</option>)}
            </select>
          </div>

          <div className={styles.grid}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>No hay animales con ese filtro.</div>
            ) : (
              filtered.map(animal => (
                <AnimalCard
                  key={animal.id}
                  animalId={animal.id.toString()}
                  nombre={animal.nombre}
                  estado_general={animal.estado_general}
                  zona={animal.zona}
                  images={Array.isArray(animal.images) ? animal.images : animal.images ? [animal.images] : ["/animals/dog1.webp"]}
                />
              ))
            )}
          </div>

          {/* Mapa eliminado, solo disponible en /mapa */}
        </main>
        <Footer />
      </>
    );
  };

  export default Animals;
