
/**
 * Página de adopción de animales con formulario y proceso de confirmación
 */
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import styles from '../styles/adopcion.module.css';
import AdoptionForm from '../components/AdoptionForm';
import ConfirmationModal from '../components/ConfirmationModal';

// Datos mock de animales disponibles para adopción
const animales = [
  {
    nombre: 'Bella', estado: 'Disponible', ubicacion: 'Monterrey', edad: '3 años', imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Coco', estado: 'Disponible', ubicacion: 'Tijuana', edad: '4 años', imagen: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Kira', estado: 'Disponible', ubicacion: 'Mérida', edad: '2 años', imagen: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Luna', estado: 'Disponible', ubicacion: 'CDMX', edad: '2 años', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Max', estado: 'En proceso', ubicacion: 'Guadalajara', edad: '1 año', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Milo', estado: 'En proceso', ubicacion: 'Cancún', edad: '3 años', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Nina', estado: 'Disponible', ubicacion: 'Querétaro', edad: '5 años', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Rocky', estado: 'Disponible', ubicacion: 'Puebla', edad: '4 años', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Simba', estado: 'En proceso', ubicacion: 'Toluca', edad: '2 años', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
  {
    nombre: 'Toby', estado: 'Disponible', ubicacion: 'León', edad: '1 año', imagen: 'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
  },
].sort((a, b) => a.nombre.localeCompare(b.nombre));

export default function Adopcion() {
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleAdoptClick = (animal: any) => {
    setSelectedAnimal(animal);
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setShowModal(true); // abrir modal al enviar formulario
  };

  const handleConfirm = () => {
    console.log("Solicitud enviada:", { animal: selectedAnimal, ...formData });
    setShowModal(false);
    setSelectedAnimal(null);
    setFormData(null);
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Animales en Adopción</h1>

        {!selectedAnimal ? (
        <div className={styles.grid}>
          {animales.map((animal, idx) => (
            <div className={styles.card} key={idx}>
              <img src={animal.imagen} alt={animal.nombre} className={styles.img} />
              <div className={styles.nombre}>{animal.nombre}</div>
              <div className={styles.info}><span>Estado:</span> {animal.estado}</div>
              <div className={styles.info}><span>Ubicación:</span> {animal.ubicacion}</div>
              <div className={styles.info}><span>Edad:</span> {animal.edad}</div>
               
              {animal.estado === 'Disponible' && (
                // Migración: Se reemplaza el botón nativo por el componente Button UI estándar.
                <Button
                  className={styles.btn}
                  onClick={() => handleAdoptClick(animal)}
                >
                  Solicitar Adopción
                </Button>
              )}
            </div>
          ))}
        </div>
        ) : (
          <AdoptionForm animal={selectedAnimal} onSubmit={handleFormSubmit} />
        )}

        {showModal && (
          <ConfirmationModal
            title="Confirmar solicitud de adopción"
            animal={selectedAnimal}
            formData={formData}
            onCancel={() => setShowModal(false)}
            onConfirm={handleConfirm}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

