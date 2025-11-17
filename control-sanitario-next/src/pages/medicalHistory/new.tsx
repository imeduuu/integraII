import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/medical-history-test.module.css';

interface Animal {
  id_animal: number;
  nombre_animal: string;
  estado_general?: string;
  zona?: string;
}

export default function SelectAnimalPage() {
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);

  // Cargar lista de animales
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/animals');
        if (!response.ok) throw new Error('Error al cargar animales');
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error cargando animales:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnimals();
  }, []);

  // Filtrar animales basado en búsqueda y zona
  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const matchesSearch =
        animal.nombre_animal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.id_animal.toString().includes(searchTerm);
      
      const matchesZone = !selectedZone || animal.zona === selectedZone;
      
      return matchesSearch && matchesZone;
    });
  }, [animals, searchTerm, selectedZone]);

  // Obtener lista única de zonas
  const zones = useMemo(() => {
    const uniqueZones = new Set(animals.map((a) => a.zona).filter(Boolean));
    return Array.from(uniqueZones).sort();
  }, [animals]);

  const handleSelectAnimal = (animalId: number) => {
    setSelectedAnimalId(animalId);
    router.push(`/medicalHistory/${animalId}/new`);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <h1 className={styles.title}>Selecciona un Animal</h1>
        <button className={styles.button} onClick={() => router.back()}>
          Volver
        </button>
      </div>

      {/* Búsqueda y filtros */}
      {!loading && animals.length > 0 && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
              Buscar por nombre o ID
            </label>
            <input
              type="text"
              placeholder="Escribe el nombre o ID del animal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
              style={{ width: '100%' }}
            />
          </div>
          
          {zones.length > 0 && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Filtrar por zona
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className={styles.input}
                style={{ width: '100%' }}
              >
                <option value="">Todas las zonas</option>
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {loading && <p className={styles.muted}>Cargando animales...</p>}
      
      {error && (
        <p className={styles.muted} style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}

      {!loading && !error && animals.length === 0 && (
        <p className={styles.muted}>No hay animales registrados</p>
      )}

      {!loading && !error && animals.length > 0 && filteredAnimals.length === 0 && (
        <p className={styles.muted}>No hay animales que coincidan con los filtros</p>
      )}

      {!loading && !error && filteredAnimals.length > 0 && (
        <>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
            Mostrando {filteredAnimals.length} de {animals.length} animales
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {filteredAnimals.map((animal) => (
              <div
                key={animal.id_animal}
                onClick={() => handleSelectAnimal(animal.id_animal)}
                style={{
                  padding: '20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedAnimalId === animal.id_animal ? '#dbeafe' : 'white',
                  borderColor: selectedAnimalId === animal.id_animal ? '#3b82f6' : '#e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = selectedAnimalId === animal.id_animal ? '#3b82f6' : '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '10px'
                }}>
                  🐾 {animal.nombre_animal}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '5px'
                }}>
                  🆔 ID: {animal.id_animal}
                </div>
                {animal.estado_general && (
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '5px'
                  }}>
                    📊 Estado: {animal.estado_general}
                  </div>
                )}
                {animal.zona && (
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '10px'
                  }}>
                    📍 Zona: {animal.zona}
                  </div>
                )}
                <button
                  className={styles.button}
                  style={{ marginTop: '15px', width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAnimal(animal.id_animal);
                  }}
                >
                  ➕ Agregar Historial
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

