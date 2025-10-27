import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/profileSettings.module.css';
import { useTheme } from '../context/ThemeContext';
import Tooltip from './Tooltip';
import { useNotification } from './NotificationProvider';
const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { addToast } = useNotification();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    const themeName = newTheme === 'dark' ? 'oscuro' : 'claro';
    addToast(`Tema cambiado a modo ${themeName}.`, 'success');
  };

  return (
    <div className={styles.root}>
      {/* 🧭 Botón Ver perfil con tooltip */}
      <Tooltip text="Ver tu perfil público y editar información personal">
        <button
          className={styles.profileButton}
          onClick={() => router.push('/profile')}
        >
          Ver perfil
        </button>
      </Tooltip>

      <div className="w-full">
        <h3 className={styles.menuTitle}>Menú de Configuración</h3>
        <ul>
          {/* 🎨 Selector de tema con tooltip */}
          <li className={styles.menuItem}>
            <Tooltip text="Cambia el modo de visualización del sitio (claro u oscuro)">
              <span>Cambiar tema</span>
            </Tooltip>

            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
              className={styles.select}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </li>

          {/* ⚙️ Botón de preferencias con tooltip */}
          <li>
            <Tooltip text="Abre las opciones de preferencias del usuario">
              <button className={styles.preferencesButton}>Preferencias</button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettings;