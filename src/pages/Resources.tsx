import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BookOpen, FileText, Zap } from "lucide-react";
import { resources, getPillarResources } from "@/data/resources";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";

const Resources = () => {
  const pillarGuides = getPillarResources();
  const allResources = resources;

  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <>
      <Helmet>
        <title>Resources & Guides | Avorria</title>
        <meta
          name="description"
          content="Digital marketing guides, playbooks and resources for business owners. No fluff—just practical advice on SEO, web design, paid media and analytics."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-secondary to-background relative overflow-hidden">
          {/* Subtle gradient mesh */}
          <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full">
                <BookOpen className="text-accent" size={20} />
                <span className="text-sm font-semibold text-accent">Operator-Level Guides</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground">
                Playbooks, field notes & deep dives.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
                Operator-level guides on SEO, paid, web and analytics – built from doing this work every day, not theory.
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
                Our flagship guides. Everything you need to know about SEO, high-converting websites, and marketing
                analytics—without the waffle.
              </p>
            </ScrollReveal>

            <ScrollRevealGrid className="grid md:grid-cols-3 gap-8" stagger={100}>
              {pillarGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group"
                >
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/30">{guide.category}</Badge>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-[var(--duration-base)]">
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
                      <Link to={`/resources/${guide.slug}`} className="group/link">
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

        {/* All Resources Section */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold text-foreground mb-8">All Resources</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Button variant="outline" size="sm">
                All
              </Button>
              {categories.map((category) => (
                <Button key={category} variant="ghost" size="sm">
                  {category}
                </Button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {allResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="border-border hover:shadow-lg transition-all group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{resource.category}</Badge>
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
                    <Link
                      to={`/resources/${resource.slug}`}
                      className="text-accent text-sm font-medium hover:underline inline-flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1" size={16} />
                    </Link>
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
                <Link to="/contact">
                  Book Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Resources;
