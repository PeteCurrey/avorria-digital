'use client';
import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Mail, Key, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ClientInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
  onSuccess?: () => void;
}

export const ClientInviteDialog = ({
  open,
  onOpenChange,
  clientId,
  clientName,
  onSuccess,
}: ClientInviteDialogProps) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(clientName);
  const [password, setPassword] = useState("");
  const [useCustomPassword, setUseCustomPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    tempPassword?: string;
    isNewUser?: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("invite-client", {
        body: {
          email: email.trim(),
          full_name: fullName.trim(),
          client_id: clientId,
          password: useCustomPassword && password ? password : undefined,
        },
      });

      if (error) throw error;

      if (data.success) {
        setResult({
          success: true,
          tempPassword: data.temp_password,
          isNewUser: data.is_new_user,
        });
        toast.success(
          data.is_new_user
            ? "Client account created successfully"
            : "Client linked to existing account"
        );
        onSuccess?.();
      } else {
        throw new Error(data.error || "Failed to invite client");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to invite client");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCredentials = () => {
    const credentials = `Email: ${email}\nPassword: ${result?.tempPassword || password}`;
    navigator.clipboard.writeText(credentials);
    setCopied(true);
    toast.success("Credentials copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setEmail("");
    setFullName(clientName);
    setPassword("");
    setUseCustomPassword(false);
    setResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Invite Client</DialogTitle>
          <DialogDescription>
            Create login credentials for {clientName} to access their client
            portal.
          </DialogDescription>
        </DialogHeader>

        {result?.success ? (
          <div className="py-4 space-y-4">
            <Alert className="bg-primary/10 border-primary/30">
              <Check className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                {result.isNewUser
                  ? "Account created successfully! Share these credentials with the client."
                  : "Client linked to existing account."}
              </AlertDescription>
            </Alert>

            {result.tempPassword && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="font-mono text-sm">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Password:
                  </span>
                  <span className="font-mono text-sm">
                    {result.tempPassword}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={copyCredentials}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Credentials"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  The client should change their password after first login.
                </p>
              </div>
            )}

            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customPassword"
                  checked={useCustomPassword}
                  onCheckedChange={(checked) =>
                    setUseCustomPassword(checked === true)
                  }
                />
                <Label
                  htmlFor="customPassword"
                  className="text-sm cursor-pointer"
                >
                  Set custom password
                </Label>
              </div>

              {useCustomPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters
                  </p>
                </div>
              )}

              {!useCustomPassword && (
                <p className="text-sm text-muted-foreground">
                  A secure temporary password will be generated automatically.
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create Account
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClientInviteDialog;


