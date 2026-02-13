import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, TrendingUp, X, Target, LineChart } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { HeroBand, ContentBand, SectionBand } from "@/components/ContentBand";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import heroSeoImage from "@/assets/service-seo.jpg";

const SEOServices = () => {
  const painPoints = [
    "You get long reports but still don't know what's actually been done each month.",
    "Rankings may be up, but leads and revenue haven't shifted.",
    "Nobody can clearly explain how SEO ties into your overall funnel and sales process.",
    "You've got content, but no clear structure, clusters or internal linking strategy.",
    "Technical issues and slow pages keep getting 'added to the list' but never fixed.",
  ];

  const included = {
    technical: [
      "Full technical audit and prioritised fix list.",
      "Site architecture and internal linking strategy.",
      "Core Web Vitals, speed and crawlability improvements.",
      "Schema and structured data setup where relevant.",
    ],
    onPage: [
      "Page-level optimisation for key commercial pages.",
      "Title, meta, headings and content tuned for intent, not keyword stuffing.",
      "Improved UX elements that support conversion (CTAs, proof, clarity).",
    ],
    content: [
      "Keyword research focused on commercial and high-intent terms.",
      "Topic clusters and content plans tied to stages of your buyer journey.",
      "Briefs and/or full content creation where required.",
      "Ongoing optimisation of existing content.",
    ],
    local: [
      "Local landing pages planned and built properly.",
      "Google Business Profile optimisation and management.",
      "Citations and local SERP assets (where they matter).",
    ],
    tracking: [
      "Clean analytics and goals setup.",
      "Dashboards showing organic traffic, leads and pipeline – not just rankings.",
      "Clear monthly commentary on what changed and why.",
    ],
  };

  const timeline = [
    {
      period: "Month 0–1",
      title: "Audit & foundations",
      description:
        "Technical and content audit. Tracking and analytics clean-up. Quick on-page wins on high-impact pages.",
    },
    {
      period: "Months 2–3",
      title: "Structure & content",
      description:
        "Implement core technical fixes. Roll out new information architecture and internal linking. Launch priority content and update existing assets.",
    },
    {
      period: "Months 4–6",
      title: "Compounding gains",
      description:
        "Expand content clusters. Strengthen ranking positions for core terms. Tune pages and CTAs based on real conversion data.",
    },
    {
      period: "Month 6+",
      title: "Scale and refine",
      description:
        "Double down where we see strongest ROI. Explore new keyword sets and assets. Continually reallocate effort based on what the data actually shows.",
    },
  ];

  const deliverables = [
    "A clear initial audit and prioritised action plan.",
    "Monthly dashboards covering organic traffic, leads and key pages.",
    "Short, plain-English summary of work completed and results.",
    "Access to our reporting hub so you can check numbers any time.",
    "A backlog of upcoming SEO actions so you always know what's next.",
  ];

  const caseStudies = [
    {
      title: "Multi-location services brand",
      result: "+132% non-branded organic traffic and +89% organic enquiries in 9 months.",
      description: "Rebuilt architecture and content strategy.",
    },
    {
      title: "Specialist B2B services company",
      result: "Ranking for high-intent terms they'd been missing for years.",
      description: "Technical clean-up and targeted content.",
    },
  ];

  const faqs = [
    {
      question: "How long until we see results?",
      answer:
        "It depends where you're starting from, but most clients see early movement in 2–3 months and meaningful commercial impact in 4–6 months. We'll be clear about realistic timelines upfront.",
    },
    {
      question: "Do you lock us into long contracts?",
      answer:
        "No. We normally recommend at least a 6-month runway for SEO, but we don't hide behind punitive long-term contracts.",
    },
    {
      question: "Can you work with our in-house dev/content team?",
      answer:
        "Yes. We can either handle implementation end-to-end, or act as the strategic and technical layer that briefs your internal teams.",
    },
    {
      question: "Will SEO replace paid ads?",
      answer:
        "Not usually. SEO and paid work best together – SEO for compounding inbound demand, paid for speed and control. We'll help you balance both.",
    },
  ];

  return (
    <>
      <ServiceSchema
        name="SEO Services"
        description="Technical SEO, content strategy and organic search optimisation for B2B and service businesses. We focus on commercial keywords that drive qualified leads and revenue."
        url="/services/seo"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 47 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "SEO", url: "/services/seo" }
      ]} />
      <Helmet>
        <title>SEO Agency Sheffield & London | Technical SEO & Content Strategy | Avorria</title>
        <meta name="description" content="Expert SEO services for B2B and service businesses. Technical SEO audits, content strategy, local SEO and on-page optimisation focused on commercial keywords that drive qualified leads." />
        <meta name="keywords" content="SEO agency, SEO services, technical SEO, content strategy, local SEO, B2B SEO, Sheffield SEO agency, London SEO agency, organic search, keyword research" />
        
        <meta property="og:title" content="SEO Agency Sheffield & London | Avorria" />
        <meta property="og:description" content="Technical SEO, content strategy and on-page optimisation focused on commercial keywords that drive qualified leads and revenue." />
        <meta property="og:url" content="https://avorria.com/services/seo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-seo-services.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Agency Sheffield & London | Avorria" />
        <meta name="twitter:description" content="Technical SEO, content strategy and on-page optimisation focused on commercial keywords." />
        
        <link rel="canonical" href="https://avorria.com/services/seo" />
      </Helmet>

    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBand
        headline="SEO that connects rankings to revenue."
        body="We combine technical SEO, content strategy and on-site optimisation to win the searches that actually lead to pipeline – then remove the friction that stops those visitors becoming customers."
        backgroundImage={heroSeoImage}
        cta={{ text: "Book an SEO strategy call", href: "/contact" }}
        secondaryCta={{ text: "Get a free SEO audit", href: "/free-seo-website-audit" }}
      />

      {/* Introduction */}
      <SectionBand background="light" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light leading-tight mb-8 text-foreground">
                What SEO actually means for your business.
              </h2>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  SEO isn't a technical mystery or a monthly report full of jargon. It's a revenue channel. When it's done properly, it means the right people find your business at the exact moment they're looking for what you sell – and they keep finding you, month after month, without you paying per click.
                </p>
                <p>
                  The problem is that most SEO work focuses on the wrong things: vanity rankings for terms nobody searches, content that ticks a box but doesn't convert, and technical audits that gather dust. What's missing is a commercial strategy – one that targets the searches your buyers actually make and builds the kind of authority that compounds over time.
                </p>
                <p>
                  That's what we do. We treat SEO as a business growth lever, not a checkbox. Every keyword we target, every page we optimise and every piece of content we create is tied to a commercial outcome – more qualified leads, better pipeline, stronger revenue.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Commercial keyword targeting", description: "We go after the searches your buyers actually make – not vanity terms with no purchase intent." },
                { icon: TrendingUp, title: "Technical foundations that compound", description: "Site speed, structure and crawlability fixes that keep paying dividends for years." },
                { icon: CheckCircle2, title: "Content that ranks and converts", description: "Strategic content built around buyer intent, not keyword volume." },
                { icon: LineChart, title: "Transparent reporting tied to pipeline", description: "Dashboards showing organic traffic, leads and revenue – not just ranking positions." },
              ].map((feature, i) => (
                <ScrollReveal key={feature.title} delay={0.1 * (i + 1)}>
                  <div className="p-5 rounded-xl border border-border bg-card/50">
                    <feature.icon className="text-accent mb-3" size={24} />
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Pain Points */}
      <SectionBand background="gradient" padding="large">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-section-headline font-light mb-10 text-center">
              If you're already paying for SEO, some of this might sting.
            </h2>
          </ScrollReveal>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10">
            <ul className="space-y-5">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <X className="text-accent mr-4 mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-xl text-white/90 mt-10 font-medium max-w-3xl mx-auto">
            You don't need more waffle about algorithms. You need a clear plan to win the right searches, fix the technical drag and connect organic performance to your pipeline.
          </p>
        </div>
      </SectionBand>

      {/* What's Included */}
      <SectionBand background="dark" padding="large">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-section-headline font-light mb-16 text-center">
              What Avorria SEO actually covers.
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Technical & structure</h3>
                <div className="space-y-4">
                  {included.technical.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">On-page optimisation</h3>
                <div className="space-y-4">
                  {included.onPage.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Content & keyword strategy</h3>
                <div className="space-y-4">
                  {included.content.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Local & multi-location SEO</h3>
                <div className="space-y-4">
                  {included.local.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-2">
              <div className="space-y-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Tracking & reporting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {included.tracking.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <OpinionatedQuote quote="Most SEO agencies optimise for rankings. We optimise for revenue. If a keyword ranks but doesn't convert, it's a vanity metric – and we don't bill you for vanity." />
        </div>
      </SectionBand>

      {/* Process Timeline */}
      <SectionBand background="mesh" padding="large">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-section-headline font-light mb-4">How a typical SEO engagement runs.</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
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
          <p className="text-center text-white/70 mt-12 max-w-3xl mx-auto text-lg">
            SEO is compounding by nature. Our job is to shorten the time it takes to see commercial impact – and to show you transparently what's happening along the way.
          </p>
        </div>
      </SectionBand>

      {/* Deliverables & Reporting */}
      <SectionBand background="gradient" padding="large">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-section-headline font-light mb-12 text-center">What you see as a client.</h2>
          </ScrollReveal>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-6">
            <ul className="space-y-5">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-white/90 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionBand>

      {/* SEO by Industry */}
      <SectionBand background="dark" padding="large">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-section-headline font-light mb-4">SEO by industry</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Industry-specific SEO strategies built around how your buyers actually search and evaluate.
              </p>
            </div>
          </ScrollReveal>
          <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Trades & Home Services</h3>
                <p className="text-white/60 mb-6">
                  Local SEO that fills your diary with the right jobs in the right locations.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link to="/seo/for/trades-home-services">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Professional Services</h3>
                <p className="text-white/60 mb-6">
                  SEO that attracts better-fit clients and feeds your pipeline with qualified enquiries.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link to="/seo/for/professional-services">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">B2B SaaS</h3>
                <p className="text-white/60 mb-6">
                  SEO that feeds your pipeline with demos and trials, not just blog traffic.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link to="/seo/for/b2b-saas">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">E-commerce Brands</h3>
                <p className="text-white/60 mb-6">
                  SEO that moves revenue, not just rankings – with clean structure and conversion focus.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link to="/seo/for/ecommerce-brands">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Location Brands</h3>
                <p className="text-white/60 mb-6">
                  SEO that keeps every location and profile pulling its weight with structured local strategy.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link to="/seo/for/multi-location-brands">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
                <p className="text-white/60 mb-4">
                  Don't see your industry? We work with many sectors.
                </p>
                <Button variant="outline-dark" size="sm" asChild>
                  <Link to="/contact">Discuss your industry</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollRevealGrid>
        </div>
      </SectionBand>

      {/* Case Study Teaser */}
      <SectionBand background="gradient" padding="large">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-section-headline font-light mb-4">What good SEO looks like in practice.</h2>
            </div>
          </ScrollReveal>
          <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={100}>
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <TrendingUp className="text-accent" size={32} />
                  <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                  <p className="text-lg font-medium text-accent">{study.result}</p>
                  <p className="text-white/60 leading-relaxed">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollRevealGrid>
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline-dark" size="lg" asChild>
                <Link to="/case-studies">View case studies</Link>
              </Button>
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">Book an SEO strategy call</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionBand>

      {/* SEO by Location */}
      <SectionBand background="dark" padding="large">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-section-headline font-light mb-4">SEO by location</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Prefer to work with a team who knows your patch?
              </p>
            </div>
          </ScrollReveal>
          <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">SEO Agency Sheffield</h3>
                <p className="text-white/60 mb-4">
                  Performance-focused SEO for Sheffield and South Yorkshire businesses.
                </p>
                <Button variant="outline-dark" size="sm" asChild>
                  <Link to="/seo-agency/sheffield">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">SEO Agency London</h3>
                <p className="text-white/60 mb-4">
                  Pipeline-focused SEO strategy for London-based teams.
                </p>
                <Button variant="outline-dark" size="sm" asChild>
                  <Link to="/seo-agency/london">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">SEO Across the UK</h3>
                <p className="text-white/60 mb-4">
                  Work with us wherever you're based in the UK.
                </p>
                <Button variant="outline-dark" size="sm" asChild>
                  <Link to="/digital-marketing-agency/uk">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollRevealGrid>
        </div>
      </SectionBand>

      {/* FAQ */}
      <SectionBand background="mesh" padding="large">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-section-headline font-light mb-4">SEO FAQ</h2>
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

      {/* Final CTA */}
      <SectionBand background="gradient" padding="hero">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-section-headline lg:text-6xl font-light mb-6">
              Want blunt, grown-up SEO advice?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Send us your site and we'll tell you exactly where you're wasting potential, what's holding you back and what we'd do first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/free-seo-website-audit">
                  Get a free SEO audit
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline-dark" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">Book an SEO strategy call</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </SectionBand>
    </div>
    </>
  );
};

export default SEOServices;
