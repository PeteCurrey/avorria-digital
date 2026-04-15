import { LandingPage } from "@/types/landingPage";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { notFound } from "next/navigation";

interface LandingPageDetailProps {
  landingPage: LandingPage | null;
}

/**
 * Handles /lp/:slug routes for service-industry landing pages.
 * Receives pre-resolved landing page data from the Server Component.
 * This ensures content is present in SSR HTML for Googlebot to index.
 */
const LandingPageDetail = ({ landingPage }: LandingPageDetailProps) => {
  if (!landingPage) {
    notFound();
    return null;
  }

  return <LandingPageTemplate page={landingPage} />;
};

export default LandingPageDetail;
