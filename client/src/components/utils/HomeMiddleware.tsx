import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const HomeMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to="/auth/signin" />;
  }

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate replace to="/dashboard" />;
  }

  return <>{children}</>;
};

export default HomeMiddleware;
