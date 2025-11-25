import { useParams, Navigate } from "react-router-dom";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { getLandingPageBySlug } from "@/data/landingPages";
import { getServiceBySlug } from "@/data/services";
import { getLocationBySlug } from "@/data/locations";
import { getIndustryBySlug } from "@/data/industries";

const DynamicLanding = () => {
  const { serviceSlug, locationSlug, industrySlug } = useParams();

  // Try to find an existing landing page first
  let landingPage = null;

  if (serviceSlug && locationSlug) {
    landingPage = getLandingPageBySlug(`${serviceSlug}-${locationSlug}`);
  } else if (serviceSlug && industrySlug) {
    landingPage = getLandingPageBySlug(`${serviceSlug}-${industrySlug}`);
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
