import { useRouter } from "next/router";
import UserDetail from "../../../src/components/UserDetail"; 
import styles from "../styles/admin-users.module.css";

const mockUsers = [
  { id: 1, nombre: "Amelia Torres ", email: "amelia@example.com", rol: "admin", estado: "activo" as "activo" | "inactivo" },
  { id: 2, nombre: "Juan Perez", email: "juan@example.com", rol: "usuario", estado: "inactivo" as "activo" | "inactivo" },
  { id: 3, nombre: "María López", email: "maria@example.com", rol: "editor", estado: "activo" as "activo" | "inactivo" },
];

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const user = id ? mockUsers.find(u => u.id === Number(id)) : mockUsers[0];

  if (!user) return <p>Usuario no encontrado</p>;

  return <UserDetail user={user} />;
}
