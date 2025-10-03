/**
 * Wrapper de protección de rutas basado en roles de usuario
 */
import React from "react";
import { useRouter } from "next/router";
import { userMock } from "../context/userMock";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Roles permitidos para acceder
  children: React.ReactNode;
}

/**
 * Componente que protege rutas según roles permitidos
 * Redirige a /denied si el usuario no tiene permisos
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const userRole = userMock.role;

  // Verificar permisos y redirigir si no tiene acceso
  React.useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      router.replace("/denied");
    }
  }, [userRole, allowedRoles, router]);

  // No renderizar contenido si no tiene permisos
  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
