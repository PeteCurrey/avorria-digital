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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
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

// Create QueryClient instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CustomCursor />
            <ScrollToTop />
            <BackToTop />
            <NavigationProgress />
            <CookieConsent />
            <AIConsultantTrigger />
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
