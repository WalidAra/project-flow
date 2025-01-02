import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate replace to={"/dashboard"} />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
