/**
 * Página de perfil público de usuario
 * Muestra información pública del usuario y las campañas en las que participa
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HiUser, HiMail, HiLocationMarker, HiCalendar, HiSpeakerphone } from "react-icons/hi";
import styles from "../../styles/user-profile.module.css";
import { SkeletonList, SkeletonCard } from '../../components/ui/Skeleton';

// Datos mock expandidos de usuarios con información de perfil
const usersProfileData = [
  {
    id: 1,
    nombre: "Ana Pérez",
    email: "ana@correo.com",
    rol: "admin",
    fechaRegistro: "2024-01-15",
    ubicacion: "Santiago, Chile",
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&w=256&h=256",
    bio: "Administradora del sistema con más de 5 años de experiencia en protección animal.",
    campanasParticipando: [
      { id: 1, nombre: "Campaña de Vacunación", estado: "Activa", rol: "Coordinadora" },
      { id: 2, nombre: "Adopta un Amigo", estado: "Activa", rol: "Supervisora" }
    ],
    estadisticas: {
      animalesAyudados: 45,
      campanasCreadas: 8,
      voluntariosReclutados: 23
    }
  },
  {
    id: 2,
    nombre: "Luis Gómez",
    email: "luis@correo.com",
    rol: "user",
    fechaRegistro: "2024-03-22",
    ubicacion: "Valparaíso, Chile",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256",
    bio: "Voluntario activo apasionado por el rescate de animales callejeros.",
    campanasParticipando: [
      { id: 1, nombre: "Campaña de Vacunación", estado: "Activa", rol: "Voluntario" },
      { id: 3, nombre: "Colecta Solidaria", estado: "Finalizada", rol: "Participante" }
    ],
    estadisticas: {
      animalesAyudados: 12,
      campanasParticipadas: 5,
      horasVoluntariado: 120
    }
  },
  {
    id: 3,
    nombre: "Org Animal",
    email: "org@correo.com",
    rol: "org",
    fechaRegistro: "2023-11-10",
    ubicacion: "Concepción, Chile",
    foto: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=facearea&w=256&h=256",
    bio: "Organización dedicada al rescate y rehabilitación de animales abandonados.",
    campanasParticipando: [
      { id: 2, nombre: "Adopta un Amigo", estado: "Activa", rol: "Organizadora" },
      { id: 4, nombre: "Esterilización Masiva", estado: "Planificada", rol: "Organizadora" }
    ],
    estadisticas: {
      animalesRescatados: 156,
      adopcionesRealizadas: 98,
      campanasOrganizadas: 15
    }
  },
  {
    id: 4,
    nombre: "Pedro López",
    email: "pedro@correo.com",
    rol: "user",
    fechaRegistro: "2024-05-08",
    ubicacion: "La Serena, Chile",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256",
    bio: "Nuevo en la plataforma, interesado en adoptar y colaborar con organizaciones locales.",
    campanasParticipando: [
      { id: 1, nombre: "Campaña de Vacunación", estado: "Activa", rol: "Voluntario" }
    ],
    estadisticas: {
      animalesAyudados: 3,
      campanasParticipadas: 1,
      horasVoluntariado: 15
    }
  },
  {
    id: 5,
    nombre: "María Torres",
    email: "maria@correo.com",
    rol: "admin",
    fechaRegistro: "2023-08-12",
    ubicacion: "Antofagasta, Chile",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=256&h=256",
    bio: "Veterinaria y administradora regional del sistema de control sanitario.",
    campanasParticipando: [
      { id: 1, nombre: "Campaña de Vacunación", estado: "Activa", rol: "Coordinadora Médica" },
      { id: 4, nombre: "Esterilización Masiva", estado: "Planificada", rol: "Supervisora Médica" }
    ],
    estadisticas: {
      animalesAtendidos: 234,
      cirugíasRealizadas: 67,
      campanasSupervision: 12
    }
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

// Helper para obtener el color del estado de campaña
const getEstadoCampanaColor = (estado: string) => {
  switch (estado) {
    case "Activa":
      return "text-green-600 bg-green-100";
    case "Finalizada":
      return "text-gray-600 bg-gray-100";
    case "Planificada":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

/**
 * Componente de perfil público que muestra información del usuario y sus campañas
 * Accesible a cualquier usuario a través de /user/[id]
 */
const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Buscar usuario por ID
      const foundUser = usersProfileData.find(u => u.id === Number(id));
      if (foundUser) {
        setUser(foundUser);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <section className={styles.profileHeader}>
            <div className={styles.profileImageContainer}>
              <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.nameAndRole}>
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="mt-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </section>
          <section className={styles.statsSection}>
            <SkeletonList count={3} />
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <div className={styles.errorContainer}>
            <h1>Usuario no encontrado</h1>
            <p>El perfil que buscas no existe o ha sido eliminado.</p>
            <button 
              onClick={() => router.back()}
              className={styles.backButton}
            >
              Volver atrás
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Header del perfil */}
        <section className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            <img
              src={user.foto}
              alt={`Foto de perfil de ${user.nombre}`}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.nameAndRole}>
              <h1 className={styles.userName}>{user.nombre}</h1>
              {getRoleBadge(user.rol)}
            </div>
            <p className={styles.userBio}>{user.bio}</p>
            <div className={styles.userDetails}>
              <div className={styles.detailItem}>
                <HiMail className={styles.detailIcon} />
                <span>{user.email}</span>
              </div>
              <div className={styles.detailItem}>
                <HiLocationMarker className={styles.detailIcon} />
                <span>{user.ubicacion}</span>
              </div>
              <div className={styles.detailItem}>
                <HiCalendar className={styles.detailIcon} />
                <span>Miembro desde {new Date(user.fechaRegistro).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Estadísticas del usuario */}
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Estadísticas</h2>
          <div className={styles.statsGrid}>
            {Object.entries(user.estadisticas).map(([key, value]) => (
              <div key={key} className={styles.statCard}>
                <div className={styles.statNumber}>{value as number}</div>
                <div className={styles.statLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campañas en las que participa */}
        <section className={styles.campaignsSection}>
          <h2 className={styles.sectionTitle}>
            <HiSpeakerphone className={styles.sectionIcon} />
            Campañas Participando ({user.campanasParticipando.length})
          </h2>
          
          {user.campanasParticipando.length === 0 ? (
            <div className={styles.noCampaigns}>
              <p>Este usuario no está participando en ninguna campaña actualmente.</p>
            </div>
          ) : (
            <div className={styles.campaignsGrid}>
              {user.campanasParticipando.map((campana: any) => (
                <div key={campana.id} className={styles.campaignCard}>
                  <div className={styles.campaignHeader}>
                    <h3 className={styles.campaignName}>{campana.nombre}</h3>
                    <span className={`${styles.campaignStatus} ${getEstadoCampanaColor(campana.estado)}`}>
                      {campana.estado}
                    </span>
                  </div>
                  <div className={styles.campaignRole}>
                    <span className={styles.roleLabel}>Rol:</span>
                    <span className={styles.roleValue}>{campana.rol}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Botón de navegación */}
        <div className={styles.navigationButtons}>
          <button 
            onClick={() => router.back()}
            className={styles.backButton}
          >
            Volver atrás
          </button>
          <button 
            onClick={() => router.push('/admin-users')}
            className={styles.usersListButton}
          >
            Ver todos los usuarios
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfilePage;