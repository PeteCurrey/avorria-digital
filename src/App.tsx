import { lazy, Suspense } from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";
import { Loader2 } from "lucide-react";

// Critical path - load immediately
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";

// Lazy load less critical pages for better initial bundle size
const SEOServices = lazy(() => import("./pages/SEOServices"));
const PaidMedia = lazy(() => import("./pages/PaidMedia"));
const WebDesign = lazy(() => import("./pages/WebDesign"));
const WebDesignStudio = lazy(() => import("./pages/WebDesignStudio"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const ContentEmail = lazy(() => import("./pages/ContentEmail"));
const SocialPersonalBrand = lazy(() => import("./pages/SocialPersonalBrand"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const DynamicLanding = lazy(() => import("./pages/DynamicLanding"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));
const Comparison = lazy(() => import("./pages/Comparison"));
const WhyAvorria = lazy(() => import("./pages/WhyAvorria"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AuditFunnel = lazy(() => import("./pages/AuditFunnel"));
const ProjectEstimator = lazy(() => import("./pages/ProjectEstimator"));
const Reporting = lazy(() => import("./pages/Reporting"));
const DashboardDemo = lazy(() => import("./pages/DashboardDemo"));
const Tools = lazy(() => import("./pages/Tools"));
const AgencyTeardown = lazy(() => import("./pages/AgencyTeardown"));
const AgencyTeardownThanks = lazy(() => import("./pages/AgencyTeardownThanks"));
const WebsitesWeFire = lazy(() => import("./pages/WebsitesWeFire"));
const MarketingAssets = lazy(() => import("./pages/MarketingAssets"));
const LocalSEO = lazy(() => import("./pages/seo/LocalSEO"));
const TechnicalSEO = lazy(() => import("./pages/seo/TechnicalSEO"));
const ContentSEO = lazy(() => import("./pages/seo/ContentSEO"));
const AnalyticsTracking = lazy(() => import("./pages/seo/AnalyticsTracking"));
const WebsiteMigrations = lazy(() => import("./pages/seo/WebsiteMigrations"));
const SEOGlossary = lazy(() => import("./pages/SEOGlossary"));
const FAQs = lazy(() => import("./pages/FAQs"));
const WebsiteHealthCheck = lazy(() => import("./pages/WebsiteHealthCheck"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Admin = lazy(() => import("./pages/Admin"));

// Platform pages - lazy load all
const PlatformDashboard = lazy(() => import("./pages/platform/PlatformDashboard"));
const PlatformClients = lazy(() => import("./pages/platform/PlatformClients"));
const PlatformClientDetail = lazy(() => import("./pages/platform/PlatformClientDetail"));
const PlatformCampaigns = lazy(() => import("./pages/platform/PlatformCampaigns"));
const PlatformCampaignDetail = lazy(() => import("./pages/platform/PlatformCampaignDetail"));
const PlatformSEOWeb = lazy(() => import("./pages/platform/PlatformSEOWeb"));
const PlatformContent = lazy(() => import("./pages/platform/PlatformContent"));
const PlatformReporting = lazy(() => import("./pages/platform/PlatformReporting"));
const PlatformPlaybooks = lazy(() => import("./pages/platform/PlatformPlaybooks"));
const PlatformSettings = lazy(() => import("./pages/platform/PlatformSettings"));
const PlatformCaseStudies = lazy(() => import("./pages/platform/PlatformCaseStudies"));

// Client pages - lazy load all
const ClientOverview = lazy(() => import("./pages/client/ClientOverview"));
const ClientAudits = lazy(() => import("./pages/client/ClientAudits"));
const ClientWebsiteHealth = lazy(() => import("./pages/client/ClientWebsiteHealth"));
const ClientReporting = lazy(() => import("./pages/client/ClientReporting"));
const ClientResources = lazy(() => import("./pages/client/ClientResources"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isStudioPage = location.pathname === "/web-design/studio";
  const isCaseStudyPage = location.pathname.startsWith("/case-studies");

  return (
    <>
      {!isHomePage && <Navigation transparent={isStudioPage || isCaseStudyPage} />}
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
            <ScrollToTop />
            <BackToTop />
            <CookieConsent />
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/seo" element={<SEOServices />} />
                <Route path="/services/paid-media" element={<PaidMedia />} />
                <Route path="/services/web-design" element={<WebDesign />} />
                <Route path="/web-design" element={<WebDesign />} />
                <Route path="/web-design/studio" element={<WebDesignStudio />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                <Route path="/services/content-email" element={<ContentEmail />} />
                <Route path="/services/social-personal-brand" element={<SocialPersonalBrand />} />
                <Route path="/services/analytics" element={<Analytics />} />
                <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
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
              
              {/* Admin Route */}
              <Route path="/admin" element={<Admin />} />

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
              <Route path="/platform/case-studies" element={
                <ProtectedRoute>
                  <PlatformCaseStudies />
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
              </Suspense>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
