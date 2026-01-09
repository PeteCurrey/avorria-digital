import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Pages with full-screen hero images that need transparent header
  // These pages have dark hero backgrounds (images or gradients) where white text will be visible
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
  
  // Check if current path is a hero page or a location page (service/location pattern)
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

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <BackToTop />
          <CookieConsent />
          <AIConsultantTrigger />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
