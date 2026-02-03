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
      // Use security definer function to bypass RLS issues
      const { data, error } = await supabase
        .rpc("get_user_role", { _user_id: userId });

      if (error) {
        console.error("Error fetching user role via RPC:", error);
        return null;
      }
      
      return data as string | null;
    } catch (error: any) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener for ONGOING changes (does NOT control loading)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fire and forget for ongoing changes - don't await, don't set loading
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          if (isMounted) setUserRole(role);
        } else {
          setUserRole(null);
        }
      }
    );

    // INITIAL load - controls loading state
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        // Fetch role BEFORE setting loading to false
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          if (isMounted) setUserRole(role);
        }
      } finally {
        if (isMounted) setLoading(false);
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