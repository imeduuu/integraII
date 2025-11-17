import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import { FaPaw, FaChartLine, FaHeart } from 'react-icons/fa';

// Clases reutilizables para las tarjetas de métricas
const cardClasses = {
  container: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-8',
  box: 'bg-white rounded-xl shadow-md p-6 flex items-center transition-shadow hover:shadow-lg',
  icon: 'text-2xl text-green-700 mr-3',
  title: 'text-sm text-gray-600 mb-1',
  value: 'text-xl font-bold text-gray-900'
};

const UserMetricsCards = () => {
  const [metrics, setMetrics] = useState({ animalsCount: 0, sightingsCount: 0, adoptionsCount: 0, usersActive: 0 });
  const [adoptionsList, setAdoptionsList] = useState<any[]>([]);
  const [animalsList, setAnimalsList] = useState<any[]>([]);
  const [sightingsList, setSightingsList] = useState<any[]>([]);
  const [animalsError, setAnimalsError] = useState<string | null>(null);
  const [sightingsError, setSightingsError] = useState<string | null>(null);
  const [adoptionsError, setAdoptionsError] = useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<'none' | 'adoptions' | 'animals' | 'sightings'>('none');

  async function fetchMetrics() {
    try {
      const res = await fetch('/api/metrics');
      if (!res.ok) throw new Error('Failed metrics');
      const data = await res.json();
      setMetrics(data);
    } catch (e) {
      // noop for now
    }
  }

  async function fetchAdoptions(limit = 10) {
    try {
      const res = await fetch(`/api/adoptions?limit=${limit}`);
      console.log('/api/adoptions status', res.status);
      if (!res.ok) throw new Error('Failed adoptions');
      const data = await res.json();
      console.log('/api/adoptions data', data);
      setAdoptionsList(data);
      setAdoptionsError(null);
    } catch (e) {
      setAdoptionsList([]);
      setAdoptionsError((e as Error)?.message ?? 'Error fetching adoptions');
    }
  }

  async function fetchAnimals() {
    try {
      const res = await fetch('/api/animals');
      console.log('/api/animals status', res.status);
      if (!res.ok) throw new Error('Failed animals');
      const data = await res.json();
      console.log('/api/animals data', data);
      setAnimalsList(data);
      setAnimalsError(null);
    } catch (e) {
      setAnimalsList([]);
      setAnimalsError((e as Error)?.message ?? 'Error fetching animals');
    }
  }

  async function fetchSightings() {
    try {
      const res = await fetch('/api/sightings');
      console.log('/api/sightings status', res.status);
      if (!res.ok) throw new Error('Failed sightings');
      const data = await res.json();
      console.log('/api/sightings data', data);
      setSightingsList(data);
      setSightingsError(null);
    } catch (e) {
      setSightingsList([]);
      setSightingsError((e as Error)?.message ?? 'Error fetching sightings');
    }
  }

  useEffect(() => {
    fetchMetrics();
    const iv = setInterval(fetchMetrics, 15000); // polling cada 15s
    return () => clearInterval(iv);
  }, []);

  const handleCardClick = async (panel: 'adoptions' | 'animals' | 'sightings') => {
    if (selectedPanel === panel) {
      setSelectedPanel('none');
      return;
    }

    setSelectedPanel(panel);

    if (panel === 'adoptions') await fetchAdoptions(10);
    if (panel === 'animals') await fetchAnimals();
    if (panel === 'sightings') await fetchSightings();
  };

  return (
    <div className={cardClasses.container}>
      <div className={cardClasses.box} onClick={() => handleCardClick('animals')} style={{ cursor: 'pointer' }}>
        <FaPaw className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Animales registrados</p>
          <p className={cardClasses.value}>{metrics.animalsCount ?? 0}</p>
        </div>
      </div>
      <div className={cardClasses.box} onClick={() => handleCardClick('sightings')} style={{ cursor: 'pointer' }}>
        <FaChartLine className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Reportes enviados</p>
          <p className={cardClasses.value}>{metrics.sightingsCount ?? 0}</p>
        </div>
      </div>
      <div className={cardClasses.box} onClick={() => handleCardClick('adoptions')} style={{ cursor: 'pointer' }}>
        <FaHeart className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Adopciones completadas</p>
          <p className={cardClasses.value}>{metrics.adoptionsCount ?? 0}</p>
        </div>
      </div>
      {selectedPanel !== 'none' && (
        <div className="col-span-1 md:col-span-3 bg-white text-gray-900 rounded-xl shadow-md p-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">{selectedPanel === 'adoptions' ? 'Adopciones recientes' : selectedPanel === 'animals' ? 'Animales registrados' : 'Reportes / Avistamientos'}</h4>
            <div>
              <button className="text-sm text-blue-600 mr-2" onClick={() => setSelectedPanel('none')}>Cerrar</button>
            </div>
          </div>

          {selectedPanel === 'adoptions' && (
            adoptionsError ? (
              <p className="text-sm text-red-600">{adoptionsError}</p>
            ) : adoptionsList.length === 0 ? (
              <p className="text-sm text-gray-500">No hay adopciones recientes</p>
            ) : (
              <ul className="space-y-2 max-h-56 overflow-auto">
                {adoptionsList.map((a) => (
                  <li key={a.id_adopcion} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="text-sm font-medium">{a.animal?.nombre_animal ?? 'Sin nombre'}</div>
                      <div className="text-xs text-gray-500">Publicado: {new Date(a.fecha_publicacion).toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-gray-600">{a.disponible ? 'Disponible' : 'No disponible'}</div>
                  </li>
                ))}
              </ul>
            )
          )}

          {selectedPanel === 'animals' && (
            animalsError ? (
              <p className="text-sm text-red-600">{animalsError}</p>
            ) : animalsList.length === 0 ? (
              <p className="text-sm text-gray-500">No hay animales registrados</p>
            ) : (
              <ul className="space-y-2 max-h-56 overflow-auto">
                {animalsList.map((an) => (
                  <li key={an.id_animal} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="text-sm font-medium">{an.nombre_animal ?? 'Sin nombre'}</div>
                      <div className="text-xs text-gray-500">Estado: {an.estado_salud?.estado_salud ?? an.estado_general ?? 'N/A'}</div>
                    </div>
                    <div className="text-xs text-gray-600">Zona: {an.zona ?? '-'}</div>
                  </li>
                ))}
              </ul>
            )
          )}

          {selectedPanel === 'sightings' && (
            sightingsError ? (
              <p className="text-sm text-red-600">{sightingsError}</p>
            ) : sightingsList.length === 0 ? (
              <p className="text-sm text-gray-500">No hay reportes</p>
            ) : (
              <ul className="space-y-2 max-h-56 overflow-auto">
                {sightingsList.map((s) => (
                  <li key={s.id_avistamiento} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="text-sm font-medium">{s.descripcion ? s.descripcion.slice(0, 60) : 'Sin descripción'}</div>
                      <div className="text-xs text-gray-500">Fecha: {new Date(s.fecha_creacion).toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-gray-600">Zona: {s.zona ?? '-'}</div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserMetricsCards;
