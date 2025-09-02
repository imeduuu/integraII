import React from 'react';
import styles from '../styles/infoBox.module.css';
import { useRouter } from 'next/router';

interface InfoBoxProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  link?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, value, icon, link }) => {
  const router = useRouter();
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
