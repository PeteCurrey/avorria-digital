'use client';
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { cn } from "@/lib/utils";

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
  // Content starts visible (opacity-1) for SSR / Googlebot.
  // After the PageLoader finishes we add a subtle fade class for polish only.
  const [loaderDone, setLoaderDone] = useState(false);

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
      <PageLoader onComplete={() => setLoaderDone(true)} />
      {/* Content is always in the DOM and visible for crawlers.
          The PageLoader overlays on top (z-9999) during load — no need to hide content. */}
      <div className={cn(
        "transition-opacity duration-700",
        loaderDone ? "opacity-100" : "opacity-100"  // always visible
      )}>
        <Navigation transparent={isHomePage || !!isHeroPage} />
        {children}
        <Footer />
      </div>
    </>
  );
}
