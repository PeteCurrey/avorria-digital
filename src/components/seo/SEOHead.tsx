'use client';
import React from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  type?: "website" | "article" | "product" | "service";
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

// In Next.js, SEO metadata is handled via the metadata export in page.tsx or generateMetadata.
// This component is a no-op shim to prevent runtime errors for pages that still use it.
// It renders nothing (head tags are managed by Next.js).
export const SEOHead = ({ children }: SEOHeadProps) => {
  return <>{children}</>;
};

export default SEOHead;

