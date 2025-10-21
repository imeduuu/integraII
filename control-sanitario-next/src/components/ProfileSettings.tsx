import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/profileSettings.module.css';
import { useTheme } from '../context/ThemeContext';

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <div className={styles.root}>
      <button
        className={styles.profileButton}
        onClick={() => router.push('/profile')}
      >
        Ver perfil
      </button>
      <div className="w-full">
        <h3 className={styles.menuTitle}>Menú de Configuración</h3>
        <ul>
          <li className={styles.menuItem}>
            <span>Cambiar tema</span>
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
              className={styles.select}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </li>
          <li>
            <button className={styles.preferencesButton}>Preferencias</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettings;
