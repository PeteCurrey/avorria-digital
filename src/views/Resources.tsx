'use client';
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, BookOpen, FileText, Mail } from "lucide-react";
import { resources, getPillarResources, getResourceCategories } from "@/data/resources";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { trackEvent, EVENTS, trackCTAClick } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GradientMesh from "@/components/GradientMesh";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const categoryColors: Record<string, string> = {
  SEO: "border-l-emerald-500",
  "Web Design": "border-l-blue-500",
  Analytics: "border-l-purple-500",
  "Paid Media": "border-l-orange-500",
  Strategy: "border-l-pink-500",
};

const categoryBadgeColors: Record<string, string> = {
  SEO: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
  "Web Design": "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400",
  Analytics: "bg-purple-500/15 text-purple-600 border-purple-500/30 dark:text-purple-400",
  "Paid Media": "bg-orange-500/15 text-orange-600 border-orange-500/30 dark:text-orange-400",
  Strategy: "bg-pink-500/15 text-pink-600 border-pink-500/30 dark:text-pink-400",
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const pillarGuides = getPillarResources();
  const categories = getResourceCategories();

  const filteredResources = activeCategory
    ? resources.filter((r) => r.category === activeCategory)
    : resources;

  const getCategoryCount = (category: string) =>
    resources.filter((r) => r.category === category).length;

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: newsletterEmail, name: null });
      if (error) throw error;
      toast({ title: "Subscribed!", description: "You'll get new playbooks in your inbox." });
      setNewsletterEmail("");
    } catch {
      toast({ title: "Already subscribed", description: "Looks like you're already on the list." });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <>
      
      <BreadcrumbSchema items={[{ name: "Home", url: "https://avorria.com" }, { name: "Resources", url: "https://avorria.com/resources" }]} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <GradientMesh className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <BookOpen className="text-accent" size={20} />
                <span className="text-sm font-semibold text-accent">Operator-Level Guides</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground">
                Playbooks, field notes<br className="hidden md:block" /> & deep dives.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
                Operator-level guides on SEO, paid, web and analytics — built from doing this work every day, not theory.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Pillar Guides Section */}
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.08),transparent_60%)]" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">Flagship Guides</Badge>
                <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-4">Core Playbooks</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about SEO, high-converting websites, and marketing analytics — without the waffle.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid className="grid md:grid-cols-3 gap-8" stagger={120}>
              {pillarGuides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/resources/${guide.slug}`}
                  onClick={() =>
                    trackEvent(EVENTS.RESOURCE_OPENED, {
                      resource_slug: guide.slug,
                      resource_type: "pillar",
                      channel: guide.category.toLowerCase(),
                    })
                  }
                  className="block group"
                >
                  <div className="relative h-full rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/30 overflow-hidden">
                    {/* Gradient accent top edge */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                    <Badge className={`w-fit mb-5 ${categoryBadgeColors[guide.category] || "bg-accent/10 text-accent border-accent/30"}`}>
                      {guide.category}
                    </Badge>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 flex-grow-0">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {guide.summary}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        <span>{guide.readingTime} min read</span>
                      </div>
                      <span className="inline-flex items-center text-sm font-medium text-accent">
                        Read Guide
                        <ArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </ScrollRevealGrid>
          </div>
        </section>

        {/* Newsletter Strip */}
        <section className="py-16 px-6 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border-y border-accent/10">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="text-accent" size={20} />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Newsletter</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Get new playbooks in your inbox</h3>
            <p className="text-muted-foreground mb-6">No spam. Just operator-level guides, delivered when we publish.</p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" variant="accent" disabled={subscribing}>
                {subscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>

        {/* All Resources Section */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold text-foreground mb-8">All Resources</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Button
                variant={activeCategory === null ? "accent" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All ({resources.length})
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "accent" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category} ({getCategoryCount(category)})
                </Button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`border-border border-l-4 ${categoryColors[resource.category] || "border-l-accent"} hover:shadow-[var(--shadow-card-hover)] transition-all [transition-duration:var(--duration-base)] hover:-translate-y-0.5 group`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={categoryBadgeColors[resource.category] || "bg-accent/10 text-accent"}>
                        {resource.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={14} />
                        <span>{resource.readingTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                      <Link href={`/resources/${resource.slug}`}>{resource.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {resource.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/resources/${resource.slug}`}
                        className="text-accent text-sm font-medium hover:underline inline-flex items-center"
                      >
                        Read More
                        <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                      {resource.isPillar && (
                        <Badge variant="outline" className="text-xs">Pillar Guide</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-light mb-6 text-foreground">
              Want this expertise working for you?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              These guides are free. But if you'd rather have us implement them for your business, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact" onClick={() => trackCTAClick("book_strategy_call", "/contact", "resources_cta")}>
                  Book Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services" onClick={() => trackCTAClick("view_services", "/services", "resources_cta")}>
                  View Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Resources;


