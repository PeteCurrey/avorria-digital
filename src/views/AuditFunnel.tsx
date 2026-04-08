'use client';
import React, { useEffect } from "react";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { trackCTAClick, trackAuditFunnelView } from "@/lib/tracking";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Video, FileText, BarChart3, ListChecks, Zap, Clock, Shield } from "lucide-react";
import HeroGradient from "@/components/HeroGradient";
import { BeamBorder, StaticBeamBorder } from "@/components/BeamBorder";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function AuditFunnel() {
  // Track funnel page view on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source') || urlParams.get('source') || 'direct';
    trackAuditFunnelView(source);
  }, []);

  const scrollToForm = () => {
    trackCTAClick('request_audit', '#audit-form', 'hero');
    document.getElementById("audit-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <>
      <SEOHead
        title="Free SEO & Website Audit â€“ Instant Results"
        description="Get an instant, AI-powered audit of your website. Clear, actionable recommendations delivered in under 60 seconds â€“ completely free."
        canonical="/free-seo-website-audit"
        keywords={["free SEO audit", "website audit", "SEO analysis", "site audit tool", "free website review"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Free SEO Audit", url: "https://avorria.com/free-seo-website-audit" }
      ]} />

      <div className="min-h-screen bg-background">

        {/* Hero Section with Gradient Background */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <HeroGradient />
          <div className="container max-w-5xl mx-auto px-4 py-32 relative z-10">
            <ScrollReveal>
              <div className="text-center space-y-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Instant Results in 60 Seconds
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                  Free SEO & Website Audit
                  <span className="block text-gradient-accent">No BS, Just a Reality Check</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Our AI analyzes your site, SEO, and setup â€“ then delivers a comprehensive report with prioritized recommendations you can act on today.
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>Under 60 seconds</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-5 h-5 text-accent" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-5 h-5 text-accent" />
                    <span>Downloadable Report</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" onClick={scrollToForm} className="text-lg px-8">
                    Get My Free Audit
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => {
                    trackCTAClick('see_whats_included', '#what-you-get', 'hero');
                    document.getElementById("what-you-get")?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}>
                    See What's Included
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What You Get Section */}
        <section id="what-you-get" className="section-py px-4 bg-muted/20">
          <div className="container max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
                What's in your audit
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                A comprehensive analysis across the areas that actually move the needle for your business.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <BeamBorder>
                  <div className="p-8">
                    <Video className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-light mb-3 text-foreground">
                      Technical & SEO Snapshot
                    </h3>
                    <p className="text-muted-foreground">
                      We flag key technical issues, structural problems and SEO gaps that are holding you back from ranking higher.
                    </p>
                  </div>
                </BeamBorder>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <BeamBorder>
                  <div className="p-8">
                    <FileText className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-light mb-3 text-foreground">
                      Content Quality Review
                    </h3>
                    <p className="text-muted-foreground">
                      We analyze your content through the lens of "would this make me enquire?" â€“ honest feedback on what's working.
                    </p>
                  </div>
                </BeamBorder>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <BeamBorder>
                  <div className="p-8">
                    <BarChart3 className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-light mb-3 text-foreground">
                      Performance Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Speed, mobile experience, and Core Web Vitals â€“ the technical factors that impact both rankings and conversions.
                    </p>
                  </div>
                </BeamBorder>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <BeamBorder>
                  <div className="p-8">
                    <ListChecks className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-light mb-3 text-foreground">
                      Prioritised Action List
                    </h3>
                    <p className="text-muted-foreground">
                      A 90-day roadmap of what to fix first â€“ ordered by impact vs effort so you know exactly where to start.
                    </p>
                  </div>
                </BeamBorder>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Full-width dark section */}
        <section className="section-dark section-py px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
          <div className="container max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-light">
                  Why we give this away for free
                </h2>
                <p className="text-xl text-soft max-w-2xl mx-auto">
                  Most agencies gatekeep their audits behind sales calls. We believe you should know exactly what's wrong with your site before we ever talk about working together.
                </p>
                <p className="text-softer max-w-2xl mx-auto">
                  If you want our help implementing the recommendations, we can talk. If not, you still know what needs doing. Win-win.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="section-py px-4">
          <div className="container max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
                Who It's For (And Who It's Not)
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.1}>
                <Card className="p-8 border-accent/50 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-light text-foreground">Good Fit</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>You have a live website with some existing traffic</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>You want honest, actionable feedback you can use</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>You're open to making changes based on what we find</span>
                    </li>
                  </ul>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card className="p-8 border-muted h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-light text-foreground">Not a Good Fit</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>You don't have a website or product live yet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>You just want a vanity report to file away</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>You have no intention of acting on the findings</span>
                    </li>
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Audit Request Form */}
        <section id="audit-form" className="section-py px-4 bg-muted/20">
          <div className="container max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground">Get your instant audit</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Enter your details below and we'll generate a comprehensive audit of your website in under 60 seconds.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <StaticBeamBorder>
                <InlineLeadForm source="audit-funnel" />
              </StaticBeamBorder>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-py px-4">
          <div className="container max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    Is this really free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, 100% free. You'll get a complete audit with actionable recommendations. If you want help implementing them, we can talk â€“ but there's zero obligation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    How is this different from other SEO audits?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Most free audits are generic reports with 100+ issues designed to scare you. Ours is AI-powered to give you specific, prioritized recommendations tailored to your site â€“ what matters most, ordered by impact.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    How detailed is the audit?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Detailed enough to make decisions. You'll get scores across 5 key areas, specific findings, and a 90-day roadmap of prioritized actions â€“ typically 5-10 pages of actionable insights.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    Do I have to jump on a sales call?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Nope. The audit is delivered instantly â€“ no calls required. If you want to discuss the findings, you can book a call, but it's completely optional.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-dark section-py px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
          <div className="container max-w-3xl mx-auto relative z-10 text-center space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light">
                Ready for your reality check?
              </h2>
              <p className="text-xl text-soft">
                Get instant, actionable insights about your website â€“ completely free.
              </p>
              <Button size="lg" onClick={scrollToForm} className="text-lg px-8">
                Get My Free Audit Now
              </Button>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </>
  );
}

