import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Target,
  Palette,
  Mail,
  Share2,
  BarChart3,
  CheckCircle2,
  Globe,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBand } from "@/components/ContentBand";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SEOHead from "@/components/seo/SEOHead";
import ParallaxBackground from "@/components/ParallaxBackground";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { ServiceStatsExplosion } from "@/components/services";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import serviceWebDesign from "@/assets/service-web-design.jpg";
import heroServicesDigital from "@/assets/hero-services-digital.jpg";

const services = [
  {
    icon: Search,
    title: "SEO",
    description:
      "Technical SEO, site architecture and on-page optimisation for real businesses – not bloggers. We fix what's broken, build the pages and content you're missing and target the keywords that attract qualified demand.",
    href: "/services/seo",
    stat: "+132%",
    statLabel: "avg organic traffic",
  },
  {
    icon: Target,
    title: "Paid Media",
    description:
      "Google, Meta and LinkedIn campaigns structured around your offers, not random keywords. We set clear CPL/ROAS targets, build conversion-focused journeys and cut anything that can't justify its spend.",
    href: "/services/paid-media",
    stat: "3.2x",
    statLabel: "avg ROAS",
  },
  {
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one so every visit has a clear, frictionless path to enquiry.",
    href: "/services/web-design",
    stat: "+89%",
    statLabel: "conversion rate",
  },
  {
    icon: Mail,
    title: "Content & Email Marketing",
    description:
      "Long-form content, playbooks and email sequences designed to educate buyers, warm up demand and support your sales team. No random blogs – just assets that move people to ready-to-talk.",
    href: "/services/content-email",
    stat: "+312%",
    statLabel: "email revenue",
  },
  {
    icon: Share2,
    title: "Social & Personal Brand",
    description:
      "Consistent, credible content for founders and expert teams. We turn your expertise into LinkedIn, Instagram and short-form content that builds trust and drives inbound.",
    href: "/services/social-personal-brand",
    stat: "4.7x",
    statLabel: "engagement rate",
  },
  {
    icon: BarChart3,
    title: "Analytics & CRO",
    description:
      "Tracking, dashboards and systematic CRO. We untangle GA4, tags and pixels, then continually test improvements across your site and funnels so you can reallocate budget based on truth.",
    href: "/services/analytics",
    stat: "100%",
    statLabel: "tracking accuracy",
  },
];

const faqs = [
  {
    question: "How do you decide which services a business needs?",
    answer:
      "We start with a diagnostic – a free audit of your website, analytics, SEO footprint and paid activity. From there we recommend only the channels that will move your pipeline in the next 90 days. We don't sell packages; we build a scope around what your business actually needs right now.",
  },
  {
    question: "Do we have to commit to all services at once?",
    answer:
      "No. Most clients start with one or two services – usually SEO and web design or paid media and analytics. Once those channels are generating predictable results, we layer in additional services. You're never locked in; every engagement is month-to-month after the initial build phase.",
  },
  {
    question: "How quickly will we see results?",
    answer:
      "Paid media campaigns typically show meaningful data within 2–4 weeks. SEO is a compounding channel – expect early wins in months 2–3 and significant traction by month 6. Web design projects launch in 6–10 weeks depending on scope. We set realistic timelines upfront so there are no surprises.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialise in B2B and service businesses – professional services, SaaS, construction, trades, healthcare and e-commerce. If you sell a considered purchase (not impulse buys), our approach is likely a strong fit. We've worked with businesses from £500k to £50M+ in revenue.",
  },
  {
    question: "How is Avorria different from other digital marketing agencies?",
    answer:
      "Three things: we only take on work where we can demonstrably impact pipeline and revenue; we build and own the assets (sites, landing pages, dashboards) rather than outsourcing to freelancers; and we report on commercial outcomes – leads, cost per acquisition, pipeline value – not vanity metrics like impressions.",
  },
  {
    question: "What does the onboarding process look like?",
    answer:
      "After the strategy call we run a 2-week discovery sprint: audit your current digital presence, map your buyer journey, review competitor positioning and build a prioritised 90-day roadmap. You'll have a named strategist and a dedicated Slack channel from day one.",
  },
];

const processSteps = [
  {
    phase: "Week 1–2",
    title: "Diagnostic & Discovery",
    description:
      "We audit your website, analytics, SEO footprint, ad accounts and competitor landscape. You get a blunt assessment of what's working, what isn't and where the biggest opportunities sit.",
  },
  {
    phase: "Week 3–4",
    title: "Strategy & Roadmap",
    description:
      "We build a prioritised 90-day plan with clear KPIs, channel recommendations and a phased timeline. No 40-page decks – just the decisions that matter and the order to execute them.",
  },
  {
    phase: "Month 2–3",
    title: "Build & Launch",
    description:
      "We execute the highest-impact items first: landing pages, ad campaigns, technical SEO fixes, tracking setup. Every deliverable is reviewed with you before it goes live.",
  },
  {
    phase: "Month 4+",
    title: "Optimise & Scale",
    description:
      "With data flowing, we run weekly optimisation cycles – adjusting bids, testing copy, publishing content, improving conversion rates. Monthly reviews tie everything back to pipeline and revenue.",
  },
];

