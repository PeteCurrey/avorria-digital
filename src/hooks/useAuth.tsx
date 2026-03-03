import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  impersonatedClient: string | null;
  setImpersonatedClient: (clientId: string | null) => void;
  signUp: (email: string, password: string, fullName: string, userType?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      
      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
      
      // Prioritize roles: admin > strategist > specialist > client
      const roles = data?.map(r => r.role as string) || [];
      const rolePriority = ["admin", "strategist", "specialist", "client"];
      return rolePriority.find(role => roles.includes(role)) || null;
    } catch (error: any) {
      console.error("Exception fetching user role:", error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    let hasInitialized = false;

    // Set up auth state listener for ONGOING changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Only fetch role for ongoing changes (not initial)
        if (hasInitialized && currentSession?.user) {
          const role = await fetchUserRole(currentSession.user.id);
          if (isMounted) setUserRole(role);
        } else if (!currentSession) {
          setUserRole(null);
        }
      }
    );

    // INITIAL load - controls loading state with failsafe timeout
    const initializeAuth = async () => {
      // Failsafe: ensure loading is set to false after 5 seconds max
      const failsafeTimeout = setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 5000);
      
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!isMounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch role BEFORE setting loading to false
        if (currentSession?.user) {
          try {
            const role = await fetchUserRole(currentSession.user.id);
            if (isMounted) setUserRole(role);
          } catch (roleError) {
            console.error("Role fetch failed:", roleError);
          }
        }
      } catch (err) {
        console.error("Error in initializeAuth:", err);
      } finally {
        clearTimeout(failsafeTimeout);
        if (isMounted) setLoading(false);
        hasInitialized = true;
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, userType: string = "client") => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            user_type: userType
          }
        }
      });

      if (error) {
        toast.error("Sign up failed", {
          description: error.message,
        });
      } else {
        toast.success("Account created!", {
          description: "You can now complete your profile.",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Sign in failed", {
          description: error.message,
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
      toast.success("Signed out", {
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast.error("Error", {
        description: "Failed to sign out.",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, userRole, loading, impersonatedClient, setImpersonatedClient, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};