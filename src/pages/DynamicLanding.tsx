import { useParams, Navigate } from "react-router-dom";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { getLandingPageBySlug } from "@/data/landingPages";
import { getServiceBySlug } from "@/data/services";
import { getLocationBySlug } from "@/data/locations";
import { getIndustryBySlug } from "@/data/industries";
import { getServiceLocationPageBySlug } from "@/data/serviceLocationLandingPages";

const DynamicLanding = () => {
  const { serviceSlug, locationSlug, industrySlug } = useParams();

  // Try to find an existing landing page first
  let landingPage = null;

  // First, try to match by combined slug pattern (service-location or service-industry)
  if (serviceSlug && locationSlug) {
    // Try direct service-location match first
    landingPage = getServiceLocationPageBySlug(`${serviceSlug}-${locationSlug}`);
    
    // If not found, try the general landing pages
    if (!landingPage) {
      landingPage = getLandingPageBySlug(`${serviceSlug}-${locationSlug}`);
    }
  } else if (serviceSlug && industrySlug) {
    landingPage = getLandingPageBySlug(`${serviceSlug}-${industrySlug}`);
  }

  // If no match found, try to construct and match exact URL path as slug
  // This handles custom URL patterns like /seo-agency/sheffield
  if (!landingPage) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 2) {
      // Handle patterns like /seo-agency/sheffield -> seo-sheffield
      const serviceMapping: Record<string, string> = {
        'seo-agency': 'seo',
        'seo': 'seo',
        'web-design': 'web-design',
        'digital-marketing-agency': 'digital-marketing',
        'digital-marketing': 'digital-marketing',
        'paid-media': 'paid-media',
        'paid-media-agency': 'paid-media',
      };
      
      const mappedService = serviceMapping[pathSegments[0]];
      if (mappedService) {
        const potentialSlug = `${mappedService}-${pathSegments[1]}`;
        landingPage = getServiceLocationPageBySlug(potentialSlug);
        
        if (!landingPage) {
          landingPage = getLandingPageBySlug(potentialSlug);
        }
      }
    }
  }

  // If landing page exists, render it
  if (landingPage) {
    return <LandingPageTemplate page={landingPage} />;
  }

  // If no pre-built landing page, verify components exist
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null;
  const location = locationSlug ? getLocationBySlug(locationSlug) : null;
  const industry = industrySlug ? getIndustryBySlug(industrySlug) : null;

  // If components don't exist, show 404
  if (!service || (locationSlug && !location) || (industrySlug && !industry)) {
    return <Navigate to="/404" replace />;
  }

  // For now, redirect to the main service page
  // In a full implementation, you could generate a page dynamically here
  return <Navigate to={service.pillarPageUrl} replace />;
};

export default DynamicLanding;
