import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "strategist" | "specialist" | "client";
  allowStaff?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, requiredRole, allowStaff = false, redirectTo = "/auth/login" }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const staffRoles = ["admin", "strategist", "specialist"];
  const isStaff = userRole && staffRoles.includes(userRole);

  // Wait for BOTH auth AND role to fully resolve before any decisions
  const isFullyLoaded = !loading && (!user || userRole !== null);

  useEffect(() => {
    if (!isFullyLoaded) return;

    if (!user) {
      navigate(`${redirectTo}?returnTo=${encodeURIComponent(location.pathname + location.search)}`);
    } else if (requiredRole) {
      if (userRole === "admin" || userRole === "strategist") {
        // Full access
      } else if (allowStaff && isStaff) {
        // Staff access allowed
      } else if (requiredRole === "client" && (userRole === "client" || isStaff)) {
        // Client pages accessible to clients and staff
      } else if (userRole !== requiredRole) {
        navigate("/unauthorized");
      }
    } else if (allowStaff && !isStaff) {
      navigate("/unauthorized");
    }
  }, [user, userRole, isFullyLoaded, navigate, requiredRole, redirectTo, isStaff, allowStaff, location.pathname, location.search]);

  // Show loading while auth or role is resolving
  if (!isFullyLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole) {
    if (userRole === "admin" || userRole === "strategist") return <>{children}</>;
    if (allowStaff && isStaff) return <>{children}</>;
    if (requiredRole === "client" && (userRole === "client" || isStaff)) return <>{children}</>;
    if (userRole !== requiredRole) return null;
  }

  if (allowStaff && !isStaff) return null;

  return <>{children}</>;
};

export default ProtectedRoute;