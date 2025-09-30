/**
 * Página de detalle individual de usuario para administradores
 */
import { useRouter } from "next/router";
import UserDetail from "../../../src/components/UserDetail"; 
import styles from "../styles/admin-users.module.css";

// Datos mock de usuarios para desarrollo
const mockUsers = [
  { id: 1, nombre: "Amelia Torres ", email: "amelia@example.com", rol: "admin", estado: "activo" as "activo" | "inactivo" },
  { id: 2, nombre: "Juan Perez", email: "juan@example.com", rol: "usuario", estado: "inactivo" as "activo" | "inactivo" },
  { id: 3, nombre: "María López", email: "maria@example.com", rol: "editor", estado: "activo" as "activo" | "inactivo" },
];

/**
 * Página que renderiza el detalle editable de un usuario específico
 * Ruta dinámica: /admin-users/[id] - donde id es el identificador del usuario
 */
export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query; // ID del usuario desde la URL

  // Buscar usuario por ID o usar el primero como fallback
  const user = id ? mockUsers.find(u => u.id === Number(id)) : mockUsers[0];

  // Mostrar mensaje si no se encuentra el usuario
  if (!user) return <p>Usuario no encontrado</p>;

  // Renderizar componente UserDetail con los datos del usuario
  return <UserDetail user={user} />;
}
