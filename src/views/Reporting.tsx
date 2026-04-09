'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, TrendingUp, Target, Eye, MessageSquare, Zap, Globe, FileText, Link2, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/seo/SEOHead";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Reporting = () => {
  const reportingCadence = [
    {
      title: "Weekly snapshots",
      description: "Short check-ins, key movements, any fires that need putting out. Ideal for you or your marketing lead to keep a finger on the pulse.",
    },
    {
      title: "Monthly deep-dives",
      description: "Channel performance, tests, learnings and decisions. We agree what to stop, start and scale – and update the 90-day plan accordingly.",
    },
    {
      title: "Quarterly strategy reviews",
      description: "Bigger-picture conversations about positioning, offers, budgets and where we're heading. Less \"what happened last week\", more \"where do we want to be in six months?\".",
    },
  ];

  const questionCards = [
    {
      title: "Are we on track?",
      description: "KPIs benchmarked against your 90-day targets so you can see instantly if the trajectory is right.",
      icon: Eye,
    },
    {
      title: "What changed?",
      description: "The movements that matter €” traffic shifts, lead volume, conversion changes €” with context, not just numbers.",
      icon: MessageSquare,
    },
    {
      title: "What are we doing about it?",
      description: "Clear next actions with owners and timelines. No ambiguity, no waiting for a follow-up email.",
      icon: Zap,
    },
  ];

  const faqs = [
    {
      question: "What tools do you use for reporting?",
      answer: "It depends on the stack you already have. We're tool-agnostic – we care that the numbers are right and visible. We can plug into GA4, ad platforms, your CRM and spreadsheets if we have to.",
    },
    {
      question: "Can you integrate with our CRM?",
      answer: "In most cases, yes. Wherever possible, we connect leads and revenue back to campaigns so you see the full journey, not just the top of the funnel.",
    },
    {
      question: "Can we customise the dashboard?",
      answer: "Absolutely. There's a core structure we know works, but we'll adapt it to your business model, sales process and internal reporting rhythm.",
    },
    {
      question: "Do we still get human explanation or just a dashboard link?",
      answer: "You get both. The dashboard is the truth; the written summary and calls are where we translate that into decisions.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Reporting & Dashboards that Treat You Like an Operator | Avorria"
        description="Live-style dashboards and plain-English summaries that show traffic, leads, pipeline and ROI in one place – no 40-slide decks."
        canonical="https://avorria.com/reporting"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Reporting", url: "https://avorria.com/reporting" }
      ]} />

      <div className="min-h-screen">
        {/* Hero Section €” Dark Cinematic */}
        <section
          className="relative pt-36 pb-24 px-6 overflow-hidden"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--accent) / 0.12), transparent 70%), hsl(220 25% 8%)",
          }}
        >
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6"
            >
              Reporting & Dashboards
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-white"
            >
              Reporting that treats you like an{" "}
              <span className="font-semibold text-accent">operator, not a passenger</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Every engagement comes with a plain-English dashboard that shows traffic, leads, pipeline and ROI in one place €” plus a short narrative on what we did, what changed and what we're doing next.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/reporting/demo">
                  View Live Dashboard Demo
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <div className="relative group inline-flex">
                <div className="absolute -inset-[1px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%", animationDuration: "3s" }} />
                <div className="absolute -inset-[2px] rounded-md opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)", backgroundSize: "200% 100%", animation: "beam 3s linear infinite" }} />
                <Button
                  variant="outline"
                  size="lg"
                  className="relative bg-white/[0.06] border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/contact">Book a Strategy Call</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <SectionReveal type="fade-blur">
          <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-light mb-6 text-foreground">Your marketing data, finally in one place.</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Most agencies send you a slide deck once a month and call it reporting. We don't think that's good enough. You need to see what's happening now €” not what happened three weeks ago.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every Avorria engagement comes with a live dashboard and a short written summary that connects the dots between activity, results and next steps. No jargon, no vanity metrics, no 40-page PDFs.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you check in daily or monthly, you'll always know where you stand €” and what we're doing about it.
                  </p>
                </motion.div>

                <div className="space-y-5">
                  {[
                    { icon: Globe, label: "Live dashboards updated in real time" },
                    { icon: FileText, label: "Plain-English written summaries with every report" },
                    { icon: Link2, label: "Connected to your CRM, GA4 and ad platforms" },
                    { icon: Clock, label: "Weekly, monthly and quarterly reporting cadence" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="text-accent" size={20} />
                      </div>
                      <p className="text-foreground font-medium text-lg leading-snug">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* What We Show You */}
        <SectionReveal type="fade-blur">
          <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">The numbers that actually matter.</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We strip out vanity metrics and give you a clear view of the three pillars that drive growth decisions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Traffic & Visibility",
                    text: "All the basics, without the noise. Organic vs paid, branded vs non-branded, and how visibility is trending over time. Enough to understand the health of the machine at a glance.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Leads & Pipeline",
                    text: "Leads, qualified leads and estimated pipeline value across channels. We connect marketing activity to sales outcomes, not just \"engagement\".",
                  },
                  {
                    icon: Target,
                    title: "Efficiency & ROI",
                    text: "Cost per lead, cost per qualified lead, ROAS and other hard measures. If a channel can't justify itself in numbers, it doesn't stay in the plan.",
                  },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: idx * 0.1, duration: 0.45 }}
                  >
                    <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                      <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent/60" />
                      <CardContent className="p-8 space-y-4">
                        <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <card.icon className="text-accent" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground">{card.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{card.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Reporting Cadence €” Dark Section with Timeline */}
        <SectionReveal type="fade-blur">
          <section
            className="py-24 px-6"
            style={{
              background: "radial-gradient(ellipse 90% 50% at 50% 80%, hsl(var(--accent) / 0.06), transparent 70%), hsl(220 25% 8%)",
            }}
          >
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-white">A reporting cadence you can actually run your business on.</h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                  Three rhythms, each designed to give you the right level of detail at the right time.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40" />

                {reportingCadence.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="text-center relative"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-2xl font-semibold text-accent">{idx + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* No 40-slide decks */}
        <SectionReveal type="fade-blur">
          <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-light mb-6 text-foreground text-center">
                No 40-slide decks. One clear control panel.
              </h2>
              <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
                We don't believe in sending you a slide deck you'll never read. You get a live-style dashboard and a short written summary that answers three questions:
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {questionCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <Card className="p-6 border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <card.icon className="text-accent" size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/reporting/demo">View dashboard demo</Link>
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* FAQ Section */}
        <SectionReveal type="fade-blur">
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
        </SectionReveal>

        {/* CTA Section €” Dark */}
        <section
          className="py-24 px-6"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.1), transparent 70%), hsl(220 25% 8%)",
          }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-light mb-6 text-white"
            >
              Want reporting that makes decisions easier, not harder?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/reporting/demo">
                  View live dashboard demo
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <div className="relative group inline-flex">
                <div className="absolute -inset-[1px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%", animationDuration: "3s" }} />
                <div className="absolute -inset-[2px] rounded-md opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)", backgroundSize: "200% 100%", animation: "beam 3s linear infinite" }} />
                <Button
                  variant="outline"
                  size="lg"
                  className="relative bg-white/[0.06] border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/contact">Book a strategy call</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reporting;


