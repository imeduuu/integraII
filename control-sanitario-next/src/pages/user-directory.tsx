/**
 * Directorio público de usuarios - Página accesible para cualquier usuario
 */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiUser, HiSearch, HiLocationMarker } from "react-icons/hi";
import styles from "../styles/user-directory.module.css";

// Datos mock públicos de usuarios (información limitada para privacidad)
const publicUsersData = [
  {
    id: 1,
    nombre: "Ana Pérez",
    rol: "admin",
    ubicacion: "Santiago, Chile",
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&w=96&h=96",
    campanasActivas: 2,
    descripcionCorta: "Administradora del sistema con experiencia en protección animal"
  },
  {
    id: 2,
    nombre: "Luis Gómez",
    rol: "user",
    ubicacion: "Valparaíso, Chile",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=96&h=96",
    campanasActivas: 2,
    descripcionCorta: "Voluntario activo apasionado por el rescate de animales"
  },
  {
    id: 3,
    nombre: "Org Animal",
    rol: "org",
    ubicacion: "Concepción, Chile",
    foto: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=facearea&w=96&h=96",
    campanasActivas: 2,
    descripcionCorta: "Organización dedicada al rescate y rehabilitación de animales"
  },
  {
    id: 4,
    nombre: "Pedro López",
    rol: "user",
    ubicacion: "La Serena, Chile",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=96&h=96",
    campanasActivas: 1,
    descripcionCorta: "Nuevo miembro interesado en adoptar y colaborar"
  },
  {
    id: 5,
    nombre: "María Torres",
    rol: "admin",
    ubicacion: "Antofagasta, Chile",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=96&h=96",
    campanasActivas: 2,
    descripcionCorta: "Veterinaria y administradora regional del sistema"
  }
];

// Helper para obtener el badge del rol
const getRoleBadge = (rol: string) => {
  switch (rol) {
    case "admin":
      return <span className={`${styles.roleBadge} ${styles.adminBadge}`}>Administrador</span>;
    case "org":
      return <span className={`${styles.roleBadge} ${styles.orgBadge}`}>Organización</span>;
    default:
      return <span className={`${styles.roleBadge} ${styles.userBadge}`}>Usuario</span>;
  }
};

/**
 * Directorio público de usuarios con búsqueda y filtros
 * Muestra información básica y permite acceder a perfiles públicos
 */
const UserDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Filtrar usuarios basado en búsqueda y filtros
  const filteredUsers = publicUsersData.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "" || user.rol === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <HiUser className={styles.titleIcon} />
            Directorio de Usuarios
          </h1>
          <p className={styles.subtitle}>
            Conoce a los miembros de nuestra comunidad y sus contribuciones
          </p>
        </div>

        {/* Controles de búsqueda y filtros */}
        <section className={styles.controls}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputContainer}>
              <HiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          
          <div className={styles.filterContainer}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="org">Organizaciones</option>
              <option value="user">Usuarios</option>
            </select>
          </div>
        </section>

        {/* Resultados */}
        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredUsers.length === 0 ? (
            <div className={styles.noResults}>
              <HiUser className={styles.noResultsIcon} />
              <h3>No se encontraron usuarios</h3>
              <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className={styles.usersGrid}>
              {filteredUsers.map(user => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.userHeader}>
                    <img
                      src={user.foto}
                      alt={`Foto de ${user.nombre}`}
                      className={styles.userPhoto}
                    />
                    <div className={styles.userBasicInfo}>
                      <h3 className={styles.userName}>{user.nombre}</h3>
                      {getRoleBadge(user.rol)}
                    </div>
                  </div>
                  
                  <div className={styles.userDetails}>
                    <div className={styles.userLocation}>
                      <HiLocationMarker className={styles.locationIcon} />
                      <span>{user.ubicacion}</span>
                    </div>
                    
                    <p className={styles.userDescription}>
                      {user.descripcionCorta}
                    </p>
                    
                    <div className={styles.userStats}>
                      <span className={styles.statItem}>
                        <strong>{user.campanasActivas}</strong> campaña{user.campanasActivas !== 1 ? 's' : ''} activa{user.campanasActivas !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.userActions}>
                    <a
                      href={`/user/${user.id}`}
                      className={styles.viewProfileButton}
                    >
                      Ver Perfil Completo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UserDirectory;