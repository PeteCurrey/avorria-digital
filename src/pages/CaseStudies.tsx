import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { caseStudies, getFeaturedCaseStudies, filterOptions } from "@/data/caseStudies";
import { CaseHero } from "@/components/case-studies/CaseHero";
import { CaseFeaturedCarousel } from "@/components/case-studies/CaseFeaturedCarousel";
import { CaseFilterBar } from "@/components/case-studies/CaseFilterBar";
import { CaseGrid } from "@/components/case-studies/CaseGrid";

interface FilterState {
  sector: string;
  service: string;
  outcome: string;
  year: string;
}

const CaseStudies = () => {
  const [filters, setFilters] = useState<FilterState>({
    sector: "all",
    service: "all",
    outcome: "all",
    year: "all",
  });

  const featuredCases = getFeaturedCaseStudies();

  // Track page view
  useEffect(() => {
    trackEvent("case_lobby_viewed", {});
  }, []);

  // Filter cases
  const filteredCases = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (filters.sector !== "all" && cs.sector !== filters.sector) return false;
      if (filters.service !== "all" && !cs.services.includes(filters.service)) return false;
      if (filters.outcome !== "all" && cs.outcome !== filters.outcome) return false;
      if (filters.year !== "all" && cs.year.toString() !== filters.year) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ sector: "all", service: "all", outcome: "all", year: "all" });
  };

  const handleTileClick = (slug: string) => {
    trackEvent("case_tile_clicked", { case_slug: slug });
  };

  return (
    <>
      <Helmet>
        <title>Case Studies – Proven Results | Avorria</title>
        <meta name="description" content="Real client success stories. See how we've driven leads, revenue, and growth for businesses across industries." />
        <link rel="canonical" href="https://avorria.com/case-studies" />
      </Helmet>

      <div className="min-h-screen bg-[hsl(220,25%,8%)]">
        {/* Hero */}
        <CaseHero
          isLobby
          headline="Our Work"
          subheadline="Real results for real businesses. Every case study represents a partnership built on strategy, execution, and measurable outcomes."
          ctaText="Start your project"
          ctaHref="/contact"
          backgroundMedia={{
            type: "image",
            src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
          }}
        />

        {/* Featured Carousel */}
        <CaseFeaturedCarousel
          cases={featuredCases}
          onCaseClick={handleTileClick}
        />

        {/* Filter Bar */}
        <CaseFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          options={filterOptions}
          resultCount={filteredCases.length}
        />

        {/* Case Grid */}
        <CaseGrid cases={filteredCases} onTileClick={handleTileClick} />

        {/* Footer CTA */}
        <section className="py-24 px-6 section-gradient">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Ready to become our next success story?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Whether you need a complete digital transformation or targeted improvements, we'll build a strategy around your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book a strategy call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10">
                <Link to="/web-design/studio">Try the Studio</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;
