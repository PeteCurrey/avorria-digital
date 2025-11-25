import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, LineChart, Palette, MessageSquare } from "lucide-react";

const WhyAvorria = () => {
  const principles = [
    {
      icon: Target,
      title: "Pipeline, Not Vanity Metrics",
      description:
        "We don't optimise for impressions, clicks, or rankings. We optimise for qualified leads, cost per lead, and revenue. If a metric doesn't tie back to your business outcomes, we don't report it.",
    },
    {
      icon: LineChart,
      title: "Tracking First, Channels Second",
      description:
        "Most agencies launch campaigns and hope tracking magically works. We set up proper analytics, conversion events, and attribution before spending a penny on ads or SEO. No guessing, no flying blind.",
    },
    {
      icon: Palette,
      title: "Design Led, Conversion Obsessed",
      description:
        "We build sites that look like they belong in a top agency portfolio—but they're optimised for leads, not awards. Beautiful design and high conversion rates aren't mutually exclusive.",
    },
    {
      icon: MessageSquare,
      title: "Radical Clarity in Reporting",
      description:
        "No 40-page PDFs. No jargon-filled executive summaries. You get a live dashboard you can check anytime, and a monthly call where we talk about what's working, what's not, and what we're doing next.",
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
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
              Why teams who are done with fluff{" "}
              <span className="font-semibold text-accent">pick Avorria</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up max-w-3xl mx-auto">
              Most agencies optimise for their portfolio. We optimise for your pipeline. Here's what that means in
              practice.
            </p>
          </div>
        </section>

        {/* Operating Principles */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
              Our Operating Principles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <Card key={index} className="border-border hover:shadow-xl transition-all group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <principle.icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">{principle.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">How We Work</h2>
            <div className="space-y-8">
              {howWeWork.map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-accent mb-3">{item.phase}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Links */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
              How Do We Compare?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors">
                    Avorria vs Typical Agency
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    See how we stack up against the typical agency model—from strategy depth to reporting clarity
                    and contract flexibility.
                  </p>
                  <Button variant="outline" asChild className="group-hover:border-accent">
                    <Link to="/why/avorria-vs-typical-agency">
                      Read Comparison
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors">
                    Avorria vs DIY / In-House
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Should you DIY your marketing, hire internally, or work with us? Here's when each approach makes
                    sense.
                  </p>
                  <Button variant="outline" asChild className="group-hover:border-accent">
                    <Link to="/why/avorria-vs-diy">
                      Read Comparison
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
              Speak to a strategist, not a salesperson
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Book a call and we'll walk through your current setup, identify opportunities, and show you what a
              performance-first approach looks like—no pitch deck, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyAvorria;
