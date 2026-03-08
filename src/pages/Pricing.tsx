import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowRight, DollarSign, Users, Lightbulb } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent, EVENTS, trackCTAClick } from "@/lib/tracking";

const Pricing = () => {
  // Track pricing page view on mount
  useEffect(() => {
    trackEvent(EVENTS.PRICING_VIEWED);
  }, []);

  const engagementModels = [
    {
      icon: Users,
      label: "Ongoing growth retainer",
      description: "For teams who want us to behave like an in-house growth function – SEO, paid, web and analytics working together.",
      scope: [
        "SEO + Paid + Web + Analytics combo",
        "Regular experimentation and optimisation loops",
        "Monthly/quarterly strategy reviews with leadership",
      ],
      investment: "From £4k–£12k+ / month depending on scope, footprint and velocity.",
    },
    {
      icon: Lightbulb,
      label: "Fixed-scope projects",
      description: "For teams who need a specific asset built or fixed: rebuilds, migrations, tracking clean-ups, big campaign launches.",
      scope: [
        "Website and funnel rebuilds",
        "Analytics & tracking overhauls",
        "SEO foundations or restructures",
        "Landing page & campaign build-outs",
      ],
      investment: "Most projects land between £8k–£40k depending on complexity.",
    },
    {
      icon: DollarSign,
      label: "Strategy & advisory",
      description: "For teams with in-house execution who want operator-level guidance, critique and structure.",
      scope: [
        "Strategy workshops and roadmaps",
        "Quarterly audits and optimisation plans",
        "Advisor role alongside your leadership/marketing team",
      ],
      investment: "From £1.5k–£4k / month, or session-based pricing for specific workshops.",
    },
  ];

  const priceDriversUp = [
    "Multiple countries, languages or brands",
    "Complex stacks and legacy tech",
    "Aggressive timelines and growth targets",
    "Heavy content or creative requirements",
  ];

  const priceDriversLean = [
    "Single market, focused ICP",
    "Clean tech stack and clear offers",
    "Realistic timelines and prioritised scope",
    "Good internal resources we can plug into",
  ];

  const valueProps = [
    {
      title: "Operator-level thinking",
      description: "We behave like an in-house growth team, not a task list supplier.",
    },
    {
      title: "Execution, not just decks",
      description: "We build, ship and optimise, then show you the numbers.",
    },
    {
      title: "Reporting you can trust",
      description: "Dashboards and summaries focused on pipeline, not vanity.",
    },
  ];

  const faqs = [
    {
      question: "Do you lock us into long contracts?",
      answer: "No. We typically recommend a 6–12 month runway to do meaningful work, but we don't hide behind punitive terms. If it's not working, we'll be the first to tell you.",
    },
    {
      question: "Do you work with smaller budgets?",
      answer: "It depends. If you're already spending and want to tighten things up, we can often find a starting point. If your total budget is tiny and you're hoping for miracles, a lighter DIY approach might make more sense – and we'll tell you that honestly.",
    },
    {
      question: "What if we need to pause?",
      answer: "Life happens. If you need to pause for business reasons, we'll hand over everything cleanly and make it easy to pick back up later. No hidden fees or drama.",
    },
    {
      question: "How do we know we'll see a return?",
      answer: "We tie everything to commercial outcomes – leads, pipeline, revenue. You'll see progress in dashboards and monthly summaries. If something isn't working, we'll recommend cutting it or pivoting fast.",
    },
    {
      question: "Can we start small and scale up?",
      answer: "Yes. Many clients start with a focused project (audit, rebuild, tracking fix) then move into ongoing work once they've seen how we operate. We'll recommend the right entry point based on where you are.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing & Engagement Models | Avorria</title>
        <meta name="description" content="No £499 SEO packages. See how Avorria structures retainers, fixed-scope projects and advisory so investment matches your growth ambitions." />
        
        <meta property="og:title" content="Pricing & Engagement Models | Avorria" />
        <meta property="og:description" content="No £499 SEO packages. See how Avorria structures retainers, fixed-scope projects and advisory so investment matches your growth ambitions." />
        <meta property="og:url" content="https://avorria.com/pricing" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing & Engagement Models | Avorria" />
        <meta name="twitter:description" content="No £499 SEO packages. See how Avorria structures retainers, fixed-scope projects and advisory so investment matches your growth ambitions." />
        
        <link rel="canonical" href="https://avorria.com/pricing" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Pricing & Engagement Models",
            "description": "No £499 SEO packages. See how Avorria structures retainers, fixed-scope projects and advisory so investment matches your growth ambitions.",
            "url": "https://avorria.com/pricing",
            "about": {
              "@type": "Service",
              "serviceType": "Digital Marketing Services"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-background via-background to-secondary/20">
          <ScrollReveal>
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground">
                Pricing designed for serious teams,{" "}
                <span className="font-semibold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                  not tyre-kickers.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
                We don't do "£499 SEO packages". We design retainers and projects around commercial targets, complexity and appetite for change. Below is how we typically work and the kind of investment that makes sense.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact" onClick={() => {
                    trackEvent(EVENTS.PRICING_CTA_CLICK, {
                      cta_label: 'talk_budget_scope',
                      destination: '/contact',
                    });
                  }}>
                    Talk about budget & scope
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/project-estimator" onClick={() => {
                    trackEvent(EVENTS.PRICING_ESTIMATOR_LAUNCH, {
                      entry_source: 'pricing_page',
                    });
                  }}>Use the project estimator</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Engagement Models */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  Three ways teams usually work with us.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {engagementModels.map((model, index) => (
                  <Card
                    key={index}
                    className="border-border/50 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
                  >
                    <CardContent className="p-8 space-y-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                        <model.icon className="text-accent" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">{model.label}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{model.description}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Typical scope</p>
                        <ul className="space-y-2">
                          {model.scope.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-muted-foreground">
                              <CheckCircle2 className="text-accent mr-2 flex-shrink-0 mt-0.5" size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Typical investment</p>
                        <p className="text-sm text-foreground font-medium">{model.investment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* What Affects Price */}
        <section className="py-24 px-6 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  What actually drives price up or down.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/50 shadow-soft">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                      <span className="text-red-500">↑</span> Drives investment up
                    </h3>
                    <ul className="space-y-3">
                      {priceDriversUp.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <XCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-soft">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                      <span className="text-green-500">↓</span> Keeps investment lean
                    </h3>
                    <ul className="space-y-3">
                      {priceDriversLean.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  What you get for your money.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-3 gap-6">
                {valueProps.map((prop, index) => (
                  <Card key={index} className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 shadow-soft">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                      <p className="text-sm text-muted-foreground">{prop.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  Pricing & engagement FAQs
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 bg-card px-6 rounded-lg shadow-soft"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <ScrollReveal>
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
                Not sure which path is right for you?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Book a free strategy call. We'll assess your situation, discuss your goals, and recommend the best approach and budget for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book Strategy Call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/project-estimator">Use Project Estimator</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
};

export default Pricing;
