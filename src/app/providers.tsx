'use client';

import React, { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import CookieConsent from "@/components/CookieConsent";
import AIConsultantTrigger from "@/components/ai-consultant/AIConsultantTrigger";
import NavigationProgress from "@/components/NavigationProgress";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <SmoothScrollProvider>
            <ScrollToTop />
            <BackToTop />
            <NavigationProgress />
            <CookieConsent />
            <AIConsultantTrigger />
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
