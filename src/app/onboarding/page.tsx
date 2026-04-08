'use client';
import { Suspense } from "react";
import Onboarding from "@/views/Onboarding";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Onboarding />
    </Suspense>
  );
}


