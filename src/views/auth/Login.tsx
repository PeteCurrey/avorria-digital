'use client';
import Link from "next/link";
import Navigate from '@/components/Navigate';
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/admin";

  useEffect(() => {
    if (user) {
      router.push(returnTo);
    }
  }, [user, router, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (!error) {
      router.push(returnTo);
    }

    setLoading(false);
  };

  return (
    <>
      
        <title>Sign In - Avorria</title>
      

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href={`/auth/signup?returnTo=${returnTo}`} className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;

