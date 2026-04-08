'use client';
import { Suspense } from "react";
import Admin from "@/views/Admin";

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Admin />
    </Suspense>
  );
}

