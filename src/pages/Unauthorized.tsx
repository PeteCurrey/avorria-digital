'use client';
import Navigate from '@/components/Navigate';
import { Link, use  , useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Unauthorized = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOutAndLogin = async () => {
    await signOut();
    router.push("/auth/login?returnTo=/admin");
  };

  return (
    <>
      
        <title>Unauthorized - Avorria</title>
      

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-6">
              <ShieldAlert className="h-16 w-16 text-destructive" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Access Denied</h1>
            <p className="text-lg text-muted-foreground">
              You don't have permission to access this page.
            </p>
            {user?.email && (
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.email}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleSignOutAndLogin} variant="default">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out &amp; Sign In
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
