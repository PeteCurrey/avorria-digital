'use client';
import { Suspense } from "react";
import Login from "@/views/auth/Login";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Login />
    </Suspense>
  );
}


