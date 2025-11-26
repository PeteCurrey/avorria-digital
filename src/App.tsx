import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import SEOServices from "./pages/SEOServices";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import DynamicLanding from "./pages/DynamicLanding";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Comparison from "./pages/Comparison";
import WhyAvorria from "./pages/WhyAvorria";
import NotFound from "./pages/NotFound";
import AuditFunnel from "./pages/AuditFunnel";
import ProjectEstimator from "./pages/ProjectEstimator";
import Reporting from "./pages/Reporting";
import DashboardDemo from "./pages/DashboardDemo";
import ClientPortal from "./pages/ClientPortal";
import AgencyTeardown from "./pages/AgencyTeardown";
import AgencyTeardownThanks from "./pages/AgencyTeardownThanks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navigation />}
      {children}
      <Footer />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/seo" element={<SEOServices />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Resources */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
              
              {/* Why Avorria */}
              <Route path="/why-avorria" element={<WhyAvorria />} />
              <Route path="/why/:slug" element={<Comparison />} />
              
              {/* Free Audit Funnel */}
              <Route path="/free-seo-website-audit" element={<AuditFunnel />} />
              
              {/* Project Estimator */}
              <Route path="/project-estimator" element={<ProjectEstimator />} />
              
              {/* Agency Teardown */}
              <Route path="/agency-report-teardown" element={<AgencyTeardown />} />
              <Route path="/agency-report-teardown/thanks" element={<AgencyTeardownThanks />} />
              
              {/* Reporting & Dashboard */}
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/reporting/demo" element={<DashboardDemo />} />
              <Route path="/client" element={<ClientPortal />} />
              
              {/* Landing Page Routes */}
              <Route path="/:serviceSlug/:locationSlug" element={<DynamicLanding />} />
              <Route path="/:serviceSlug/for/:industrySlug" element={<DynamicLanding />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
