import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "strategist" | "specialist" | "client";
  redirectTo?: string;
}

const ProtectedRoute = ({ children, requiredRole, redirectTo = "/auth/login" }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(redirectTo);
      } else if (requiredRole && userRole !== requiredRole && userRole !== "admin") {
        // Admin can access everything, otherwise check specific role
        navigate("/unauthorized");
      }
    }
  }, [user, userRole, loading, navigate, requiredRole, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole && userRole !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;