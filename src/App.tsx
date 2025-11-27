import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import SEOServices from "./pages/SEOServices";
import PaidMedia from "./pages/PaidMedia";
import WebDesign from "./pages/WebDesign";
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
import PlatformDashboard from "./pages/platform/PlatformDashboard";
import PlatformClients from "./pages/platform/PlatformClients";
import PlatformClientDetail from "./pages/platform/PlatformClientDetail";
import PlatformCampaigns from "./pages/platform/PlatformCampaigns";
import PlatformCampaignDetail from "./pages/platform/PlatformCampaignDetail";
import PlatformSEOWeb from "./pages/platform/PlatformSEOWeb";
import PlatformContent from "./pages/platform/PlatformContent";
import PlatformReporting from "./pages/platform/PlatformReporting";
import PlatformPlaybooks from "./pages/platform/PlatformPlaybooks";
import PlatformSettings from "./pages/platform/PlatformSettings";
import Tools from "./pages/Tools";
import ClientOverview from "./pages/client/ClientOverview";
import ClientAudits from "./pages/client/ClientAudits";
import ClientWebsiteHealth from "./pages/client/ClientWebsiteHealth";
import ClientReporting from "./pages/client/ClientReporting";
import ClientResources from "./pages/client/ClientResources";
import AgencyTeardown from "./pages/AgencyTeardown";
import AgencyTeardownThanks from "./pages/AgencyTeardownThanks";
import WebsitesWeFire from "./pages/WebsitesWeFire";
import MarketingAssets from "./pages/MarketingAssets";
import LocalSEO from "./pages/seo/LocalSEO";
import TechnicalSEO from "./pages/seo/TechnicalSEO";
import ContentSEO from "./pages/seo/ContentSEO";
import AnalyticsTracking from "./pages/seo/AnalyticsTracking";
import WebsiteMigrations from "./pages/seo/WebsiteMigrations";
import SEOGlossary from "./pages/SEOGlossary";
import FAQs from "./pages/FAQs";
import WebsiteHealthCheck from "./pages/WebsiteHealthCheck";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Unauthorized from "./pages/Unauthorized";
import Onboarding from "./pages/Onboarding";

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
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/seo" element={<SEOServices />} />
              <Route path="/services/paid-media" element={<PaidMedia />} />
              <Route path="/services/web-design" element={<WebDesign />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Resources */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
              <Route path="/resources/marketing-assets" element={<MarketingAssets />} />
              <Route path="/resources/seo-glossary" element={<SEOGlossary />} />
              
              {/* SEO Sub-Services */}
              <Route path="/services/seo/local-seo" element={<LocalSEO />} />
              <Route path="/services/seo/technical-seo" element={<TechnicalSEO />} />
              <Route path="/services/seo/content-seo" element={<ContentSEO />} />
              <Route path="/services/seo/analytics-tracking" element={<AnalyticsTracking />} />
              <Route path="/services/seo/website-migrations" element={<WebsiteMigrations />} />
              
              {/* FAQs & Tools */}
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/website-health-check" element={<WebsiteHealthCheck />} />
              
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
              
              {/* Websites We'd Fire */}
              <Route path="/websites-we-would-fire" element={<WebsitesWeFire />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Reporting & Dashboard */}
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/reporting/demo" element={<DashboardDemo />} />
              
              {/* Platform Routes - Protected for internal roles */}
              <Route path="/platform" element={
                <ProtectedRoute>
                  <PlatformDashboard />
                </ProtectedRoute>
              } />
              <Route path="/platform/clients" element={
                <ProtectedRoute>
                  <PlatformClients />
                </ProtectedRoute>
              } />
              <Route path="/platform/clients/:id" element={
                <ProtectedRoute>
                  <PlatformClientDetail />
                </ProtectedRoute>
              } />
              <Route path="/platform/campaigns" element={
                <ProtectedRoute>
                  <PlatformCampaigns />
                </ProtectedRoute>
              } />
              <Route path="/platform/campaigns/:id" element={
                <ProtectedRoute>
                  <PlatformCampaignDetail />
                </ProtectedRoute>
              } />
              <Route path="/platform/seo-web" element={
                <ProtectedRoute>
                  <PlatformSEOWeb />
                </ProtectedRoute>
              } />
              <Route path="/platform/content" element={
                <ProtectedRoute>
                  <PlatformContent />
                </ProtectedRoute>
              } />
              <Route path="/platform/reporting" element={
                <ProtectedRoute>
                  <PlatformReporting />
                </ProtectedRoute>
              } />
              <Route path="/platform/playbooks" element={
                <ProtectedRoute>
                  <PlatformPlaybooks />
                </ProtectedRoute>
              } />
              <Route path="/platform/settings" element={
                <ProtectedRoute>
                  <PlatformSettings />
                </ProtectedRoute>
              } />
              
              {/* Client Portal Routes - Protected for client role */}
              <Route path="/client" element={
                <ProtectedRoute requiredRole="client">
                  <ClientOverview />
                </ProtectedRoute>
              } />
              <Route path="/client/audits" element={
                <ProtectedRoute requiredRole="client">
                  <ClientAudits />
                </ProtectedRoute>
              } />
              <Route path="/client/website-health" element={
                <ProtectedRoute requiredRole="client">
                  <ClientWebsiteHealth />
                </ProtectedRoute>
              } />
              <Route path="/client/reporting" element={
                <ProtectedRoute requiredRole="client">
                  <ClientReporting />
                </ProtectedRoute>
              } />
              <Route path="/client/resources" element={
                <ProtectedRoute requiredRole="client">
                  <ClientResources />
                </ProtectedRoute>
              } />
              
              {/* Tools */}
              <Route path="/tools" element={<Tools />} />
              
              {/* Landing Page Routes */}
              <Route path="/seo-agency/sheffield" element={<DynamicLanding />} />
              <Route path="/seo-agency/london" element={<DynamicLanding />} />
              <Route path="/web-design/sheffield" element={<DynamicLanding />} />
              <Route path="/digital-marketing-agency/yorkshire" element={<DynamicLanding />} />
              <Route path="/digital-marketing-agency/uk" element={<DynamicLanding />} />
              <Route path="/:serviceSlug/:locationSlug" element={<DynamicLanding />} />
              <Route path="/:serviceSlug/for/:industrySlug" element={<DynamicLanding />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
