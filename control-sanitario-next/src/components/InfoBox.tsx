/**
 * Caja informativa clickeable con íconos para mostrar métricas
 */
import React from 'react';
import styles from '../styles/infoBox.module.css';
import { useRouter } from 'next/router';

interface InfoBoxProps {
  title: string; // Título descriptivo de la métrica
  value: string | number; // Valor numérico o texto a mostrar
  icon?: React.ReactNode; // Ícono opcional
  link?: string; // URL de navegación opcional
}

/**
 * Componente para mostrar información resumida con navegación opcional
 * Usado en dashboards para métricas y estadísticas
 */
const InfoBox: React.FC<InfoBoxProps> = ({ title, value, icon, link }) => {
  const router = useRouter();
  // Navegación programática si se proporciona un enlace
  const handleClick = () => {
    if (link) router.push(link);
  };

  return (
    <div
      className={styles.infoBox}
      style={link ? { cursor: 'pointer' } : {}}
      onClick={link ? handleClick : undefined}
      tabIndex={link ? 0 : undefined}
      role={link ? 'button' : undefined}
    >
      {icon && <div className={styles.infoIcon}>{icon}</div>}
      <div>
        <div className={styles.infoValue}>{value}</div>
        <div className={styles.infoTitle}>{title}</div>
      </div>
    </div>
  );
};

export default InfoBox;
