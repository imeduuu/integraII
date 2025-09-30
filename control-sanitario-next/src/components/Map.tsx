/**
 * Componente de mapa embebido de Google Maps centrado en Temuco
 */
import React from 'react';

/**
 * Mapa interactivo que muestra la ubicación de Temuco, Araucanía
 * Utilizado para mostrar ubicaciones de animales y refugios
 */
const Map: React.FC = () => {
  const mapContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '500px',
    marginTop: '24px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  };

  return (
    <div style={mapContainerStyle}>
      {/* Google Maps iframe centrado en Temuco */}
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
  );
};

export default Map;
