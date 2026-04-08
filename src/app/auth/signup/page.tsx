'use client';
import { Suspense } from "react";
import Signup from "@/views/auth/Signup";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Signup />
    </Suspense>
  );
}


