import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, TrendingUp, X } from "lucide-react";

const SEOServices = () => {
  const painPoints = [
    "You get long reports but still don't know what's actually been done each month.",
    "Rankings may be up, but leads and revenue haven't shifted.",
    "Nobody can clearly explain how SEO ties into your overall funnel and sales process.",
    "You've got content, but no clear structure, clusters or internal linking strategy.",
    "Technical issues and slow pages keep getting 'added to the list' but never fixed.",
  ];

  const included = {
    technical: [
      "Full technical audit and prioritised fix list.",
      "Site architecture and internal linking strategy.",
      "Core Web Vitals, speed and crawlability improvements.",
      "Schema and structured data setup where relevant.",
    ],
    onPage: [
      "Page-level optimisation for key commercial pages.",
      "Title, meta, headings and content tuned for intent, not keyword stuffing.",
      "Improved UX elements that support conversion (CTAs, proof, clarity).",
    ],
    content: [
      "Keyword research focused on commercial and high-intent terms.",
      "Topic clusters and content plans tied to stages of your buyer journey.",
      "Briefs and/or full content creation where required.",
      "Ongoing optimisation of existing content.",
    ],
    local: [
      "Local landing pages planned and built properly.",
      "Google Business Profile optimisation and management.",
      "Citations and local SERP assets (where they matter).",
    ],
    tracking: [
      "Clean analytics and goals setup.",
      "Dashboards showing organic traffic, leads and pipeline – not just rankings.",
      "Clear monthly commentary on what changed and why.",
    ],
  };

  const timeline = [
    {
      period: "Month 0–1",
      title: "Audit & foundations",
      description:
        "Technical and content audit. Tracking and analytics clean-up. Quick on-page wins on high-impact pages.",
    },
    {
      period: "Months 2–3",
      title: "Structure & content",
      description:
        "Implement core technical fixes. Roll out new information architecture and internal linking. Launch priority content and update existing assets.",
    },
    {
      period: "Months 4–6",
      title: "Compounding gains",
      description:
        "Expand content clusters. Strengthen ranking positions for core terms. Tune pages and CTAs based on real conversion data.",
    },
    {
      period: "Month 6+",
      title: "Scale and refine",
      description:
        "Double down where we see strongest ROI. Explore new keyword sets and assets. Continually reallocate effort based on what the data actually shows.",
    },
  ];

  const deliverables = [
    "A clear initial audit and prioritised action plan.",
    "Monthly dashboards covering organic traffic, leads and key pages.",
    "Short, plain-English summary of work completed and results.",
    "Access to our reporting hub so you can check numbers any time.",
    "A backlog of upcoming SEO actions so you always know what's next.",
  ];

  const caseStudies = [
    {
      title: "Multi-location services brand",
      result: "+132% non-branded organic traffic and +89% organic enquiries in 9 months.",
      description: "Rebuilt architecture and content strategy.",
    },
    {
      title: "Specialist B2B services company",
      result: "Ranking for high-intent terms they'd been missing for years.",
      description: "Technical clean-up and targeted content.",
    },
  ];

  const faqs = [
    {
      question: "How long until we see results?",
      answer:
        "It depends where you're starting from, but most clients see early movement in 2–3 months and meaningful commercial impact in 4–6 months. We'll be clear about realistic timelines upfront.",
    },
    {
      question: "Do you lock us into long contracts?",
      answer:
        "No. We normally recommend at least a 6-month runway for SEO, but we don't hide behind punitive long-term contracts.",
    },
    {
      question: "Can you work with our in-house dev/content team?",
      answer:
        "Yes. We can either handle implementation end-to-end, or act as the strategic and technical layer that briefs your internal teams.",
    },
    {
      question: "Will SEO replace paid ads?",
      answer:
        "Not usually. SEO and paid work best together – SEO for compounding inbound demand, paid for speed and control. We'll help you balance both.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            SEO that connects rankings to revenue.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            We combine technical SEO, content strategy and on-site optimisation to win the searches that actually lead to pipeline – then remove the friction that stops those visitors becoming customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book an SEO strategy call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/free-seo-website-audit">Get a free SEO audit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-10 text-foreground text-center">
            If you're already paying for SEO, some of this might sting.
          </h2>
          <Card className="border-border">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <X className="text-accent mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <p className="text-center text-lg text-foreground mt-8 font-medium">
            You don't need more waffle about algorithms. You need a clear plan to win the right searches, fix the technical drag and connect organic performance to your pipeline.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-light mb-12 text-foreground text-center">
            What Avorria SEO actually covers.
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Technical & structure</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.technical.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">On-page optimisation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.onPage.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Content & keyword strategy</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.content.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Local & multi-location SEO (if relevant)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.local.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Tracking & reporting</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.tracking.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">How a typical SEO engagement runs.</h2>
          </div>
          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                    <div className="md:w-32 mb-4 md:mb-0">
                      <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-md text-sm">
                        {phase.period}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{phase.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
            SEO is compounding by nature. Our job is to shorten the time it takes to see commercial impact – and to show you transparently what's happening along the way.
          </p>
        </div>
      </section>

      {/* Deliverables & Reporting */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-light mb-10 text-foreground text-center">What you see as a client.</h2>
          <Card className="border-border">
            <CardContent className="p-10 space-y-6">
              <ul className="space-y-4">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-accent mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO by Industry */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">SEO by industry</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-specific SEO strategies built around how your buyers actually search and evaluate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Trades & Home Services</h3>
                <p className="text-muted-foreground mb-6">
                  Local SEO that fills your diary with the right jobs in the right locations.
                </p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/seo/for/trades-home-services">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Professional Services</h3>
                <p className="text-muted-foreground mb-6">
                  SEO that attracts better-fit clients and feeds your pipeline with qualified enquiries.
                </p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/seo/for/professional-services">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">B2B SaaS</h3>
                <p className="text-muted-foreground mb-6">
                  SEO that feeds your pipeline with demos and trials, not just blog traffic.
                </p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/seo/for/b2b-saas">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">E-commerce Brands</h3>
                <p className="text-muted-foreground mb-6">
                  SEO that moves revenue, not just rankings – with clean structure and conversion focus.
                </p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/seo/for/ecommerce-brands">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Location Brands</h3>
                <p className="text-muted-foreground mb-6">
                  SEO that keeps every location and profile pulling its weight with structured local strategy.
                </p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/seo/for/multi-location-brands">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
                <p className="text-muted-foreground mb-4">
                  Don't see your industry? We work with many sectors.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">Discuss your industry</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">What good SEO looks like in practice.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-border hover:shadow-xl transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <TrendingUp className="text-accent" size={32} />
                  <h3 className="text-xl font-semibold text-foreground">{study.title}</h3>
                  <p className="text-lg font-medium text-accent">{study.result}</p>
                  <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/case-studies">View case studies</Link>
              </Button>
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">Book an SEO strategy call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO by Location */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-foreground">SEO by location</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prefer to work with a team who knows your patch?
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">SEO Agency Sheffield</h3>
                <p className="text-muted-foreground mb-4">
                  Performance-focused SEO for Sheffield and South Yorkshire businesses.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/seo-agency/sheffield">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">SEO Agency London</h3>
                <p className="text-muted-foreground mb-4">
                  Pipeline-focused SEO strategy for London-based teams.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/seo-agency/london">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">SEO Across the UK</h3>
                <p className="text-muted-foreground mb-4">
                  Work with us wherever you're based in the UK.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/digital-marketing-agency/uk">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">SEO FAQ</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border bg-background px-6 rounded-lg"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
            Want blunt, grown-up SEO advice?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Send us your site and we'll tell you exactly where you're wasting potential, what's holding you back and what we'd do first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/free-seo-website-audit">
                Get a free SEO audit
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Book an SEO strategy call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOServices;
