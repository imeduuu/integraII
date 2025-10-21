import Tooltip from './Tooltip';
/**
 * Barra de navegación principal con menús dinámicos por rol
 */
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css';
import { userMock } from '../context/userMock';

/**
 * Componente de navegación que renderiza menús específicos según el rol del usuario
 * Roles soportados: admin, user, org
 */
const Navbar = () => {
  const router = useRouter();

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
      { href: '/admin-orgs', label: 'Organizaciones' },
      { href: '/faqs', label: 'FAQs' } // <-- ENLACE AÑADIDO AQUÍ
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
    <span className={styles.navbarTitle}>Huella Segura</span>
    <div className={styles.navbarLinks}>
      <Tooltip text="Ir al inicio 🏠">
        <a href="/" className={getLinkClasses('/')}>Inicio</a>
      </Tooltip>
      <Tooltip text="Ver mapa interactivo 🗺️">
        <a href="/mapa" className={getLinkClasses('/mapa')}>Mapa</a>
      </Tooltip>

      {links.map(link => (
        <Tooltip key={link.href} text={`Ir a ${link.label}`}>
          <a href={link.href} className={getLinkClasses(link.href)}>
            {link.label}
          </a>
        </Tooltip>
      ))}
    </div>

    <div className={styles.profileSection + ' ' + styles.profileSectionRight}>
      <Tooltip text="Ver tu perfil 🐾">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=32&h=32"
          alt="Perfil"
          className={styles.profileImage}
        />
      </Tooltip>

      <Tooltip text="Abrir configuración del perfil ⚙️">
        <a href="/profile" className={getLinkClasses('/profile')}>Ver perfil</a>
      </Tooltip>
    </div>
  </nav>
);
};

export default Navbar;