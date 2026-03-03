import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "strategist" | "specialist" | "client";
  allowStaff?: boolean; // If true, admin/strategist/specialist can access
  redirectTo?: string;
}

const ProtectedRoute = ({ children, requiredRole, allowStaff = false, redirectTo = "/auth/login" }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Staff roles that can access admin areas
  const staffRoles = ["admin", "strategist", "specialist"];
  const isStaff = userRole && staffRoles.includes(userRole);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(`${redirectTo}?returnTo=${encodeURIComponent(location.pathname + location.search)}`);
      } else if (requiredRole) {
        // Admin and strategist can access everything
        if (userRole === "admin" || userRole === "strategist") {
          // Access granted
        } else if (allowStaff && isStaff) {
          // Staff access allowed
        } else if (requiredRole === "client" && (userRole === "client" || isStaff)) {
          // Client pages accessible to clients and staff
        } else if (userRole !== requiredRole) {
          navigate("/unauthorized");
        }
      } else if (allowStaff && !isStaff) {
        // Page requires staff but user is not staff
        navigate("/unauthorized");
      }
    }
  }, [user, userRole, loading, navigate, requiredRole, redirectTo, isStaff, allowStaff]);

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

  // Check access for pages with required roles
  if (requiredRole) {
    // Admin and strategist have full access
    if (userRole === "admin" || userRole === "strategist") {
      return <>{children}</>;
    }
    // Staff access if allowed
    if (allowStaff && isStaff) {
      return <>{children}</>;
    }
    // Client pages accessible to client role and staff
    if (requiredRole === "client" && (userRole === "client" || isStaff)) {
      return <>{children}</>;
    }
    // No access
    if (userRole !== requiredRole) {
      return null;
    }
  }

  // Staff-only pages
  if (allowStaff && !isStaff) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;