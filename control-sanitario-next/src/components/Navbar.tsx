/**
 * Barra de navegación principal con menús dinámicos por rol
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css';
import { userMock } from '../context/userMock';
import Tooltip from './Tooltip';

/**
 * Componente de navegación que renderiza menús específicos según el rol del usuario
 * Roles soportados: admin, user, org
 */
const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Aplica estilos activos al enlace de la página actual
  const getLinkClasses = (path: string) => {
    return `${styles.navLink} ${router.pathname === path ? styles.navLinkActive : ''}`;
  };

  // Configuración de enlaces por rol de usuario
  let links = [];
  if (userMock.role === 'admin') {
    links = [
      { href: '/admin-home', label: 'Panel Admin' },
      { href: '/admin-users', label: 'Usuarios' },
      { href: '/admin-campaigns', label: 'Campañas' },
      { href: '/admin-inbox', label: 'Bandeja de Entrada' }
    ];
  } else if (userMock.role === 'user') {
    links = [
      { href: '/edit-profile', label: 'Perfil' },
      { href: '/adopcion', label: 'Adopciones' },
      { href: '/report', label: 'Reportar' },
      { href: '/animals', label: 'Animales' },
      { href: '/donations', label: 'Donaciones' },
      { href: '/user-directory', label: 'Usuarios' },
      { href: '/admin-orgs', label: 'Organizaciones' },
      { href: '/faqs', label: 'FAQs' }
    ];
  } else if (userMock.role === 'org') {
    links = [
      { href: '/org-campaigns', label: 'Campañas' },
      { href: '/org-publish-adoption', label: 'Publicar Adopción' },
      { href: '/org-stats', label: 'Estadísticas' }
    ];
  }

return (
  <nav className={styles.navbar}>
    <div className={styles.navbarHeader}>
      <span className={styles.navbarTitle}>Huella Segura</span>
      
      {/* Botón hamburguesa para móviles */}
      <button 
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>
    </div>

    <div className={`${styles.navbarLinks} ${menuOpen ? styles.navbarLinksOpen : ''}`}>
      <Tooltip text="Ir al inicio 🏠">
        <a href="/" className={getLinkClasses('/')} onClick={() => setMenuOpen(false)}>Inicio</a>
      </Tooltip>
      <Tooltip text="Ver mapa interactivo 🗺️">
        <a href="/mapa" className={getLinkClasses('/mapa')} onClick={() => setMenuOpen(false)}>Mapa</a>
      </Tooltip>

      {links.map(link => (
        <Tooltip key={link.href} text={`Ir a ${link.label}`}>
          <a href={link.href} className={getLinkClasses(link.href)} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        </Tooltip>
      ))}

      <Tooltip text="Abrir configuración del perfil ⚙️">
        <a href="/profile" className={getLinkClasses('/profile')} onClick={() => setMenuOpen(false)}>Ver perfil</a>
      </Tooltip>
    </div>
  </nav>
);
};

export default Navbar;