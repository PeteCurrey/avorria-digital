import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, TrendingUp, Target } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Reporting = () => {
  const reportingCadence = [
    {
      title: "Weekly Snapshot",
      description: "Quick performance pulse",
      items: ["Key metrics at a glance", "Week-over-week trends", "Any immediate action items"],
    },
    {
      title: "Monthly Deep-Dive",
      description: "Full performance review",
      items: [
        "Comprehensive channel breakdown",
        "Campaign-level analysis",
        "Content performance",
        "Next month's action plan",
      ],
    },
    {
      title: "Quarterly Strategy Review",
      description: "Big-picture planning",
      items: [
        "Progress against goals",
        "Market & competitive insights",
        "Budget allocation review",
        "Strategic roadmap for next quarter",
      ],
    },
  ];

  const faqs = [
    {
      question: "What tools do you use for reporting?",
      answer:
        "We use a combination of Google Analytics 4, Search Console, ad platform dashboards (Google Ads, Meta, LinkedIn), and our own custom reporting interface. Everything is consolidated into one client dashboard so you don't need to log into multiple tools.",
    },
    {
      question: "Can you integrate with our CRM?",
      answer:
        "Yes. We integrate with most major CRMs (HubSpot, Salesforce, Pipedrive, etc.) to track leads and pipeline value directly in your dashboard. This gives you a complete view from first visit to closed deal.",
    },
    {
      question: "Can we customise the dashboard?",
      answer:
        "Absolutely. We'll tailor the dashboard to focus on the metrics that matter most to your business. If you care about pipeline value more than sessions, we'll prioritize that. If you want to track specific conversion events, we'll add them.",
    },
    {
      question: "Do you cover both SEO and Paid in one place?",
      answer:
        "Yes. One of the benefits of working with Avorria is that all your channels—organic, paid, content, email—are reported in a single unified view. You see how they work together, not in isolation.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Reporting that treats you like an{" "}
            <span className="font-semibold text-accent">operator, not a passenger</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            Every engagement comes with a transparent, plain-English dashboard that shows traffic, leads,
            pipeline and revenue—not vanity charts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button variant="accent" size="lg" asChild>
              <Link to="/reporting/demo">
                View Live Dashboard Demo
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Book a Strategy Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Show You */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">What We Show You — At a Glance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No vanity metrics. No mystery retainers. Just the numbers that actually matter to your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-xl transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Traffic & Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Organic, paid, branded vs non-branded. We show you where your visitors are coming from and
                  which channels are driving actual business value.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Leads & Pipeline</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leads, qualified leads, pipeline value. We connect marketing activity directly to your sales
                  funnel so you can see what's actually working.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Efficiency & ROI</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cost per lead, ROAS, revenue multiples. We obsess over efficiency so you can confidently
                  scale what's working and cut what's not.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Rhythm */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">Reporting Rhythm</h2>
            <p className="text-lg text-muted-foreground">
              Consistent cadence, no surprises, always aligned on what's next
            </p>
          </div>

          <div className="space-y-8">
            {reportingCadence.map((item, idx) => (
              <Card key={idx} className="border-border">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-semibold text-accent">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.items.map((listItem, listIdx) => (
                          <li key={listIdx} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-accent mt-0.5">✓</span>
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-accent/20 bg-accent/5 mt-12">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Reporting Guarantees</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-accent font-semibold">✓</span>
                  <span>
                    <strong>No surprise retainers</strong> – You always know what we're working on and why
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-accent font-semibold">✓</span>
                  <span>
                    <strong>No unexplained line items</strong> – Every action is documented and justified
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-accent font-semibold">✓</span>
                  <span>
                    <strong>You know what's next</strong> – Clear roadmap and priorities at all times
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">Reporting FAQs</h2>
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
            See the live-style dashboard demo
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explore a fully interactive demo dashboard with real-world data patterns. This is what working with
            Avorria actually looks like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/reporting/demo">
                View Dashboard Demo
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Book Strategy Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reporting;
