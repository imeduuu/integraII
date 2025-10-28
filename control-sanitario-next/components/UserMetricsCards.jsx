import React from 'react';
import InfoBox from './InfoBox';
import styles from '../styles/infoBox.module.css';
import Icon from './ui/Icon';

const UserMetricsCards = () => (
  <div className={styles.infoGrid}>
    <InfoBox title="Animales registrados" value={42} icon={<Icon name="paw" className="text-2xl" />} link="/animals" />
    <InfoBox title="Reportes enviados" value={15} icon={<Icon name="chart" className="text-2xl" />} link="/report" />
    <InfoBox title="Adopciones completadas" value={8} icon={<Icon name="heart" className="text-2xl" />} link="/donations" />
  </div>
);

export default UserMetricsCards;