import React from 'react';
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
  return (
    <div className={cardClasses.container}>
      <div className={cardClasses.box}>
        <FaPaw className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Animales registrados</p>
          <p className={cardClasses.value}>42</p>
        </div>
      </div>
      <div className={cardClasses.box}>
        <FaChartLine className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Reportes enviados</p>
          <p className={cardClasses.value}>15</p>
        </div>
      </div>
      <div className={cardClasses.box}>
        <FaHeart className={cardClasses.icon} />
        <div>
          <p className={cardClasses.title}>Adopciones completadas</p>
          <p className={cardClasses.value}>8</p>
        </div>
      </div>
    </div>
  );
};

export default UserMetricsCards;
