'use client';
import Navigate from '@/components/Navigate';
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { LandingPage } from "@/types/landingPage";
import { Service } from "@/data/services";
import { Location } from "@/data/locations";

interface DynamicLandingProps {
  landingPage?: LandingPage | null;
  service?: Service | null;
  location?: Location | null;
}

/**
 * Client component that renders a resolved landing page.
 * Data must be resolved server-side and passed as props — NOT via useParams().
 * This ensures content is present in SSR HTML for Google to index.
 */
const DynamicLanding = ({ landingPage, service, location }: DynamicLandingProps) => {
  // If landing page exists, render it
  if (landingPage) {
    return <LandingPageTemplate page={landingPage} />;
  }

  // If components don't exist, show 404
  if (!service || !location) {
    return <Navigate href="/404" replace />;
  }

  // Redirect to main service page
  return <Navigate href={service.pillarPageUrl} replace />;
};

export default DynamicLanding;
