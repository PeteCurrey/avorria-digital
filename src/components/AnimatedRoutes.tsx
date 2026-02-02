import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Critical path - load immediately
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";

// Lazy load less critical pages
const SEOServices = lazy(() => import("@/pages/SEOServices"));
const SEOAgencyPillar = lazy(() => import("@/pages/SEOAgencyPillar"));
const DigitalMarketingAgencyPillar = lazy(() => import("@/pages/DigitalMarketingAgencyPillar"));
const PaidMediaAgencyPillar = lazy(() => import("@/pages/PaidMediaAgencyPillar"));
const PaidMedia = lazy(() => import("@/pages/PaidMedia"));
const WebDesign = lazy(() => import("@/pages/WebDesign"));
const WebDesignStudio = lazy(() => import("@/pages/WebDesignStudio"));
const WebDesignStudioBuild = lazy(() => import("@/pages/WebDesignStudioBuild"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const ContentEmail = lazy(() => import("@/pages/ContentEmail"));
const SocialPersonalBrand = lazy(() => import("@/pages/SocialPersonalBrand"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const About = lazy(() => import("@/pages/About"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const DynamicLanding = lazy(() => import("@/pages/DynamicLanding"));
const LandingPageDetail = lazy(() => import("@/pages/LandingPageDetail"));
const Resources = lazy(() => import("@/pages/Resources"));
const ResourceDetail = lazy(() => import("@/pages/ResourceDetail"));
const Comparison = lazy(() => import("@/pages/Comparison"));
const WhyAvorria = lazy(() => import("@/pages/WhyAvorria"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AuditFunnel = lazy(() => import("@/pages/AuditFunnel"));
const ProjectEstimator = lazy(() => import("@/pages/ProjectEstimator"));
const Reporting = lazy(() => import("@/pages/Reporting"));
const DashboardDemo = lazy(() => import("@/pages/DashboardDemo"));
const Tools = lazy(() => import("@/pages/Tools"));
const AgencyTeardown = lazy(() => import("@/pages/AgencyTeardown"));
const AgencyTeardownThanks = lazy(() => import("@/pages/AgencyTeardownThanks"));
const WebsitesWeFire = lazy(() => import("@/pages/WebsitesWeFire"));
const MarketingAssets = lazy(() => import("@/pages/MarketingAssets"));
const LocalSEO = lazy(() => import("@/pages/seo/LocalSEO"));
const TechnicalSEO = lazy(() => import("@/pages/seo/TechnicalSEO"));
const ContentSEO = lazy(() => import("@/pages/seo/ContentSEO"));
const AnalyticsTracking = lazy(() => import("@/pages/seo/AnalyticsTracking"));
const WebsiteMigrations = lazy(() => import("@/pages/seo/WebsiteMigrations"));
const SEOGlossary = lazy(() => import("@/pages/SEOGlossary"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const WebsiteHealthCheck = lazy(() => import("@/pages/WebsiteHealthCheck"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const Admin = lazy(() => import("@/pages/Admin"));
const Industries = lazy(() => import("@/pages/Industries"));
const Locations = lazy(() => import("@/pages/Locations"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

// Client pages
const ClientOverview = lazy(() => import("@/pages/client/ClientOverview"));
const ClientAudits = lazy(() => import("@/pages/client/ClientAudits"));
const ClientWebsiteHealth = lazy(() => import("@/pages/client/ClientWebsiteHealth"));
const ClientReporting = lazy(() => import("@/pages/client/ClientReporting"));
const ClientResources = lazy(() => import("@/pages/client/ClientResources"));
const ClientSEOIntelligence = lazy(() => import("@/pages/client/ClientSEOIntelligence"));
const ClientProjects = lazy(() => import("@/pages/client/ClientProjects"));
const ClientProjectDetail = lazy(() => import("@/pages/client/ClientProjectDetail"));
const ClientBilling = lazy(() => import("@/pages/client/ClientBilling"));
const ClientProposals = lazy(() => import("@/pages/client/ClientProposals"));
const ClientDocuments = lazy(() => import("@/pages/client/ClientDocuments"));
const ClientAnalytics = lazy(() => import("@/pages/client/ClientAnalytics"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/seo" element={<PageTransition><SEOServices /></PageTransition>} />
          <Route path="/services/paid-media" element={<PageTransition><PaidMedia /></PageTransition>} />
          <Route path="/services/web-design" element={<PageTransition><WebDesign /></PageTransition>} />
          <Route path="/web-design" element={<PageTransition><WebDesign /></PageTransition>} />
          <Route path="/web-design/studio" element={<PageTransition><WebDesignStudio /></PageTransition>} />
          <Route path="/web-design/studio/build" element={<PageTransition><WebDesignStudioBuild /></PageTransition>} />
          <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
          <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
          <Route path="/services/content-email" element={<PageTransition><ContentEmail /></PageTransition>} />
          <Route path="/services/social-personal-brand" element={<PageTransition><SocialPersonalBrand /></PageTransition>} />
          <Route path="/services/analytics" element={<PageTransition><Analytics /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          
          {/* Resources */}
          <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="/resources/:slug" element={<PageTransition><ResourceDetail /></PageTransition>} />
          <Route path="/resources/marketing-assets" element={<PageTransition><MarketingAssets /></PageTransition>} />
          <Route path="/resources/seo-glossary" element={<PageTransition><SEOGlossary /></PageTransition>} />
          
          {/* SEO Sub-Services */}
          <Route path="/services/seo/local-seo" element={<PageTransition><LocalSEO /></PageTransition>} />
          <Route path="/services/seo/technical-seo" element={<PageTransition><TechnicalSEO /></PageTransition>} />
          <Route path="/services/seo/content-seo" element={<PageTransition><ContentSEO /></PageTransition>} />
          <Route path="/services/seo/analytics-tracking" element={<PageTransition><AnalyticsTracking /></PageTransition>} />
          <Route path="/services/seo/website-migrations" element={<PageTransition><WebsiteMigrations /></PageTransition>} />
          
          {/* FAQs & Tools */}
          <Route path="/faqs" element={<PageTransition><FAQs /></PageTransition>} />
          <Route path="/website-health-check" element={<PageTransition><WebsiteHealthCheck /></PageTransition>} />
          
          {/* Industries & Locations Hub Pages */}
          <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
          <Route path="/locations" element={<PageTransition><Locations /></PageTransition>} />
          <Route path="/sitemap" element={<PageTransition><Sitemap /></PageTransition>} />
          
          {/* Why Avorria */}
          <Route path="/why-avorria" element={<PageTransition><WhyAvorria /></PageTransition>} />
          <Route path="/why/:slug" element={<PageTransition><Comparison /></PageTransition>} />
          
          {/* Free Audit Funnel */}
          <Route path="/free-seo-website-audit" element={<PageTransition><AuditFunnel /></PageTransition>} />
          
          {/* Project Estimator */}
          <Route path="/project-estimator" element={<PageTransition><ProjectEstimator /></PageTransition>} />
          
          {/* Agency Teardown */}
          <Route path="/agency-report-teardown" element={<PageTransition><AgencyTeardown /></PageTransition>} />
          <Route path="/agency-report-teardown/thanks" element={<PageTransition><AgencyTeardownThanks /></PageTransition>} />
          
          {/* Websites We'd Fire */}
          <Route path="/websites-we-would-fire" element={<PageTransition><WebsitesWeFire /></PageTransition>} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/auth/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <PageTransition><Onboarding /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<PageTransition><Unauthorized /></PageTransition>} />
          
          {/* Admin Route - Protected */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <PageTransition><Admin /></PageTransition>
            </ProtectedRoute>
          } />

          {/* Reporting & Dashboard */}
          <Route path="/reporting" element={<PageTransition><Reporting /></PageTransition>} />
          <Route path="/reporting/demo" element={<PageTransition><DashboardDemo /></PageTransition>} />
          
          {/* Client Portal Routes */}
          <Route path="/client" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientOverview /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/audits" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientAudits /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/website-health" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientWebsiteHealth /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/reporting" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientReporting /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/resources" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientResources /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/seo-intelligence" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientSEOIntelligence /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/projects" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientProjects /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/projects/:id" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientProjectDetail /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/billing" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientBilling /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/proposals" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientProposals /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/documents" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientDocuments /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/client/analytics" element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientAnalytics /></PageTransition>
            </ProtectedRoute>
          } />
          
          {/* Tools */}
          <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
          
          {/* Service Pillar Pages */}
          <Route path="/seo-agency" element={<PageTransition><SEOAgencyPillar /></PageTransition>} />
          <Route path="/digital-marketing-agency" element={<PageTransition><DigitalMarketingAgencyPillar /></PageTransition>} />
          <Route path="/paid-media-agency" element={<PageTransition><PaidMediaAgencyPillar /></PageTransition>} />
          
          {/* Service-Industry Landing Pages (/lp/slug) */}
          <Route path="/lp/:slug" element={<PageTransition><LandingPageDetail /></PageTransition>} />
          
          {/* Dynamic Location Landing Pages - Support both slash and hyphen patterns */}
          <Route path="/seo-agency/:locationSlug" element={<PageTransition><DynamicLanding /></PageTransition>} />
          <Route path="/digital-marketing-agency/:locationSlug" element={<PageTransition><DynamicLanding /></PageTransition>} />
          <Route path="/paid-media-agency/:locationSlug" element={<PageTransition><DynamicLanding /></PageTransition>} />
          <Route path="/web-design/:locationSlug" element={<PageTransition><DynamicLanding /></PageTransition>} />
          
          {/* Industry-specific routes */}
          <Route path="/:serviceSlug/for/:industrySlug" element={<PageTransition><DynamicLanding /></PageTransition>} />
          
          {/* Audit Funnel - alternate URL */}
          <Route path="/audit-funnel" element={<PageTransition><AuditFunnel /></PageTransition>} />
          
          {/* Catch-all */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;