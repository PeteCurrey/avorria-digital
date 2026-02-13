import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, TrendingUp, LineChart, Zap, CheckCircle2, Globe, FileText, Link2, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { motion } from "framer-motion";
import heroPaidMedia from "@/assets/service-paid-media.jpg";

const faqs = [
  {
    question: "How quickly will we see results from paid media?",
    answer: "You'll see data from day one – clicks, impressions, cost per click. Meaningful commercial results (qualified leads, pipeline) typically emerge within 4–6 weeks once we've tested offers, audiences and landing pages. We'll set clear expectations in the first strategy call."
  },
  {
    question: "What's your minimum ad spend recommendation?",
    answer: "We typically recommend a minimum of £2,000–3,000/month in ad spend per platform to gather enough data to optimise effectively. Below that, you're guessing rather than learning. We'll advise on the right budget based on your market and goals."
  },
  {
    question: "Do you handle creative – ads, landing pages, copy?",
    answer: "Yes. We write ad copy, design creatives and build landing pages in-house. Paid media only works when the offer, the ad and the landing experience are aligned – so we control the full chain rather than hoping a separate team delivers on time."
  },
  {
    question: "How do you report on performance?",
    answer: "Weekly Slack or email updates with the key numbers. Monthly deep-dive reviews covering spend, leads, cost per lead, pipeline attribution and what we're changing next. You'll also have access to a live dashboard so you can check performance any time."
  },
  {
    question: "Can you work alongside our in-house team?",
    answer: "Absolutely. We often act as the strategic and execution layer while your team handles brand, content or CRM. We'll integrate with your existing tools and workflows – no duplication, no stepping on toes."
  }
];

