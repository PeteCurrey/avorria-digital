'use client';
import { usePathname } from 'next/navigation';import React, { lazy, Suspense } from "react";

import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Critical path - load immediately
import Home from "@/views/Home";
import Services from "@/views/Services";
import Contact from "@/views/Contact";
import CaseStudies from "@/views/CaseStudies";

// Lazy load less critical pages
const SEOServices = lazy(() => import("@/views/SEOServices"));
const SEOAgencyPillar = lazy(() => import("@/views/SEOAgencyPillar"));
const DigitalMarketingAgencyPillar = lazy(() => import("@/views/DigitalMarketingAgencyPillar"));
const PaidMediaAgencyPillar = lazy(() => import("@/views/PaidMediaAgencyPillar"));
const PaidMedia = lazy(() => import("@/views/PaidMedia"));
const WebDesign = lazy(() => import("@/views/WebDesign"));
const WebDesignStudio = lazy(() => import("@/views/WebDesignStudio"));
const WebDesignStudioBuild = lazy(() => import("@/views/WebDesignStudioBuild"));
const CaseStudyDetail = lazy(() => import("@/views/CaseStudyDetail"));
const ContentEmail = lazy(() => import("@/views/ContentEmail"));
const SocialPersonalBrand = lazy(() => import("@/views/SocialPersonalBrand"));
const Analytics = lazy(() => import("@/views/Analytics"));
const Privacy = lazy(() => import("@/views/Privacy"));
const Terms = lazy(() => import("@/views/Terms"));
const About = lazy(() => import("@/views/About"));
const Pricing = lazy(() => import("@/views/Pricing"));
const DynamicLanding = lazy(() => import("@/views/DynamicLanding"));
const LandingPageDetail = lazy(() => import("@/views/LandingPageDetail"));
const Resources = lazy(() => import("@/views/Resources"));
const ResourceDetail = lazy(() => import("@/views/ResourceDetail"));
const Comparison = lazy(() => import("@/views/Comparison"));
const WhyAvorria = lazy(() => import("@/views/WhyAvorria"));
const NotFound = lazy(() => import("@/views/NotFound"));
const AuditFunnel = lazy(() => import("@/views/AuditFunnel"));
const ProjectEstimator = lazy(() => import("@/views/ProjectEstimator"));
const Reporting = lazy(() => import("@/views/Reporting"));
const DashboardDemo = lazy(() => import("@/views/DashboardDemo"));
const Tools = lazy(() => import("@/views/Tools"));
const AgencyTeardown = lazy(() => import("@/views/AgencyTeardown"));
const AgencyTeardownThanks = lazy(() => import("@/views/AgencyTeardownThanks"));
const WebsitesWeFire = lazy(() => import("@/views/WebsitesWeFire"));
const MarketingAssets = lazy(() => import("@/views/MarketingAssets"));
const LocalSEO = lazy(() => import("@/views/seo/LocalSEO"));
const TechnicalSEO = lazy(() => import("@/views/seo/TechnicalSEO"));
const ContentSEO = lazy(() => import("@/views/seo/ContentSEO"));
const AnalyticsTracking = lazy(() => import("@/views/seo/AnalyticsTracking"));
const WebsiteMigrations = lazy(() => import("@/views/seo/WebsiteMigrations"));
const SEOGlossary = lazy(() => import("@/views/SEOGlossary"));
const FAQs = lazy(() => import("@/views/FAQs"));
const WebsiteHealthCheck = lazy(() => import("@/views/WebsiteHealthCheck"));
const Login = lazy(() => import("@/views/auth/Login"));
const Signup = lazy(() => import("@/views/auth/Signup"));
const Unauthorized = lazy(() => import("@/views/Unauthorized"));
const Onboarding = lazy(() => import("@/views/Onboarding"));
const Admin = lazy(() => import("@/views/Admin"));
const Industries = lazy(() => import("@/views/Industries"));
const Locations = lazy(() => import("@/views/Locations"));
const Sitemap = lazy(() => import("@/views/Sitemap"));

// Client pages
const ClientOverview = lazy(() => import("@/views/client/ClientOverview"));
const ClientAudits = lazy(() => import("@/views/client/ClientAudits"));
const ClientWebsiteHealth = lazy(() => import("@/views/client/ClientWebsiteHealth"));
const ClientReporting = lazy(() => import("@/views/client/ClientReporting"));
const ClientResources = lazy(() => import("@/views/client/ClientResources"));
const ClientSEOIntelligence = lazy(() => import("@/views/client/ClientSEOIntelligence"));
const ClientProjects = lazy(() => import("@/views/client/ClientProjects"));
const ClientProjectDetail = lazy(() => import("@/views/client/ClientProjectDetail"));
const ClientBilling = lazy(() => import("@/views/client/ClientBilling"));
const ClientProposals = lazy(() => import("@/views/client/ClientProposals"));
const ClientDocuments = lazy(() => import("@/views/client/ClientDocuments"));
const ClientAnalytics = lazy(() => import("@/views/client/ClientAnalytics"));

const PageLoader = () => (
 <div className="min-h-screen flex items-center justify-center bg-background">
  <Loader2 className="h-8 w-8 animate-spin text-accent" />
 </div>
);

const AnimatedRoutes = () => {
 const pathname = usePathname();

 return (
  <AnimatePresence mode="wait">
   <Suspense fallback={<PageLoader />}>
    <Routes location={location} key={pathname}>
     <Route path="/" element={<PageTransition><Home /></PageTransition>} />
     <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
     <Route path="/services/seo" element={<PageTransition><SEOServices /></PageTransition>} />
     <Route path="/services/paid-media" element={<PageTransition><PaidMedia /></PageTransition>} />
     <Route path="/web-design" element={<PageTransition><WebDesign /></PageTransition>} />
     <Route path="/services/web-design" element={<Navigate href="/web-design" replace />} />
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
     <Route path="/resources/marketing-assets" element={
      <ProtectedRoute allowStaff>
       <PageTransition><MarketingAssets /></PageTransition>
      </ProtectedRoute>
     } />
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
     
     {/* Admin Route - Protected for staff only */}
     <Route path="/admin" element={
      <ProtectedRoute allowStaff>
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

