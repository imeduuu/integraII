import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import styles from '../styles/adopcion.module.css';

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
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Animales en Adopción</h1>
        <div className={styles.grid}>
          {animales.map((animal, idx) => (
            <div className={styles.card} key={idx}>
              <img src={animal.imagen} alt={animal.nombre} className={styles.img} />
              <div className={styles.nombre}>{animal.nombre}</div>
              <div className={styles.info}><span>Estado:</span> {animal.estado}</div>
              <div className={styles.info}><span>Ubicación:</span> {animal.ubicacion}</div>
              <div className={styles.info}><span>Edad:</span> {animal.edad}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
