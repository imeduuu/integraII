import React from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  const getLinkClasses = (path: string) => {
    return `${styles.navLink} ${router.pathname === path ? styles.navLinkActive : ''}`;
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.navbarTitle}>Control Sanitario</span>
      <div className={styles.navbarLinks}>
        <a href="/" className={getLinkClasses('/')}>Inicio</a>
        <a href="/report" className={getLinkClasses('/report')}>Reportar</a>
        <a href="/animals" className={getLinkClasses('/animals')}>Animales</a>
        <a href="/alerts" className={getLinkClasses('/alerts')}>Alertas</a>
        <a href="/donations" className={getLinkClasses('/donations')}>Donaciones</a>
        <a href="/adopcion" className={getLinkClasses('/adopcion')}>Adopciones</a>
      </div>
    </nav>
  );
};

export default Navbar;