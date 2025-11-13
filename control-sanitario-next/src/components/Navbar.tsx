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
  let links: { href: string; label: string }[] = [];
  if (userMock.role === 'admin') {
    links = [
      { href: '/admin-home', label: 'Panel Admin' },
      { href: '/admin-users', label: 'Usuarios' },
      { href: '/admin-campaigns', label: 'Campañas' }
    ];
  } else if (userMock.role === 'user') {
    links = [
      { href: '/edit-profile', label: 'Perfil' },
      { href: '/adopcion', label: 'Adopciones' },
      { href: '/report', label: 'Reportar' },
      { href: '/animals', label: 'Animales' },
      { href: '/donations', label: 'Donaciones' },
      { href: '/admin-orgs', label: 'Organizaciones' }
    ];
  } else if (userMock.role === 'org') {
    links = [
      { href: '/org-campaigns', label: 'Campañas' },
      { href: '/org-publish-adoption', label: 'Publicar Adopción' },
      { href: '/org-stats', label: 'Estadísticas' }
    ];
  }

  return (
    <nav role="navigation" aria-label="Navegación principal" className={styles.navbar}>
      <span className={styles.navbarTitle}>Huella Segura</span>

      <div className={styles.navbarLinks} aria-hidden={false}>
        <a
          href="/"
          className={getLinkClasses('/')}
          aria-current={router.pathname === '/' ? 'page' : undefined}
        >
          Inicio
        </a>
        {links.map(link => (
          <a
            key={link.href + link.label}
            href={link.href}
            className={getLinkClasses(link.href)}
            aria-current={router.pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.profileSection + ' ' + styles.profileSectionRight} role="region" aria-label="Perfil del usuario">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=32&h=32"
          alt="Imagen de perfil"
          className={styles.profileImage}
        />
        <a href="/edit-profile" className={getLinkClasses('/edit-profile')}>Editar perfil</a>
      </div>
    </nav>
  );
};

export default Navbar;
