'use client';
import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const staffRoles = ["admin", "strategist", "specialist"];
  const isStaff = userRole && staffRoles.includes(userRole);

  const isFullyLoaded = !loading && (!user || userRole !== null);

  useEffect(() => {
    if (!isFullyLoaded) return;

    if (!user) {
      router.push(`${redirectTo}?returnTo=${encodeURIComponent(pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''))}`);
    } else if (requiredRole) {
      if (userRole === "admin" || userRole === "strategist") {
        // Full access
      } else if (allowStaff && isStaff) {
        // Staff access allowed
      } else if (requiredRole === "client" && (userRole === "client" || isStaff)) {
        // Client pages accessible to clients and staff
      } else if (userRole !== requiredRole) {
        router.push("/unauthorized");
      }
    } else if (allowStaff && !isStaff) {
      router.push("/unauthorized");
    }
  }, [user, userRole, isFullyLoaded, router, requiredRole, redirectTo, isStaff, allowStaff, pathname, searchParams]);

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

