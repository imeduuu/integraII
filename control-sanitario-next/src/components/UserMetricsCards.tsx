import React from 'react';
import InfoBox from './InfoBox';
import styles from '../styles/infoBox.module.css';
import Icon from './ui/Icon';
import { Skeleton } from './ui/Skeleton';

const UserMetricsCards = ({ isLoading }: { isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className={styles.infoGrid}>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <Skeleton width="w-32" height="h-6" />
          <div className="mt-2"><Skeleton width="w-20" height="h-8" /></div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <Skeleton width="w-32" height="h-6" />
          <div className="mt-2"><Skeleton width="w-20" height="h-8" /></div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <Skeleton width="w-32" height="h-6" />
          <div className="mt-2"><Skeleton width="w-20" height="h-8" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.infoGrid}>
      <InfoBox title="Animales registrados" value={42} icon={<Icon name="paw" className="text-2xl" />} link="/animals" />
      <InfoBox title="Reportes enviados" value={15} icon={<Icon name="chart" className="text-2xl" />} link="/report" />
      <InfoBox title="Adopciones completadas" value={8} icon={<Icon name="heart" className="text-2xl" />} link="/donations" />
    </div>
  );
};

export default UserMetricsCards;