const PaidMedia = () => {
  return (
    <>
      <ServiceSchema
        name="Paid Media Management"
        description="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers."
        url="/services/paid-media"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 34 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Paid Media", url: "/services/paid-media" }
      ]} />
      <Helmet>
        <title>Paid Media that Ties Spend to Pipeline | Avorria</title>
        <meta name="description" content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers." />
        <link rel="canonical" href="https://avorria.com/services/paid-media" />
        <meta property="og:title" content="Paid Media that Ties Spend to Pipeline | Avorria" />
        <meta property="og:description" content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords." />
        <meta property="og:url" content="https://avorria.com/services/paid-media" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paid Media that Ties Spend to Pipeline | Avorria" />
        <meta name="twitter:description" content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <HeroBand
          headline="Paid media that ties spend to pipeline."
          body="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers."
          backgroundImage={heroPaidMedia}
          cta={{ text: "Book a strategy call", href: "/contact" }}
          secondaryCta={{ text: "Get a free audit", href: "/free-seo-website-audit" }}
        />

        {/* Introduction */}
        <SectionBand background="light" padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-light leading-tight mb-8">
                  What paid media should actually do for your business.
                </h2>
                <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Paid media is the fastest way to put your offer in front of the right people – but most businesses treat it like a tap they can't control. Money goes in, "impressions" come out, and nobody can connect the dots between ad spend and actual revenue.
                  </p>
                  <p>
                    The problem is rarely the platforms. It's the strategy. Campaigns built around keywords instead of offers. Audiences defined by demographics instead of buying signals. Landing pages that talk about the company instead of the customer's problem.
                  </p>
                  <p>
                    We build paid media campaigns the way a commercial team would: start with the offer, work backwards to the audience, and measure everything against pipeline – not clicks.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Offer-led campaigns, not keyword spam", description: "Every campaign maps to a specific offer and commercial outcome." },
                  { icon: LineChart, title: "Full-funnel tracking from click to close", description: "Connect ad spend to leads, opportunities and revenue." },
                  { icon: Clock, title: "Weekly optimisation based on pipeline data", description: "We kill what doesn't work and scale what does – fast." },
                  { icon: Globe, title: "Unified strategy across Google, Meta and LinkedIn", description: "Coordinated messaging, offers and landing pages across platforms." },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="p-5 rounded-xl border border-border bg-card/50"
                  >
                    <feature.icon className="text-accent mb-3" size={24} />
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionBand>

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-4 text-center">
                Tired of spending on ads that don't convert?
              </h2>
              <p className="text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto">
                If any of these sound familiar, your paid media isn't working as hard as it should be.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-10">
                <ul className="space-y-6">
                  {[
                    "Burning budget on \"awareness\" campaigns with no clear path to revenue",
                    "Agency optimising for CTR and CPM while cost per qualified lead quietly doubles",
                    "Disconnected channels running in silos with no unified strategy",
                    "Attribution chaos – can't prove which campaigns actually drive pipeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-white/80">
                      <span className="text-accent mr-4 mt-1 font-bold text-lg">✗</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>

        {/* How We Approach */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-section-headline font-light mb-6">
                  How Avorria approaches paid media.
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  We structure campaigns around commercial offers, not vanity metrics. Every pound spent needs to justify itself in leads, opportunities or revenue.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: "Offer-led campaign structure",
                  description: "We build campaigns around what you're actually selling – not generic \"brand awareness\". Every campaign maps to a specific offer, landing page, and commercial outcome."
                },
                {
                  icon: LineChart,
                  title: "Pipeline-first tracking",
                  description: "We connect ad spend to leads, opportunities and revenue using proper attribution. You'll know exactly which campaigns are worth scaling and which should be cut."
                },
                {
                  icon: TrendingUp,
                  title: "Ruthless optimisation",
                  description: "Weekly reviews of what's working and what's not. We kill underperforming campaigns fast and double down on winners. No emotional attachment to creative that doesn't convert."
                },
                {
                  icon: Zap,
                  title: "Multi-channel coordination",
                  description: "Google Search, Meta, LinkedIn – we run them as a coordinated system, not separate campaigns. Messaging, offers and landing pages stay consistent while tactics adapt to each platform."
                }
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={0.1 * (i + 1)}>
                  <div className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <item.icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-heading-md text-foreground mb-4">{item.title}</h3>
                    <p className="text-soft leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <OpinionatedQuote quote="If your agency is reporting on impressions and click-through rates but can't tell you cost per qualified lead, they're measuring the wrong things. Vanity metrics are how agencies hide underperformance." />
          </div>
        </SectionBand>

        {/* What You Get */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">What you get as a client.</h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-6">
              <ul className="space-y-5">
                {[
                  "A campaign strategy document before we spend a penny",
                  "Weekly performance snapshots with the numbers that actually matter",
                  "Monthly deep-dive reviews with pipeline attribution",
                  "Quarterly budget recommendations based on what the data shows",
                  "Access to a live reporting dashboard – check performance any time"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" size={22} />
                    <span className="text-white/90 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionBand>

        {/* Process Timeline */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-section-headline font-light mb-4">How a typical paid media engagement runs.</h2>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {[
                { period: "Month 1", title: "Audit & setup", description: "Audit current campaigns and tracking. Define offers, audiences and landing page strategy. Set up proper conversion tracking and attribution." },
                { period: "Months 2–3", title: "Launch & test", description: "Launch initial campaigns across priority platforms. Test ad creative, audiences and offers. Rapid iteration based on early data – cut what doesn't work, scale what does." },
                { period: "Months 4–6", title: "Optimise & scale", description: "Refine targeting and creative based on pipeline data. Expand to additional platforms or audiences where the numbers support it. Tune landing pages and offers based on conversion data." },
                { period: "Month 6+", title: "Expand & compound", description: "Explore new campaign types and audiences. Build lookalikes from your best customers. Continually reallocate budget to highest-ROI channels." }
              ].map((phase, index) => (
                <ScrollReveal key={index}>
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-black/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                      <div className="md:w-36 mb-4 md:mb-0">
                        <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-lg text-sm">
                          {phase.period}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white mb-2">{phase.title}</h3>
                        <p className="text-white/70 leading-relaxed">{phase.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Platforms */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-section-headline font-light mb-4">Platforms we manage.</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  We don't spread thin across every platform. We focus on where your audience actually buys.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Google Ads",
                  description: "Search, Display, Shopping and YouTube campaigns built around high-intent keywords and commercial queries. We capture demand at the moment people are actively looking for what you sell."
                },
                {
                  title: "Meta (Facebook & Instagram)",
                  description: "Lead gen campaigns, retargeting funnels and lookalike audiences focused on qualified prospects. We build creative that stops the scroll and landing pages that convert the click."
                },
                {
                  title: "LinkedIn Ads",
                  description: "B2B campaigns targeting decision-makers by role, company size and industry. Thought leadership, lead gen and retargeting designed for longer sales cycles and higher-value deals."
                }
              ].map((platform, i) => (
                <ScrollReveal key={platform.title} delay={0.1 * (i + 1)}>
                  <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full">
                    <h3 className="text-heading-sm text-foreground mb-4">{platform.title}</h3>
                    <p className="text-soft leading-relaxed">{platform.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* FAQ */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-section-headline font-light mb-4">Paid media FAQ</h2>
              </div>
            </ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 bg-black/20 backdrop-blur-sm px-6 rounded-lg"
                >
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* CTA */}
        <SectionBand background="gradient" padding="hero">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-section-headline lg:text-6xl font-light mb-6">
                Ready to make your paid media accountable?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Book a free strategy call and we'll audit your current campaigns, show you where budget is being wasted, and build a plan focused on pipeline and revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/contact">
                    Book a strategy call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default PaidMedia;
