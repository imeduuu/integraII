/**
 * Widget de usuarios destacados - Componente reutilizable
 * Muestra una lista compacta de usuarios activos con enlaces a sus perfiles
 */
import React from "react";
import { HiUser, HiStar } from "react-icons/hi";
import styles from "../styles/featured-users-widget.module.css";

// Datos de usuarios destacados (subconjunto de los usuarios públicos)
const featuredUsers = [
  {
    id: 1,
    nombre: "Ana Pérez",
    rol: "admin",
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&w=48&h=48",
    logros: "8 campañas creadas",
    badge: "Líder Comunitaria"
  },
  {
    id: 3,
    nombre: "Org Animal",
    rol: "org",
    foto: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=facearea&w=48&h=48",
    logros: "98 adopciones exitosas",
    badge: "Organización Verificada"
  },
  {
    id: 2,
    nombre: "Luis Gómez",
    rol: "user",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=48&h=48",
    logros: "120 horas de voluntariado",
    badge: "Voluntario Estrella"
  }
];

// Helper para obtener el color del badge
const getBadgeColor = (rol: string) => {
  switch (rol) {
    case "admin":
      return styles.adminBadge;
    case "org":
      return styles.orgBadge;
    default:
      return styles.userBadge;
  }
};

interface FeaturedUsersWidgetProps {
  title?: string;
  showViewAll?: boolean;
  maxUsers?: number;
}

/**
 * Componente que muestra usuarios destacados en formato compacto
 * Ideal para sidebars, páginas de inicio o como complemento
 */
const FeaturedUsersWidget: React.FC<FeaturedUsersWidgetProps> = ({
  title = "Usuarios Destacados",
  showViewAll = true,
  maxUsers = 3
}) => {
  const displayUsers = featuredUsers.slice(0, maxUsers);

  return (
    <div className={styles.widget}>
      {/* Header del widget */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          <HiStar className={styles.titleIcon} />
          {title}
        </h3>
        {showViewAll && (
          <a href="/user-directory" className={styles.viewAllLink}>
            Ver todos
          </a>
        )}
      </div>

      {/* Lista de usuarios */}
      <div className={styles.usersList}>
        {displayUsers.map(user => (
          <a
            key={user.id}
            href={`/user/${user.id}`}
            className={styles.userItem}
          >
            <div className={styles.userAvatar}>
              <img
                src={user.foto}
                alt={`Foto de ${user.nombre}`}
                className={styles.userPhoto}
              />
            </div>
            
            <div className={styles.userInfo}>
              <div className={styles.userHeader}>
                <span className={styles.userName}>{user.nombre}</span>
                <span className={`${styles.userBadge} ${getBadgeColor(user.rol)}`}>
                  {user.badge}
                </span>
              </div>
              <div className={styles.userAchievement}>
                {user.logros}
              </div>
            </div>
            
            <div className={styles.userAction}>
              <HiUser className={styles.actionIcon} />
            </div>
          </a>
        ))}
      </div>

      {/* Footer opcional */}
      {showViewAll && displayUsers.length > 0 && (
        <div className={styles.footer}>
          <a href="/user-directory" className={styles.exploreButton}>
            Explorar Comunidad
          </a>
        </div>
      )}
    </div>
  );
};

export default FeaturedUsersWidget;