const Services = () => {
  return (
    <>
      <SEOHead
        title="Digital Marketing Services | SEO, Paid Media & Web Design"
        description="Full-service digital marketing for B2B and service businesses. SEO, paid media, web design, content marketing and analytics – all tied to pipeline and revenue, not vanity metrics."
        canonical="/services"
        keywords={[
          "digital marketing services",
          "SEO services UK",
          "PPC management",
          "web design agency",
          "B2B marketing agency",
          "lead generation services",
          "content marketing",
          "marketing analytics",
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <ServiceSchema
        name="Digital Marketing Services"
        description="Full-service digital marketing: SEO, paid media, web design, content marketing and analytics for B2B and service businesses."
        url="/services"
      />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen">
        {/* Hero */}
        <section>
          <ParallaxBackground
            backgroundImage={heroServicesDigital}
            overlay="dark"
            speed={0.25}
            minHeight="70vh"
          >
            <div className="relative z-10 flex flex-col justify-center min-h-[70vh] px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-6"
                >
                  Full-Service Digital Marketing
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
                >
                  Digital marketing that moves{" "}
                  <span className="text-accent font-normal">pipeline, not metrics.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                >
                  We design, build and optimise the assets that generate qualified leads and revenue
                  – from SEO and paid campaigns to websites, content and tracking.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button variant="accent" size="lg" asChild>
                    <Link to="/contact">
                      Book Strategy Call
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button variant="outline-dark" size="lg" asChild>
                    <Link to="/free-seo-website-audit">Get Free Audit</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </ParallaxBackground>
        </section>

        {/* Introduction Section */}
        <section id="intro"><SectionBand background="light">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Explainer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-6 leading-tight">
                  What full-service digital marketing should actually look like
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Most agencies sell channels in silos – an SEO team here, a PPC team there, a web
                    designer somewhere else. The result? Disconnected tactics, duplicated effort and
                    no one owning the commercial outcome.
                  </p>
                  <p>
                    We take a different approach. Every service we deliver is part of a single growth
                    system: your SEO strategy informs your content plan, your paid campaigns drive
                    traffic to pages we've built to convert, and your analytics setup tells us
                    exactly what's working so we can double down or cut spend.
                  </p>
                  <p>
                    The goal isn't to run more campaigns. It's to build a marketing engine that
                    generates qualified leads predictably – one you can scale up when you're ready
                    and that compounds over time.
                  </p>
                </div>
              </motion.div>

              {/* Right: Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: TrendingUp,
                    title: "Revenue-first strategy",
                    desc: "Every recommendation is tied to pipeline impact, not channel-level vanity metrics.",
                  },
                  {
                    icon: Globe,
                    title: "Integrated channels",
                    desc: "SEO, paid, web and content working as one system – not competing for credit.",
                  },
                  {
                    icon: Zap,
                    title: "90-day execution cycles",
                    desc: "Prioritised sprints with clear deliverables. No 6-month strategies that gather dust.",
                  },
                  {
                    icon: BarChart3,
                    title: "Transparent reporting",
                    desc: "Live dashboards showing leads, cost per acquisition and revenue attribution.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-lg border border-border bg-card space-y-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="text-accent" size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </SectionBand>

        {/* Services Grid */}
        <section id="services"><SectionBand background="gradient">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
                Our services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every service is delivered with the same mindset: clear strategy, precise execution
                and ruthless focus on commercial outcomes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    to={service.href}
                    className="block p-8 rounded-xl border border-border bg-card hover:border-accent/30 transition-all duration-300 group h-full"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <service.icon className="text-accent" size={24} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                            {service.title}
                          </h3>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold text-accent">{service.stat}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">
                              {service.statLabel}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center text-accent font-medium text-sm gap-2 group-hover:gap-3 transition-all">
                          Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionBand>

        <OpinionatedQuote quote="If your agency reports on impressions and clicks but can't tell you cost per qualified lead, they're not a marketing partner – they're a media buyer with a nice deck." />

        {/* How We Work - Process */}
        <section id="process"><SectionBand background="dark">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                How we work
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                A clear, phased approach that gets to results fast – no drawn-out discovery phases
                or months of "building foundations" before anything happens.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="p-6 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm h-full space-y-4">
                    <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                      {step.phase}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Stats */}
        <ServiceStatsExplosion />

        {/* What You Get */}
        <section id="deliverables"><SectionBand background="light">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                What you get as a client
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Beyond the deliverables specific to each channel, every Avorria client receives:
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Named strategist and dedicated Slack channel",
                "90-day prioritised roadmap updated quarterly",
                "Live performance dashboard with real-time data",
                "Weekly optimisation updates (async or call)",
                "Monthly strategy review with pipeline attribution",
                "Quarterly business review with leadership team",
                "Full ownership of all assets we create",
                "Transparent time and budget tracking",
                "Direct access to the team doing the work",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                >
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Web Design Feature Band */}
        <SectionBand background="mesh">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
                  Web Design & Development
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-6">
                  Websites that look sharp and sell hard
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every section, layout and CTA is engineered for conversions, not awards. Built on
                  a modern stack with SEO, speed and CRO wired in from day one so every visit has a
                  clear, frictionless path to enquiry.
                </p>
                <Button variant="default" asChild>
                  <Link to="/services/web-design">
                    View Web Design Services <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <img
                  src={serviceWebDesign}
                  alt="Modern conversion-optimised website design by Avorria"
                  className="rounded-xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </SectionBand>

        {/* FAQ Section */}
        <section id="faq"><SectionBand background="gradient">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                Common questions
              </h2>
              <p className="text-muted-foreground">
                Straight answers to the questions we hear most from prospective clients.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* Final CTA */}
        <section>
          <ParallaxBackground
            backgroundImage={heroCityscape}
            overlay="dark"
            speed={0.2}
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                    Ready to build a marketing engine that compounds?
                  </h2>
                  <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                    Book a strategy call or request a free audit and we'll tell you – bluntly –
                    where your next 90 days of effort should go.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild>
                      <Link to="/contact">
                        Book Strategy Call
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline-dark" size="lg" asChild>
                      <Link to="/free-seo-website-audit">Get Free SEO & Website Audit</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </ParallaxBackground>
        </section>
      </div>
    </>
  );
};

export default Services;
