import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, X, TrendingUp } from "lucide-react";

const WebDesign = () => {
  const painPoints = [
    "You've had a redesign, but enquiries and sales barely moved.",
    "Your homepage looks like a brochure, not a clear path to 'work with us'.",
    "Service pages list what you do but don't explain outcomes or process.",
    "There's no obvious CTA or next step above the fold.",
    "Tracking is patchy, so you're guessing which pages actually convert.",
  ];

  const whatWeBuild = {
    websites: [
      "High-conversion homepages focused on your primary offers.",
      "Service pages that sell outcomes, not just list features.",
      "About and proof sections that build trust fast.",
      "Clear site navigation and journeys for different types of visitors.",
    ],
    landingPages: [
      "Campaign-specific landing pages for ads and outbound.",
      "Lead magnet and webinar funnels.",
      "Simple, focused flows for audits, demo requests and estimates.",
      "Testing plans to improve performance over time.",
    ],
    underTheHood: [
      "Modern, fast, SEO-friendly stack.",
      "Responsive design across all devices.",
      "Clean, maintainable code and reusable components.",
      "Tracking and event setup for forms, calls, scrolls and key interactions.",
    ],
  };

  const approach = [
    {
      step: "Step 1",
      title: "Discovery & diagnosis",
      description:
        "We review your current site, analytics and funnel. We map where visitors drop off, what they're missing and what needs to change to support your sales process.",
    },
    {
      step: "Step 2",
      title: "Wireframes & messaging",
      description:
        "We design the structure and messaging first: what goes where, which proof sits by which CTA, how we handle objections and educate different buyer types.",
    },
    {
      step: "Step 3",
      title: "Visual design & build",
      description:
        "Once the bones are right, we apply your brand and build the site or pages on a modern stack. Fast, responsive and easy to extend.",
    },
    {
      step: "Step 4",
      title: "Launch, measure, refine",
      description:
        "We don't throw it live and disappear. We monitor behaviour, test improvements and refine based on actual performance, not opinions.",
    },
  ];

  const goodSigns = [
    "Visitors understand what you do and who you're for in under five seconds.",
    "There's always a clear, relevant next step: book a call, request an audit, view pricing.",
    "Social proof and case studies are placed where they actually influence decisions.",
    "Forms are short, focused and explain what happens after you submit.",
    "Your team can tell, in hard numbers, how the site is contributing to pipeline.",
  ];

  const caseSnippets = [
    "Rebuilt homepage, service pages and contact flow – +63% increase in qualified enquiries in three months with the same traffic.",
    "Simplified landing pages and added proof around the offer – 34% drop in cost per lead from paid campaigns.",
  ];

  const faqs = [
    {
      question: "Do you only do full rebuilds?",
      answer:
        "No. Sometimes a focused set of changes to structure, messaging and key pages is more effective than a ground-up rebuild. We'll tell you honestly which route makes sense.",
    },
    {
      question: "Can you work with our existing CMS or tech stack?",
      answer:
        "In most cases, yes. If your current setup is genuinely holding you back, we'll recommend a sensible migration path instead of a shiny rebuild for the sake of it.",
    },
    {
      question: "Who writes the copy?",
      answer:
        "We can handle copy end-to-end, collaborate with your team or provide detailed wireframes and messaging outlines for your writers to work from.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Smaller landing page or funnel projects can be turned around in weeks. Full website rebuilds usually run over a few months depending on complexity.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Websites and funnels that look sharp and sell hard.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            We design and build web experiences that feel like top-tier agency work – but every section, layout and CTA is engineered for conversions, not awards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Talk about a rebuild
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/free-seo-website-audit?focus=web">Request a website & funnel teardown</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-10 text-foreground text-center">
            If your site looks good but converts badly, it's not "fine".
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
            Pretty is optional. Clarity and conversion are not. Your site is either helping your pipeline or quietly taxing it.
          </p>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-light mb-12 text-foreground text-center">
            What Avorria designs and builds.
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Websites</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whatWeBuild.websites.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Landing pages & funnels</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whatWeBuild.landingPages.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Under the hood</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whatWeBuild.underTheHood.map((item, index) => (
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

      {/* Our Approach */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">Design, dev and CRO in one loop.</h2>
          </div>
          <div className="space-y-8">
            {approach.map((phase, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                    <div className="md:w-32 mb-4 md:mb-0">
                      <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-md text-sm">
                        {phase.step}
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

      {/* What Good Looks Like */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-light mb-10 text-foreground text-center">
            Signs your site is finally doing its job.
          </h2>
          <Card className="border-border">
            <CardContent className="p-10 space-y-6">
              <ul className="space-y-4">
                {goodSigns.map((item, index) => (
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

      {/* Case Snippets */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {caseSnippets.map((snippet, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 flex items-start space-x-4">
                  <TrendingUp className="text-accent flex-shrink-0" size={28} />
                  <p className="text-foreground text-lg leading-relaxed">{snippet}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/free-seo-website-audit?focus=web">Request a website & funnel teardown</Link>
              </Button>
              <Button variant="accent" size="lg" asChild>
                <Link to="/websites-we-would-fire">View 'Websites We'd Fire' gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Web Design by Location */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-foreground">Web design by location</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Looking for a local web design partner?
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Web Design Sheffield</h3>
                <p className="text-muted-foreground mb-4">
                  Conversion-focused websites for Sheffield businesses.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/web-design/sheffield">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Web Design Across the UK</h3>
                <p className="text-muted-foreground mb-4">
                  We work with businesses across the UK and beyond.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">
                    Get in touch
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
            <h2 className="text-4xl font-light mb-4 text-foreground">FAQ – Web Design & Dev</h2>
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
            Need your website to behave like a sales asset?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Send us your current site and we'll show you exactly what we'd change, in what order, and why – no drama, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/free-seo-website-audit?focus=web">
                Request a website & funnel teardown
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Talk about a rebuild</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDesign;
