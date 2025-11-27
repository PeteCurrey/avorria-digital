import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, CheckCircle2, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeroStats from "@/components/HeroStats";
import ScrollIndicator from "@/components/ScrollIndicator";
import FloatingChatButton from "@/components/FloatingChatButton";
import { SlideInPanel } from "@/components/SlideInPanel";
import { ExitIntentPopover } from "@/components/ExitIntentPopover";
import Navigation from "@/components/Navigation";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { LogoWall } from "@/components/LogoWall";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import heroCityscape from "@/assets/hero-cityscape.jpg";
const Home = () => {
  const services = [{
    title: "SEO",
    description: "Technical SEO, content strategy and on-site optimisation that focuses on commercial keywords, not ego rankings. We fix what's broken, build what's missing and link it all to real leads and revenue.",
    href: "/services/seo"
  }, {
    title: "Paid Media (Google, Meta, LinkedIn)",
    description: "Acquisition that pays for itself. We design and run campaigns tied tightly to your offer, your funnel and your sales process – with clear ROAS and CPL targets, not 'best effort.'",
    href: "/services/paid-media"
  }, {
    title: "Web Design & Development",
    description: "High-end websites and landing pages built for speed, clarity and conversion. Modern stack, clean code, proper tracking and a layout that makes your sales process obvious.",
    href: "/services/web-design"
  }, {
    title: "Content & Email",
    description: "Content that attracts the right people and email that moves them through the funnel. From SEO articles and playbooks to nurture flows and launch campaigns.",
    href: "/services/content-email"
  }, {
    title: "Social & Personal Brand",
    description: "Done-for-you content systems for founders and expert teams. Think LinkedIn, Instagram and short-form content that positions you as the obvious choice in your market.",
    href: "/services/social-personal-brand"
  }];
  const process = [{
    number: "01",
    title: "Discovery & audit",
    description: "We review your current site, traffic, tracking and campaigns. You'll get a blunt view of what's working, what isn't and what's missing."
  }, {
    number: "02",
    title: "Roadmap & quick wins",
    description: "We map out a 90-day plan that balances quick commercial wins with the foundations you've been putting off – tracking, site speed, structure, funnels."
  }, {
    number: "03",
    title: "Build, launch, optimise",
    description: "We execute. New assets, improved journeys, tighter campaigns. Everything shipped with tracking, QA and a clear 'before vs after'."
  }, {
    number: "04",
    title: "Review, refine, scale",
    description: "Every month you get a clear dashboard and a straight answer: what we did, what moved, what we're doing next. When the numbers justify it, we scale."
  }];
  const caseStudies = [{
    metric: "+184%",
    metricLabel: "organic leads in 6 months",
    description: "for a multi-site service brand."
  }, {
    metric: "38%",
    metricLabel: "drop in cost per qualified lead",
    description: "after rebuilding the funnel and landing pages."
  }, {
    metric: "2.4x",
    metricLabel: "pipeline from inbound",
    description: "in under a year for a B2B services business."
  }];
  const comparison = [{
    feature: "Reporting",
    typical: "Slide decks full of clicks and impressions.",
    avorria: "Dashboards showing leads, pipeline and ROI – plus a one-minute written summary."
  }, {
    feature: "Strategy",
    typical: "'We'll test some campaigns and see what happens.'",
    avorria: "Clear 90-day roadmap tied to business targets."
  }, {
    feature: "Technical depth",
    typical: "Surface-level SEO and tagging.",
    avorria: "Technical audits, proper tracking, site architecture and CRO as standard."
  }, {
    feature: "Design",
    typical: "Pretty sites that don't convert.",
    avorria: "Clean, modern UX engineered around CTAs, proof and clarity."
  }, {
    feature: "Communication",
    typical: "Monthly calls when renewal is due.",
    avorria: "Regular updates, proactive ideas and straight answers."
  }];
  const testimonials = [{
    quote: "Within a couple of months we actually understood where our leads were coming from and what to double down on. The reporting is brutally clear – in a good way.",
    author: "",
    role: "",
    company: ""
  }, {
    quote: "They rebuilt our site and landing pages without drama. Same traffic, better structure, calls and enquiries went up. No hype, just a very competent team.",
    author: "",
    role: "",
    company: ""
  }, {
    quote: "We didn't want another 'creative agency'. We wanted someone to help us hit numbers. Avorria behaves like an in-house growth function, not a vendor.",
    author: "",
    role: "",
    company: ""
  }];
  const faqs = [{
    question: "What size businesses do you work with?",
    answer: "Mostly established service businesses, multi-location brands and B2B teams who are already investing in marketing and want to get more disciplined and effective with it."
  }, {
    question: "Do you only work on retainers?",
    answer: "No. We do one-off rebuilds and projects where it makes sense, but most of our impact comes from ongoing work – strategy, execution and optimisation over time."
  }, {
    question: "Is there a minimum budget?",
    answer: "If you're spending less than £2k/month in total on marketing, you're probably better off with lighter, DIY support. Above that, we can usually make a meaningful difference."
  }, {
    question: "Do you tie into our CRM and internal reporting?",
    answer: "Yes. Wherever possible we build dashboards that connect marketing numbers to your sales pipeline and revenue, not just clicks and forms."
  }, {
    question: "How do we get started?",
    answer: "Either request a free SEO & website audit, or book a strategy call. We'll review your current setup, give you a straight assessment and outline what we'd actually do."
  }];
  return <>
      <Helmet>
        <title>Avorria – Digital Growth Systems for Serious Teams</title>
        <meta name="description" content="Avorria designs, builds and optimises SEO, paid media, websites and tracking so your marketing actually moves pipeline, not just vanity metrics." />
        
        <meta property="og:title" content="Avorria – Digital Growth Systems for Serious Teams" />
        <meta property="og:description" content="Avorria designs, builds and optimises SEO, paid media, websites and tracking so your marketing actually moves pipeline, not just vanity metrics." />
        <meta property="og:url" content="https://avorria.com" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Avorria – Digital Growth Systems for Serious Teams" />
        <meta name="twitter:description" content="Avorria designs, builds and optimises SEO, paid media, websites and tracking so your marketing actually moves pipeline, not just vanity metrics." />
        
        <link rel="canonical" content="https://avorria.com" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Avorria",
            "url": "https://avorria.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://avorria.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* Override default navigation with transparent version */}
      <div className="relative z-50">
        <Navigation transparent={true} />
      </div>

      <div className="min-h-screen">
        {/* Full-Screen Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
        backgroundImage: `url(${heroCityscape})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              {/* Hero Copy - Center-left aligned */}
              <div className="space-y-8 mb-16 animate-fade-in">
                <h1 className="text-5xl leading-tight text-white lg:text-3xl font-extralight">
                  Digital Marketing, SEO &amp; Web Experiences that Actually Convert.
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-3xl font-extralight lg:text-base">
                  Avorria is your performance-first digital partner. We combine high end design, technical SEO &amp; paid acquisition to turn traffic into pipeline – not just prettier dashboards.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="text-lg px-8 py-6 bg-card/40 backdrop-blur-sm text-foreground border border-border/50 hover:bg-card/60 font-extralight" asChild>
                    <Link to="/contact">Book a strategy call</Link>
                  </Button>
                  <Button size="lg" className="text-lg px-8 py-6 bg-card/40 backdrop-blur-sm text-foreground border border-border/50 hover:bg-card/60 font-extralight" asChild>
                    <Link to="/free-seo-website-audit">Get a free SEO & website audit</Link>
                  </Button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="animate-fade-in-up" style={{
              animationDelay: "300ms"
            }}>
                <HeroStats />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <ScrollIndicator />
          </div>
        </section>

        {/* Floating Chat Button */}
        <FloatingChatButton />

        {/* Trust Bar */}
        <section className="py-12 border-y border-border bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-lg font-semibold text-foreground mb-4">
              Trusted by teams who are done wasting budget on noise.
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              We work with growing service businesses, multi-site brands and high-ticket B2B teams who want grown-up conversations about revenue, not vanity metrics.
            </p>
            <LogoWall type="clients" />
          </div>
        </section>

        {/* Value Props */}
        <section className="py-24 px-6 bg-secondary relative overflow-hidden">
          {/* Subtle gradient mesh background */}
          <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-50" />
          
          <div className="container mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-light mb-4 text-foreground max-w-3xl mx-auto">
                  Why teams work with Avorria
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" stagger={100}>
              <Card className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--duration-base)]">
                    <Target className="text-accent" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                    Pipeline-first, not buzzword-first
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Most marketing talks about impressions, CTR and "brand lift". We start with pipeline targets and work backwards. Every channel, campaign and asset is judged on one thing: does it move revenue in the right direction?
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--duration-base)]">
                    <Zap className="text-accent" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                    Technical firepower baked in
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tracking, analytics, technical SEO, CRO, tagging – they're not bolt-ons. They're the foundation. If your numbers are wrong or your site is slow, we fix that first. Then we scale.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--duration-base)]">
                    <TrendingUp className="text-accent" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                    Design that earns its keep
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We build sites and funnels that look like top-tier agency work, but every layout, block and CTA is engineered for conversions. No award-chasing fluff. Just clean, modern UX that makes it easy for people to buy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--duration-base)]">
                    <BarChart3 className="text-accent" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                    Plain-English reporting
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You'll never get a 40-page PDF that tells you nothing. Our dashboards show traffic, leads, pipeline and ROI in one place – with a short narrative on what we did, what changed and what's next.
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealGrid>

            <OpinionatedQuote quote="If your SEO report doesn't mention revenue, it's a vanity exercise." />
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">What we actually do</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategy, execution and optimisation under one roof.
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                You don't need five different suppliers. You need one team that can connect the dots – from strategy and messaging through to build, launch and ongoing optimisation.
              </p>
            </div>
            <ScrollRevealGrid className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" stagger={100}>
              {services.map((service, index) => <Card key={index} className="border-border hover:border-accent/50 transition-all duration-[var(--duration-base)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 group">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <Link to={service.href} className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-all duration-[var(--duration-fast)] group/link">
                      View service details
                      <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-[var(--duration-fast)]" size={18} />
                    </Link>
                  </CardContent>
                </Card>)}
            </ScrollRevealGrid>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">Simple process. Serious output.</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => <div key={index} className="relative">
                  <div className="space-y-4">
                    <div className="text-6xl font-light text-accent/20">{step.number}</div>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {index < process.length - 1 && <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-accent/30" />}
                </div>)}
            </div>
          </div>
        </section>

        {/* Case Studies Highlights */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">Proof over promises.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're not allowed to put most client numbers on a public website. But here's the flavour of what happens when you stop treating marketing as an experiment and start treating it as an operating function.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {caseStudies.map((study, index) => <Card key={index} className="border-border hover:shadow-xl transition-all group">
                  <CardContent className="p-8 space-y-4">
                    <div className="text-5xl font-light text-accent mb-4">{study.metric}</div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">{study.metricLabel}</div>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                  </CardContent>
                </Card>)}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/case-studies">View case studies</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">
                What makes Avorria different to a typical agency?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                If you've ever stared at an agency report and thought "I still don't know if this is working", you already know the problem. We built Avorria as the opposite of that experience.
              </p>
            </div>
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-6 text-foreground font-semibold border-b border-border">Feature</th>
                        <th className="text-left p-6 text-foreground font-semibold border-b border-border">
                          Typical agency
                        </th>
                        <th className="text-left p-6 text-accent font-semibold border-b border-border">Avorria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((item, index) => <tr key={index} className="border-b border-border last:border-b-0">
                          <td className="p-6 font-medium text-foreground">{item.feature}</td>
                          <td className="p-6 text-muted-foreground">{item.typical}</td>
                          <td className="p-6 text-foreground font-medium">{item.avorria}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Local Expertise Callout */}
        <section className="py-16 px-6 bg-background border-y border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg text-muted-foreground">
              Prefer to work with a team who knows your patch? See our{" "}
              <Link to="/seo-agency/sheffield" className="text-accent hover:text-accent/80 font-medium">
                SEO
              </Link>
              {" "}and{" "}
              <Link to="/web-design/sheffield" className="text-accent hover:text-accent/80 font-medium">
                web design services in Sheffield
              </Link>
              ,{" "}
              <Link to="/digital-marketing-agency/yorkshire" className="text-accent hover:text-accent/80 font-medium">
                Yorkshire
              </Link>
              {" "}and{" "}
              <Link to="/digital-marketing-agency/uk" className="text-accent hover:text-accent/80 font-medium">
                across the UK
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">What clients say when the noise stops.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => <Card key={index} className="border-border">
                  <CardContent className="p-8">
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">Questions we get a lot.</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-background px-6 rounded-lg">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
              Ready to treat marketing like an operating function, not a gamble?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              If you're tired of noise, guesswork and vague reports, let's talk. We'll review your current setup and show you what a disciplined, revenue-focused marketing engine could look like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book a strategy call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/free-seo-website-audit">Request a free SEO & website audit</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Slide-in Panel and Exit Intent */}
        <SlideInPanel />
        <ExitIntentPopover />
      </div>
    </>;
};
export default Home;