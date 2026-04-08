'use client';
import Navigate from '@/components/Navigate';
import { useParams,   } from "next/navigation";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { getLandingPageBySlug } from "@/data/landingPages";
import { getServiceBySlug } from "@/data/services";
import { getLocationBySlug } from "@/data/locations";
import { getIndustryBySlug } from "@/data/industries";
import { getServiceLocationPageBySlug } from "@/data/serviceLocationLandingPages";

const DynamicLanding = () => {
  const { locationSlug, industrySlug } = useParams();
  
  // Get service slug from URL path
  const pathSegments = window.pathname.split('/').filter(Boolean);
  const urlServiceSlug = pathSegments[0];

  // Map URL service slugs to internal service slugs
  const serviceMapping: Record<string, string> = {
    'seo-agency': 'seo',
    'seo': 'seo',
    'web-design': 'web-design',
    'digital-marketing-agency': 'digital-marketing',
    'digital-marketing': 'digital-marketing',
    'paid-media': 'paid-media',
    'paid-media-agency': 'paid-media',
  };

  const internalServiceSlug = serviceMapping[urlServiceSlug] || urlServiceSlug;

  // Try to find a landing page
  let landingPage = null;

  if (locationSlug && internalServiceSlug) {
    // Try service-location combo
    const potentialSlug = `${internalServiceSlug}-${locationSlug}`;
    landingPage = getServiceLocationPageBySlug(potentialSlug);
    
    if (!landingPage) {
      landingPage = getLandingPageBySlug(potentialSlug);
    }
  } else if (industrySlug && internalServiceSlug) {
    landingPage = getLandingPageBySlug(`${internalServiceSlug}-${industrySlug}`);
  }

  // If landing page exists, render it
  if (landingPage) {
    return <LandingPageTemplate page={landingPage} />;
  }

  // Verify components exist
  const service = internalServiceSlug ? getServiceBySlug(internalServiceSlug) : null;
  const location = locationSlug ? getLocationBySlug(locationSlug) : null;
  const industry = industrySlug ? getIndustryBySlug(industrySlug) : null;

  // If components don't exist, show 404
  if (!service || (locationSlug && !location) || (industrySlug && !industry)) {
    return <Navigate href="/404" replace />;
  }

  // Redirect to main service page
  return <Navigate href={service.pillarPageUrl} replace />;
};

export default DynamicLanding;

