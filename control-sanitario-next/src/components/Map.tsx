import "../styles/mapForm.module.css";
import Tooltip from "./Tooltip";

import React, { useState } from "react";

type Elemento = {
  id: number;
  especie: string;
  estado: string;
  zona: string;
  coords: [number, number];
};

// Datos mock
const elementosMock: Elemento[] = [
  { id: 1, especie: "Perro", estado: "Activo", zona: "Norte", coords: [-38.73, -72.60] },
  { id: 2, especie: "Gato", estado: "Inactivo", zona: "Sur", coords: [-38.75, -72.65] },
  { id: 3, especie: "Ave", estado: "Activo", zona: "Centro", coords: [-38.74, -72.63] },
  { id: 4, especie: "Perro", estado: "Rescatado", zona: "Sur", coords: [-38.76, -72.67] },
  { id: 5, especie: "Gato", estado: "Rescatado", zona: "Centro", coords: [-38.72, -72.64] },
];

/**
 * Mapa interactivo que muestra la ubicación de Temuco, Araucanía
 * Utilizado para mostrar ubicaciones de animales y refugios
 */
const Map: React.FC = () => {
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroZona, setFiltroZona] = useState("");

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
    marginTop: "24px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  };

  // Función para obtener valores únicos de un campo
  const getUniqueValues = (field: keyof Elemento) =>
    Array.from(new Set(elementosMock.map((el) => el[field])));

  // Filtrado dinámico
  const elementosFiltrados = elementosMock.filter((el) => {
    return (
      (filtroEspecie ? el.especie === filtroEspecie : true) &&
      (filtroEstado ? el.estado === filtroEstado : true) &&
      (filtroZona ? el.zona === filtroZona : true)
    );
  });

  return (
   <div>
  {/* Filtros */}
  <div className="map-filters">
    <select
      value={filtroEspecie}
      onChange={(e) => setFiltroEspecie(e.target.value)}
    >
      <option value="">Todas las especies</option>
      {getUniqueValues("especie").map((especie) => (
        <option key={String(especie)} value={String(especie)}>
          {especie}
        </option>
      ))}
    </select>

    <select
      value={filtroEstado}
      onChange={(e) => setFiltroEstado(e.target.value)}
    >
      <option value="">Todos los estados</option>
      {getUniqueValues("estado").map((estado) => (
        <option key={String(estado)} value={String(estado)}>
          {estado}
        </option>
      ))}
    </select>

    <select
      value={filtroZona}
      onChange={(e) => setFiltroZona(e.target.value)}
    >
      <option value="">Todas las zonas</option>
      {getUniqueValues("zona").map((zona) => (
        <option key={String(zona)} value={String(zona)}>
          {zona}
        </option>
      ))}
    </select>
  </div>

  {/* Mapa */}
  <div className="map-container">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105642.40346423266!2d-72.695372!3d-38.7396505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614c7d0b94bcd6f%3A0x44e62a1db2d4bb51!2sTemuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses-419!2scl!4v1693000000000!5m2!1ses-419!2scl"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="Mapa de Temuco"
    ></iframe>
  </div>

  {/* Lista de resultados */}
  <div className="map-results">
    {elementosFiltrados.length > 0 ? (
      <ul>
        {elementosFiltrados.map((el) => (
          <li key={el.id}>
            <strong>{el.especie}</strong> | {el.estado} | {el.zona} <br />
            Coordenadas: {el.coords[0]}, {el.coords[1]}
          </li>
        ))}
      </ul>
    ) : (
      <p>No hay resultados para los filtros seleccionados</p>
    )}
  </div>
</div>

  );
};

export default Map;
