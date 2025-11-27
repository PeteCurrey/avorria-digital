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
import PlatformSEOWeb from "./pages/platform/PlatformSEOWeb";
import PlatformContent from "./pages/platform/PlatformContent";
import PlatformReporting from "./pages/platform/PlatformReporting";
import PlatformPlaybooks from "./pages/platform/PlatformPlaybooks";
import Tools from "./pages/Tools";
import ClientOverview from "./pages/client/ClientOverview";
import ClientAudits from "./pages/client/ClientAudits";
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
              
              {/* Reporting & Dashboard */}
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/reporting/demo" element={<DashboardDemo />} />
              
              {/* Platform Routes */}
              <Route path="/platform" element={<PlatformDashboard />} />
              <Route path="/platform/clients" element={<PlatformClients />} />
              <Route path="/platform/clients/:id" element={<PlatformClientDetail />} />
              <Route path="/platform/campaigns" element={<PlatformCampaigns />} />
              <Route path="/platform/seo-web" element={<PlatformSEOWeb />} />
              <Route path="/platform/content" element={<PlatformContent />} />
              <Route path="/platform/reporting" element={<PlatformReporting />} />
              <Route path="/platform/playbooks" element={<PlatformPlaybooks />} />
              
              {/* Client Portal Routes */}
              <Route path="/client" element={<ClientOverview />} />
              <Route path="/client/audits" element={<ClientAudits />} />
              
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
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
