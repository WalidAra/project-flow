import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const HomeMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to={"/auth/signin"} />;
  }

  return <>{children}</>;
};

export default HomeMiddleware;
