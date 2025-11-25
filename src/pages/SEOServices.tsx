import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

const SEOServices = () => {
  const painPoints = [
    "Your current SEO agency sends keyword reports with no business impact",
    "You're ranking well but not getting qualified leads",
    "Technical issues are holding back your organic performance",
    "Content strategy exists in isolation from sales goals",
    "You have no visibility into SEO ROI or revenue attribution",
  ];

  const included = [
    "Comprehensive technical SEO audits and ongoing fixes",
    "On-page optimization for conversions and rankings",
    "Strategic content planning with keyword clusters",
    "Internal linking architecture and site structure",
    "Local SEO optimization (GMB, citations, reviews)",
    "Schema markup and structured data implementation",
    "Link building and digital PR outreach",
    "Conversion tracking and analytics setup",
    "Monthly dashboards and actionable reports",
  ];

  const timeline = [
    {
      period: "Month 0-1",
      title: "Audit & Foundation",
      description: "Deep technical audit, competitor analysis, quick win identification, tracking setup.",
    },
    {
      period: "Month 2-3",
      title: "Implementation & Optimization",
      description: "Technical fixes deployed, on-page optimization, content strategy launch, initial link building.",
    },
    {
      period: "Month 4-6",
      title: "Content & Authority Building",
      description: "Pillar content published, link velocity increases, local SEO optimized, rankings improve.",
    },
    {
      period: "Month 6+",
      title: "Scale & Refine",
      description: "Continuous optimization, advanced content, competitive positioning, measurable ROI growth.",
    },
  ];

  const faqs = [
    {
      question: "How long does SEO take to show results?",
      answer: "Technical improvements and on-page optimizations can show impact within 30-60 days. Content-driven SEO typically builds momentum over 3-6 months. We focus on quick wins early while building long-term strategy.",
    },
    {
      question: "Do you guarantee rankings or traffic?",
      answer: "We don't guarantee specific rankings because Google's algorithm is constantly changing. What we do guarantee: strategic, data-driven work that follows best practices and a transparent reporting process. Our track record speaks for itself.",
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track rankings and traffic as leading indicators, but we focus on business metrics: organic leads, conversion rate, cost per acquisition, and revenue attribution. SEO success means business growth.",
    },
    {
      question: "What's included in your monthly SEO retainer?",
      answer: "Ongoing technical monitoring, content strategy and creation, link building, performance tracking, monthly reports, and strategic recommendations. The exact mix depends on your business goals and competitive landscape.",
    },
    {
      question: "Do you work with local businesses?",
      answer: "Absolutely. Local SEO is a core strength—Google My Business optimization, local citations, review management, and location-specific content. Perfect for multi-location businesses and service areas.",
    },
    {
      question: "How is your SEO different from other agencies?",
      answer: "We treat SEO as a revenue channel, not a vanity project. Every tactic is connected to your sales process. We set up proper tracking, report on business metrics, and optimize for conversions—not just rankings.",
    },
  ];

  const caseStudies = [
    {
      title: "Professional Services Firm",
      result: "+184% organic leads in 6 months",
      description: "Complete technical overhaul, content strategy focused on high-intent keywords, and conversion optimization led to sustained lead growth.",
    },
    {
      title: "Multi-Location Business",
      result: "+220% local search visibility",
      description: "Local SEO program with GMB optimization, citation building, and location-specific content delivered massive visibility gains.",
    },
    {
      title: "SaaS Company",
      result: "£140k attributed revenue from organic",
      description: "Bottom-funnel keyword targeting, technical excellence, and conversion tracking proved clear SEO ROI.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Technical SEO, content, and CRO{" "}
            <span className="font-semibold text-accent">under one roof</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            SEO services that drive revenue and qualified leads—not just rankings and reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book SEO Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Request Free SEO Audit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-10 text-foreground text-center">
            Tired of SEO agencies that don't deliver business results?
          </h2>
          <Card className="border-border">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <p className="text-center text-lg text-foreground mt-8 font-medium">
            We focus on metrics that matter: leads, pipeline, and revenue.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-light mb-12 text-foreground text-center">
            What's included in our SEO services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {included.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                <p className="text-foreground text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Process Timeline */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              SEO process & timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we build momentum and deliver results over time.
            </p>
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
        </div>
      </section>

      {/* Deliverables & Reporting */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-light mb-10 text-foreground text-center">
            Deliverables & reporting
          </h2>
          <Card className="border-border">
            <CardContent className="p-10 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Monthly Reports Include:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Performance dashboard: traffic, rankings, conversions
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Work completed and impact analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Key wins and opportunities identified
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Next month's roadmap and priorities
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Revenue attribution and lead quality metrics
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-foreground font-medium">
                  You'll always know exactly what we're doing, why we're doing it, and how it's impacting your business.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Study Results */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              SEO results we've delivered
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-border hover:shadow-xl transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <TrendingUp className="text-accent" size={32} />
                  <h3 className="text-xl font-semibold text-foreground">{study.title}</h3>
                  <p className="text-2xl font-light text-accent">{study.result}</p>
                  <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              SEO questions answered
            </h2>
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
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
            Ready to turn SEO into a predictable revenue channel?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a strategy call or request a free audit to see where your opportunities are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book SEO Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Request Free SEO Audit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOServices;
