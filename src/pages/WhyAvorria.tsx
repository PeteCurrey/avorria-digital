import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, LineChart, Palette, MessageSquare, Briefcase, BarChart3 } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import SectionReveal from "@/components/SectionReveal";
import ServiceComparisonGrid from "@/components/services/ServiceComparisonGrid";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const WhyAvorria = () => {
  const principles = [
    {
      icon: Target,
      title: "Pipeline over vanity",
      description:
        "We care about pipeline, revenue and margin impact. If a tactic or channel can't be linked to that, it doesn't stay in the plan.",
    },
    {
      icon: LineChart,
      title: "Tracking before tactics",
      description:
        "We fix tracking and reporting first. There's no point optimising campaigns if you can't trust the numbers.",
    },
    {
      icon: Palette,
      title: "Design that does a job",
      description:
        "We love clean, modern interfaces — but only when they make it easier for the right people to say \"yes\". Aesthetics serve conversion.",
    },
    {
      icon: MessageSquare,
      title: "Radical clarity",
      description:
        "We tell you what's working, what isn't and what we'd do if it were our money. No sugar-coating, no buzzword bingo.",
    },
  ];

  const howWeWork = [
    {
      step: "01",
      title: "We start with your reality.",
      description:
        "We look at your current numbers, team, constraints and appetite for change. Then we build a plan around that — not some generic full-funnel template.",
    },
    {
      step: "02",
      title: "We own execution, not slide decks.",
      description:
        "We don't disappear after the strategy doc. We build the assets, run the campaigns, fix the tracking and adjust based on data.",
    },
    {
      step: "03",
      title: "We act like an internal growth function.",
      description:
        "You get proactive ideas, honest pushback and clear recommendations — not just task updates. Weekly updates, monthly strategy calls, live dashboards.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Why Avorria | Performance-First Digital Marketing Agency"
        description="Why ambitious teams who are done with agency noise choose Avorria. Pipeline-first strategy, conversion-obsessed design, and radical transparency in everything we do."
        canonical="/why-avorria"
        keywords={["why avorria", "digital marketing agency", "performance marketing", "pipeline-first agency", "revenue-focused marketing"]}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Why Avorria",
            description: "Why ambitious teams who are done with agency noise choose Avorria.",
            url: "https://avorria.com/why-avorria",
            publisher: {
              "@type": "Organization",
              name: "Avorria",
              url: "https://avorria.com",
            },
          })}
        </script>
      </SEOHead>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Why Avorria", url: "https://avorria.com/why-avorria" }
      ]} />

      <div className="min-h-screen">
        {/* Hero — Cinematic Dark */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[hsl(220,25%,8%)]">
          {/* Radial accent glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(320,85%,55%,0.08),transparent_70%)]" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(280,75%,60%,0.06),transparent_70%)]" />
          </div>

          <div className="container mx-auto max-w-4xl text-center relative px-6 py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent/80 border border-accent/20 rounded-full px-4 py-1.5">
                Why Avorria
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white"
            >
              Why teams who are done with the noise{" "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(280,75%,60%)]">
                pick Avorria
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              If you're already investing in marketing but feel like you're flying blind, you don't need more ideas. You need a partner who can turn spend into a disciplined, measurable growth engine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book a strategy call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" asChild className="border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 backdrop-blur-sm">
                <Link to="#how-we-think">
                  Our approach
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Operating Principles */}
        <section id="how-we-think" className="py-24 md:py-32 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4 text-center">
                How we think about growth.
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
                Four operating principles that shape every recommendation, every campaign, every conversation.
              </p>
            </ScrollReveal>

            <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={100}>
              {principles.map((principle, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Gradient top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(280,75%,60%)] opacity-60 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 pt-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <principle.icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>

            <OpinionatedQuote quote="We will never send you a 40-slide deck and call it reporting." />
          </div>
        </section>

        {/* How We Work — Horizontal Timeline */}
        <SectionReveal type="wipe-up">
          <section id="how-we-work" className="py-24 md:py-32 px-6 bg-[hsl(220,25%,8%)]">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 text-center">
                What it's like to work with us.
              </h2>
              <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
                No generic playbooks. No disappearing after the strategy doc. Here's how every engagement runs.
              </p>

              <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
                {/* Connecting line (desktop) */}
                <div className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40" />

                {howWeWork.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative text-center"
                  >
                    {/* Step number */}
                    <div className="relative z-10 w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-[hsl(220,25%,12%)] border border-accent/30 flex items-center justify-center">
                      <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[hsl(320,85%,55%)] to-[hsl(280,75%,60%)]">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Comparison Grid — Inline */}
        <section className="bg-background">
          <ServiceComparisonGrid />

          {/* Secondary navigation links */}
          <div className="max-w-3xl mx-auto px-6 pb-24 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/reporting">
                See how we report
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/websites-we-would-fire">
                Websites We'd Fire gallery
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </section>

        {/* Services & Case Studies */}
        <SectionReveal type="fade-blur">
          <section className="py-24 md:py-32 px-6 bg-secondary/50">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
                See what we actually do.
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Briefcase,
                    title: "Our Services",
                    description: "SEO, paid media, web design, content, analytics — everything tied to pipeline and revenue.",
                    link: "/services",
                    label: "View Services",
                  },
                  {
                    icon: BarChart3,
                    title: "Case Studies",
                    description: "Real results for real businesses. No vanity metrics, just leads and revenue.",
                    link: "/case-studies",
                    label: "View Case Studies",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(280,75%,60%)] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-8 pt-10 text-center">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                        <item.icon className="text-accent" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                      <p className="text-muted-foreground mb-6">{item.description}</p>
                      <Button variant="outline" asChild className="w-full">
                        <Link to={item.link}>
                          {item.label}
                          <ArrowRight className="ml-2" size={18} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Final CTA */}
        <section className="relative py-24 md:py-32 px-6 bg-[hsl(220,25%,8%)] overflow-hidden">
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,hsl(320,85%,55%,0.06),transparent_70%)]" />
          </div>

          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-light mb-6 text-white"
            >
              If you want another hype deck, we're not it.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/50 mb-10 max-w-2xl mx-auto"
            >
              If you want someone to help you hit numbers, clean up the mess and build a sane growth engine, we should talk.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg" asChild>
                <Link to="/free-seo-website-audit">
                  Get a free audit
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button size="lg" asChild className="border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 backdrop-blur-sm">
                <Link to="/contact">
                  Book a strategy call
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyAvorria;
