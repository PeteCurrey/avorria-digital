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
      title: "Weekly snapshots",
      description: "Short check-ins, key movements, any fires that need putting out. Ideal for you or your marketing lead to keep a finger on the pulse.",
      items: [] as string[],
    },
    {
      title: "Monthly deep-dives",
      description: "Channel performance, tests, learnings and decisions. We agree what to stop, start and scale – and update the 90-day plan accordingly.",
      items: [] as string[],
    },
    {
      title: "Quarterly strategy reviews",
      description: "Bigger-picture conversations about positioning, offers, budgets and where we're heading. Less \"what happened last week\", more \"where do we want to be in six months?\".",
      items: [] as string[],
    },
  ];

  const faqs = [
    {
      question: "What tools do you use for reporting?",
      answer:
        "It depends on the stack you already have. We're tool-agnostic – we care that the numbers are right and visible. We can plug into GA4, ad platforms, your CRM and spreadsheets if we have to.",
    },
    {
      question: "Can you integrate with our CRM?",
      answer:
        "In most cases, yes. Wherever possible, we connect leads and revenue back to campaigns so you see the full journey, not just the top of the funnel.",
    },
    {
      question: "Can we customise the dashboard?",
      answer:
        "Absolutely. There's a core structure we know works, but we'll adapt it to your business model, sales process and internal reporting rhythm.",
    },
    {
      question: "Do we still get human explanation or just a dashboard link?",
      answer:
        "You get both. The dashboard is the truth; the written summary and calls are where we translate that into decisions.",
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
            Every engagement comes with a plain-English dashboard that shows traffic, leads, pipeline and ROI in one place – plus a short narrative on what we did, what changed and what we're doing next.
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
            <h2 className="text-4xl font-light mb-4 text-foreground">The numbers that actually matter.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-xl transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Traffic & Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All the basics, without the fluff. Organic vs paid, branded vs non-branded, and how visibility is trending over time. Enough to understand the health of the machine at a glance.
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
                  Leads, qualified leads and estimated pipeline value across channels. We connect marketing activity to sales outcomes, not just "engagement".
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
                  Cost per lead, cost per qualified lead, ROAS and other hard measures. If a channel can't justify itself in numbers, it doesn't stay in the plan.
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
            <h2 className="text-4xl font-light mb-4 text-foreground">A reporting cadence you can actually run your business on.</h2>
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
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Visual Pattern / Screens Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-light mb-6 text-foreground text-center">
            No 40-slide decks. One clear control panel.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            We don't believe in sending you a slide deck you'll never read. You get a live-style dashboard and a short written summary that answers three questions:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Are we on track?</h3>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">What changed?</h3>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">What are we doing about it?</h3>
            </Card>
          </div>
          <div className="text-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/reporting/demo">View dashboard demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">Reporting questions we get a lot.</h2>
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
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Want reporting that makes decisions easier, not harder?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/reporting/demo">
                View live dashboard demo
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Book a strategy call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reporting;
