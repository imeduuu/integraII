import React from 'react';
import InfoBox from './InfoBox';
import styles from '../styles/infoBox.module.css';
import { FaPaw, FaChartLine, FaHeart } from 'react-icons/fa';

const UserMetricsCards = () => {
  return (
    <div className={styles.infoGrid}>
      <InfoBox
        title="Animales registrados"
        value={42}
        icon={<FaPaw />}
        link="/animals"
      />
      <InfoBox
        title="Reportes enviados"
        value={15}
        icon={<FaChartLine />}
        link="/report"
      />
      <InfoBox
        title="Adopciones completadas"
        value={8}
        icon={<FaHeart />}
        link="/donations"
      />
    </div>
  );
};

export default UserMetricsCards;