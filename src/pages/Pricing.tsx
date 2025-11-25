import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing = () => {
  const packages = [
    {
      name: "Growth",
      description: "For early-stage businesses ready to scale",
      priceRange: "From £2,500",
      period: "/month",
      ideal: "Startups, small businesses, single-channel focus",
      features: [
        "1-2 marketing channels (SEO OR paid OR content)",
        "Monthly strategy sessions",
        "Performance dashboards",
        "Conversion tracking setup",
        "Monthly reporting & recommendations",
        "Email support (response within 24hrs)",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Scale",
      description: "For established businesses driving growth",
      priceRange: "From £5,000",
      period: "/month",
      ideal: "Growing companies, multi-channel strategies",
      features: [
        "3-4 marketing channels fully integrated",
        "Bi-weekly strategy calls",
        "Advanced analytics & attribution",
        "A/B testing & CRO programs",
        "Dedicated account manager",
        "Priority support via Slack",
        "Quarterly business reviews",
      ],
      cta: "Book a Call",
      highlighted: true,
    },
    {
      name: "Partner",
      description: "Custom solutions for enterprise growth",
      priceRange: "Custom",
      period: "pricing",
      ideal: "Enterprise, multi-location, high-growth brands",
      features: [
        "Full-stack digital strategy",
        "Weekly sync calls + on-demand access",
        "Custom dashboards & reporting",
        "Advanced automation & workflows",
        "Dedicated team of specialists",
        "White-glove service & priority projects",
        "Contractual SLAs & performance guarantees",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "What's the minimum commitment?",
      answer: "We require a 3-month minimum engagement to implement strategy properly and see meaningful results. Most clients work with us for 6-12 months because that's when real momentum builds.",
    },
    {
      question: "What affects the final cost?",
      answer: "Pricing depends on scope (number of channels), competitive landscape, current state of your marketing, and specific goals. We're transparent about costs during the strategy call and proposal stage.",
    },
    {
      question: "Do you offer one-off projects?",
      answer: "Yes, for specific initiatives like website redesigns, SEO audits, or campaign launches. However, our best results come from ongoing partnerships where we can continuously optimize.",
    },
    {
      question: "What's included in onboarding?",
      answer: "Deep discovery calls, audit of current marketing, competitor analysis, tech stack review, tracking setup, and a 30-60-90 day roadmap. Onboarding typically takes 2-3 weeks before active campaign work begins.",
    },
    {
      question: "Can I upgrade or change my package?",
      answer: "Absolutely. As your business grows, we'll recommend scaling your strategy and channels. We'll work with you to adjust scope, budget, and priorities as needed.",
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer monthly billing for all packages. For larger commitments, we can discuss quarterly or annual payment options with discounted rates.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Transparent pricing,{" "}
            <span className="font-semibold text-accent">measurable results</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            Choose the package that fits your business stage and growth goals. All plans include transparent reporting and direct access to specialists.
          </p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`border-border transition-all ${
                  pkg.highlighted
                    ? "shadow-xl scale-105 border-accent"
                    : "hover:shadow-lg"
                }`}
              >
                <CardContent className="p-8 space-y-6">
                  {pkg.highlighted && (
                    <div className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-md">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                  <div className="py-4 border-y border-border">
                    <div className="text-4xl font-light text-foreground">
                      {pkg.priceRange}
                      <span className="text-lg text-muted-foreground font-normal">{pkg.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 italic">Ideal for: {pkg.ideal}</p>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle2 className="text-accent mr-2 flex-shrink-0 mt-0.5" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={pkg.highlighted ? "accent" : "outline"}
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/contact">
                      {pkg.cta}
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Affects Cost */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              What affects your investment?
            </h2>
          </div>
          <Card className="border-border">
            <CardContent className="p-10 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Number of Channels</h3>
                <p className="text-muted-foreground">
                  Single-channel focus (e.g., just SEO) vs. multi-channel strategies (SEO + Paid + Content) require different resource levels.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Competitive Landscape</h3>
                <p className="text-muted-foreground">
                  Highly competitive industries require more aggressive strategies, content production, and link building efforts.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Current State</h3>
                <p className="text-muted-foreground">
                  Starting from scratch (no website, tracking, content) vs. optimizing existing assets affects initial setup and ongoing work.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Business Goals</h3>
                <p className="text-muted-foreground">
                  Aggressive growth targets, tight timelines, or specific KPIs require more intensive strategies and resource allocation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Pricing & engagement FAQs
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border bg-card px-6 rounded-lg"
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Not sure which package is right for you?
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
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
