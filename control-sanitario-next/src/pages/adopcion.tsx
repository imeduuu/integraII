
/**
 * Página de adopción de animales con formulario y proceso de confirmación
 */
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import { useNotification } from '../components/NotificationProvider';
import styles from '../styles/adopcion.module.css';
import AdoptionForm from '../components/AdoptionForm';
import ConfirmationModal from '../components/ConfirmationModal';

// Datos mock de animales disponibles para adopción
const animales = [
  {
    nombre: 'Bella', estado: 'Disponible', ubicacion: 'Monterrey', edad: '3 años', imagen: '/animals/dog3.webp',
  },
  {
    nombre: 'Coco', estado: 'Disponible', ubicacion: 'Tijuana', edad: '4 años', imagen: '/animals/dog4.webp',
  },
  {
    nombre: 'Kira', estado: 'Disponible', ubicacion: 'Mérida', edad: '2 años', imagen: '/animals/dog5.webp',
  },
  {
    nombre: 'Luna', estado: 'Disponible', ubicacion: 'CDMX', edad: '2 años', imagen: '/animals/dog2.webp',
  },
  {
    nombre: 'Max', estado: 'En proceso', ubicacion: 'Guadalajara', edad: '1 año', imagen: '/animals/dog6.webp',
  },
  {
    nombre: 'Milo', estado: 'En proceso', ubicacion: 'Cancún', edad: '3 años', imagen: '/animals/cat3.webp',
  },
  {
    nombre: 'Nina', estado: 'Disponible', ubicacion: 'Querétaro', edad: '5 años', imagen: '/animals/cat4.webp',
  },
  {
    nombre: 'Rocky', estado: 'Disponible', ubicacion: 'Puebla', edad: '4 años', imagen: '/animals/cat5.webp',
  },
  {
    nombre: 'Simba', estado: 'En proceso', ubicacion: 'Toluca', edad: '2 años', imagen: '/animals/cat6.webp',
  },
  {
    nombre: 'Toby', estado: 'Disponible', ubicacion: 'León', edad: '1 año', imagen: '/animals/cat7.webp',
  },
].sort((a, b) => a.nombre.localeCompare(b.nombre));

export default function Adopcion() {
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useNotification();
  
  const handleAdoptClick = (animal: any) => {
    setSelectedAnimal(animal);
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setShowModal(true); // abrir modal al enviar formulario
  };

  const handleConfirm = () => {
    console.log("Solicitud enviada:", { animal: selectedAnimal, ...formData });
    
    try {
      // Simulación: En producción, aquí harías la llamada a la API
      addToast(`✅ Solicitud de adopción de ${selectedAnimal?.nombre} enviada exitosamente`, 'success');
      addToast('Recibirás una respuesta en las próximas 48 horas.', 'info');
      
      setShowModal(false);
      setSelectedAnimal(null);
      setFormData(null);
    } catch (error) {
      addToast('Error al enviar la solicitud. Por favor intenta de nuevo.', 'error');
    }
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

