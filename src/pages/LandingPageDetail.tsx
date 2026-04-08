'use client';
import Navigate from '@/components/Navigate';
import { useParams,   } from "next/navigation";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { getLandingPageBySlug } from "@/data/landingPages";

/**
 * Handles /lp/:slug routes for service-industry landing pages
 * Maps slugs like "seo-trades-home-services" to the corresponding landing page
 */
const LandingPageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate href="/404" replace />;
  }

  // Try to find a landing page with this slug
  const landingPage = getLandingPageBySlug(slug);

  if (!landingPage) {
    // No matching landing page found
    return <Navigate href="/404" replace />;
  }

  return <LandingPageTemplate page={landingPage} />;
};

export default LandingPageDetail;

