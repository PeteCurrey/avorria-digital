// Module version: v7 - forces fresh HMR reload
import React, { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";
import AnimatedRoutes from "./components/AnimatedRoutes";
import AIConsultantTrigger from "./components/ai-consultant/AIConsultantTrigger";
import NavigationProgress from "./components/NavigationProgress";
import CustomCursor from "./components/CustomCursor";
import PageLoader from "./components/PageLoader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Pages that have their own complete layout (no global nav/footer)
  const selfContainedPages = [
    "/web-design/studio/build",
    "/admin",
  ];
  
  const isSelfContainedPage = selfContainedPages.some(page => 
    location.pathname === page
  ) || location.pathname.startsWith("/client");
  
  // Skip global navigation and footer for self-contained pages
  if (isSelfContainedPage) {
    return <>{children}</>;
  }
  
  // Pages with full-screen hero images that need transparent header
  const heroPages = [
    "/web-design/studio",
    "/services",
    "/services/seo",
    "/services/paid-media",
    "/services/content-email",
    "/services/social-personal-brand",
    "/services/analytics",
    "/about",
    "/contact",
    "/seo-agency",
    "/digital-marketing-agency",
    "/paid-media-agency",
    "/web-design",
  ];
  
  const isLocationPage = /^\/(seo-agency|digital-marketing-agency|paid-media-agency|web-design)\/[^/]+$/.test(location.pathname);
  
  const isHeroPage = heroPages.some(page => location.pathname === page) || 
                     location.pathname.startsWith("/case-studies") ||
                     isLocationPage;

  return (
    <>
      {!isHomePage && <Navigation transparent={isHeroPage} />}
      {children}
      <Footer />
    </>
  );
};

// Create a stable HelmetProvider context
const helmetContext = {};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Create QueryClient inside the component to avoid HMR issues
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

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <PageLoader onComplete={handleLoaderComplete} />
              {!isLoading && (
                <>
                  <ScrollToTop />
                  <BackToTop />
                  <NavigationProgress />
                  <CookieConsent />
                  <AIConsultantTrigger />
                  <CustomCursor />
                  <Layout>
                    <AnimatedRoutes />
                  </Layout>
                </>
              )}
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
