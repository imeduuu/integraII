
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userMock } from "../context/userMock";
import { HiUser, HiUserGroup, HiShieldCheck } from "react-icons/hi"; // Iconos para roles
import styles from "../styles/admin-users.module.css";
import UserTable from "../components/UserTable";

const users = [
  { id: 1, nombre: "Ana Pérez", email: "ana@correo.com", rol: "admin" },
  { id: 2, nombre: "Luis Gómez", email: "luis@correo.com", rol: "user" },
  { id: 3, nombre: "Org Animal", email: "org@correo.com", rol: "org" },
  { id: 4, nombre: "Pedro López", email: "pedro@correo.com", rol: "user" },
  { id: 5, nombre: "María Torres", email: "maria@correo.com", rol: "admin" },
  { id: 6, nombre: "Carlos Ruiz", email: "carlos@correo.com", rol: "user" },
  { id: 7, nombre: "Sofía Díaz", email: "sofia@correo.com", rol: "org" },
  { id: 8, nombre: "Andrés Muñoz", email: "andres@correo.com", rol: "user" },
  { id: 9, nombre: "Andrea Muñoz", email: "andrea@correo.com", rol: "user" },
  { id: 10, nombre: "Andy Muñoz", email: "andy@correo.com", rol: "user" },
  { id: 11, nombre: "Martina López", email: "ejemplo@correo.com", rol: "user" },
];

const roleBadge = (rol: string) => {
  // Badge visual para cada rol usando clases CSS del módulo
  switch (rol) {
    case "admin":
      return (
        <span className={`${styles.roleBadge} ${styles.adminBadge}`}>
          <HiShieldCheck className="w-4 h-4" /> Admin
        </span>
      );
    case "org":
      return (
        <span className={`${styles.roleBadge} ${styles.orgBadge}`}>
          <HiUserGroup className="w-4 h-4" /> Organización
        </span>
      );
    default:
      return (
        <span className={`${styles.roleBadge} ${styles.userBadge}`}>
          <HiUser className="w-4 h-4" /> Usuario
        </span>
      );
  }
};

const UserList = () => {
  const [filtro, setFiltro] = useState('');
  const [filtroNombre, setFiltroNombre] = useState(false);
  const [filtroEmail, setFiltroEmail] = useState(false);

  useEffect(() => {
    if (userMock.role !== "admin") {
      window.location.replace("/denied");
    }
  }, []);

  // Filtrar usuarios basado en el texto de búsqueda y filtros seleccionados
  const usuariosFiltrados = users.filter(user => {
    const textoFiltro = filtro.trim().toLowerCase(); // .trim() elimina espacios al inicio y final
    
    // Si el texto de búsqueda está vacío después del trim, mostrar todos los usuarios
    if (textoFiltro === '') {
      return true;
    }
    
    // Si ningún filtro está activo, buscar en ambos
    if (!filtroNombre && !filtroEmail) {
      return user.nombre.toLowerCase().includes(textoFiltro) || 
             user.email.toLowerCase().includes(textoFiltro);
    }
    
    // Si solo filtro nombre está activo
    if (filtroNombre && !filtroEmail) {
      return user.nombre.toLowerCase().includes(textoFiltro);
    }
    
    // Si solo filtro email está activo
    if (!filtroNombre && filtroEmail) {
      return user.email.toLowerCase().includes(textoFiltro);
    }
    
    // Si ambos filtros están activos, buscar en ambos
    if (filtroNombre && filtroEmail) {
      return user.nombre.toLowerCase().includes(textoFiltro) || 
             user.email.toLowerCase().includes(textoFiltro);
    }
    
    return false;
  });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>
        
        {/* Botones de filtro */}
        <div className={styles.filterButtons}>
          <button
            onClick={() => setFiltroNombre(!filtroNombre)}
            className={`${styles.filterButton} ${filtroNombre ? styles.filterButtonActive : ''}`}
          >
            Filtrar por Nombre
          </button>
          <button
            onClick={() => setFiltroEmail(!filtroEmail)}
            className={`${styles.filterButton} ${filtroEmail ? styles.filterButtonActive : ''}`}
          >
            Filtrar por Email
          </button>
        </div>

        {/* Campo de búsqueda */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={
              filtroNombre && !filtroEmail ? 'Buscar usuario por nombre...' :
              !filtroNombre && filtroEmail ? 'Buscar usuario por email...' :
              'Buscar usuario por nombre o email...'
            }
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={`${styles.searchInput} ${styles.fadeIn}`}
          />
        </div>

        {/* Tabla principal con estilos CSS del módulo */}
        <div className={`${styles.table} ${styles.fadeIn}`}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>
                  <HiUser className="w-5 h-5 inline mr-2" />
                  Nombre
                </th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.noResults}>
                    {filtro.trim() ? (
                      `No se encontraron usuarios que coincidan con "${filtro.trim()}" ${
                        filtroNombre && !filtroEmail ? 'en el nombre' :
                        !filtroNombre && filtroEmail ? 'en el email' :
                        'en nombre o email'
                      }`
                    ) : (
                      'No hay usuarios para mostrar'
                    )}
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map(user => (
                  <tr
                    key={user.id}
                    className={styles.tr}
                  >
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <HiUser className="w-5 h-5" style={{ color: '#3b82f6' }} />
                        {user.nombre}
                      </div>
                    </td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{roleBadge(user.rol)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Botones de navegación con estilos mejorados */}
        <div className={styles.actionButtons}>
          <a
            href="/admin-home"
            className={`${styles.actionButton} ${styles.primaryButton}`}
          >
            Volver al Panel
          </a>
          <a
            href="/admin-campaigns"
            className={`${styles.actionButton} ${styles.secondaryButton}`}
          >
            Ver Campañas
          </a>
        </div>
      </main>
      <Footer />
      {/* Las animaciones y estilos ahora están en el módulo CSS */}
    </>
  );
};

export default UserList;
