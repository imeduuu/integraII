import React from "react";
import { useRouter } from "next/router";
import { userMock } from "../context/userMock";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const userRole = userMock.role;

  React.useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      router.replace("/denied");
    }
  }, [userRole, allowedRoles, router]);

  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
