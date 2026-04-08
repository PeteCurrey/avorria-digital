'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SELF_CONTAINED_PREFIXES = ["/client", "/admin", "/web-design/studio/build"];

const HERO_PAGES = [
  "/web-design/studio",
  "/services",
  "/services/seo",
  "/services/paid-media",
  "/services/content-email",
  "/services/social-personal-brand",
  "/services/analytics",
  "/about",
  "/contact",
  "/seo-agency",
  "/digital-marketing-agency",
  "/paid-media-agency",
  "/web-design",
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isSelfContained = pathname && SELF_CONTAINED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isSelfContained) {
    return <>{children}</>;
  }

  const isLocationPage =
    pathname && /^\/(seo-agency|digital-marketing-agency|paid-media-agency|web-design)\/[^/]+$/.test(
      pathname
    );

  const isHeroPage =
    pathname && (HERO_PAGES.includes(pathname) ||
    pathname.startsWith("/case-studies") ||
    isLocationPage);

  return (
    <>
      <Navigation transparent={isHomePage || !!isHeroPage} />
      {children}
      <Footer />
    </>
  );
}
