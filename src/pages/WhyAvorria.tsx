import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, LineChart, Palette, MessageSquare } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { LogoWall } from "@/components/LogoWall";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";

const WhyAvorria = () => {
  const principles = [
    {
      icon: Target,
      title: "Pipeline over vanity",
      description:
        "We care about pipeline, revenue and margin impact. If a tactic or channel can't be linked to that, it doesn't stay in the plan.",
    },
    {
      icon: LineChart,
      title: "Tracking before tactics",
      description:
        "We fix tracking and reporting first. There's no point \"optimising\" campaigns if you can't trust the numbers.",
    },
    {
      icon: Palette,
      title: "Design that does a job",
      description:
        "We love clean, modern interfaces – but only when they make it easier for the right people to say \"yes\". Aesthetics serve conversion.",
    },
    {
      icon: MessageSquare,
      title: "Radical clarity",
      description:
        "We tell you what's working, what isn't and what we'd do if it were our money. No sugar-coating, no buzzword bingo.",
    },
  ];

  const howWeWork = [
    {
      phase: "Onboarding (Week 1–2)",
      description:
        "We audit your current setup, identify quick wins, and build a 90-day roadmap tied to your revenue goals. No generic templates—everything is specific to your business.",
    },
    {
      phase: "90-Day Plan (Months 1–3)",
      description:
        "We focus on quick wins first: fixing broken tracking, optimising high-traffic pages, launching or refining paid campaigns. You see results early while we build the long-term foundation.",
    },
    {
      phase: "Communication Rhythm",
      description:
        "Weekly updates via Slack or email. Monthly strategy calls (30 minutes, no fluff). Live dashboards you can check anytime. No surprises, no waiting for end-of-month reports.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Why Avorria | Performance-First Digital Marketing</title>
        <meta
          name="description"
          content="Why teams who are done with agency fluff pick Avorria. Pipeline-first strategy, conversion-obsessed design, and radical transparency in everything we do."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-secondary to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <ScrollReveal>
              <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground">
                Why teams who are done with fluff{" "}
                <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent to-[hsl(280,75%,60%)]">
                  pick Avorria
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
                If you're already investing in marketing but feel like you're flying blind, you don't need more ideas. You need a partner who can turn spend into a disciplined, measurable growth engine.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Operating Principles */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-12 text-center">
                How we think about growth.
              </h2>
            </ScrollReveal>
            
            <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={100}>
              {principles.map((principle, index) => (
                <Card key={index} className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-[var(--duration-base)]">
                      <principle.icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>
            
            <OpinionatedQuote quote="We will never send you a 40-slide deck and call it reporting." />
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">What it's like to work with us.</h2>
            <div className="space-y-8">
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-3">1. We start with your reality, not our playbook.</h3>
                  <p className="text-muted-foreground leading-relaxed">We look at your current numbers, team, constraints and appetite for change. Then we build a plan around that, not some generic "full-funnel" template.</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-3">2. We own execution, not just slide decks.</h3>
                  <p className="text-muted-foreground leading-relaxed">We don't disappear after the strategy doc. We build the assets, run the campaigns, fix the tracking and adjust based on data.</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-3">3. We act like an internal growth function.</h3>
                  <p className="text-muted-foreground leading-relaxed">You get proactive ideas, honest pushback and clear recommendations – not just task updates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Links */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
              Dig into the detail.
            </h2>
            <div className="space-y-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/reporting">
                      See how we report
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/websites-we-would-fire">
                      Check out the 'Websites We'd Fire' gallery
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services & Case Studies Links */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
              See What We Actually Do
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Our Services</h3>
                  <p className="text-muted-foreground mb-6">
                    SEO, paid media, web design, content, analytics—everything tied to pipeline and revenue.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/services">
                      View Services
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Case Studies</h3>
                  <p className="text-muted-foreground mb-6">
                    Real results for real businesses. No vanity metrics, just leads and revenue.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/case-studies">
                      View Case Studies
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-light mb-6 text-foreground">
              If you want another hype deck, we're not it.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              If you want someone to help you hit numbers, clean up the mess and build a sane growth engine, we should talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book a strategy call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/free-seo-website-audit">Request a free audit</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyAvorria;
