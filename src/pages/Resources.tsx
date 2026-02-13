import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Growth Playbooks & Guides | Avorria Resources</title>
        <meta
          name="description"
          content="Operator-level guides on SEO, paid media, web, content and analytics. Playbooks, field notes and deep dives used to run real growth systems."
        />
        <meta property="og:title" content="Growth Playbooks & Guides | Avorria Resources" />
        <meta property="og:description" content="Operator-level guides on SEO, paid media, web, content and analytics." />
        <meta property="og:url" content="https://avorria.com/resources" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://avorria.com/resources" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: pillarGuides.map((guide, index) => ({
              "@type": "Article",
              position: index + 1,
              name: guide.title,
              description: guide.summary,
              url: `https://avorria.com/resources/${guide.slug}`,
            })),
          })}
        </script>
      </Helmet>

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
                Operator-level guides on SEO, paid, web and analytics — built from doing this work every day, not theory.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Pillar Guides Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <FileText className="text-accent" size={24} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">Core Playbooks</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
                Our flagship guides. Everything you need to know about SEO, high-converting websites, and marketing analytics — without the waffle.
              </p>
            </ScrollReveal>

            <ScrollRevealGrid className="grid md:grid-cols-3 gap-8" stagger={100}>
              {pillarGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group card-glow"
                >
                  <CardContent className="p-8">
                    <Badge className={categoryBadgeColors[guide.category] || "bg-accent/10 text-accent border-accent/30"}>
                      {guide.category}
                    </Badge>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 mt-4 group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {guide.summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <Clock size={16} />
                      <span>{guide.readingTime} min read</span>
                    </div>
                    <Button variant="outline" asChild className="w-full group-hover:border-accent/50">
                      <Link
                        to={`/resources/${guide.slug}`}
                        onClick={() =>
                          trackEvent(EVENTS.RESOURCE_OPENED, {
                            resource_slug: guide.slug,
                            resource_type: "pillar",
                            channel: guide.category.toLowerCase(),
                          })
                        }
                        className="group/link"
                      >
                        Read Guide
                        <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-[var(--duration-fast)]" size={18} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
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
                  className={`border-border border-l-4 ${categoryColors[resource.category] || "border-l-accent"} hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 group`}
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
                      <Link to={`/resources/${resource.slug}`}>{resource.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {resource.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/resources/${resource.slug}`}
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
                <Link to="/contact" onClick={() => trackCTAClick("book_strategy_call", "/contact", "resources_cta")}>
                  Book Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services" onClick={() => trackCTAClick("view_services", "/services", "resources_cta")}>
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
