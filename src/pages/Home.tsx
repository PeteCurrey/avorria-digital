import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, CheckCircle2, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const services = [
    {
      title: "SEO",
      description: "Technical SEO, content strategy, and link building that drives revenue, not just rankings.",
      href: "/services/seo",
    },
    {
      title: "Paid Media",
      description: "Google, Meta, and LinkedIn campaigns engineered for pipeline, not vanity metrics.",
      href: "/services/paid-media",
    },
    {
      title: "Web Design & Development",
      description: "High-converting sites that blend premium design with technical performance.",
      href: "/services/web-design",
    },
    {
      title: "Content & Email",
      description: "Long-form content and nurture sequences that educate, engage, and convert.",
      href: "/services/content-email",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Audit",
      description: "Deep dive into your current state, competitors, and opportunities. We identify quick wins and long-term strategy.",
    },
    {
      number: "02",
      title: "Roadmap & Quick Wins",
      description: "Prioritized action plan with immediate optimizations that show results within 30 days.",
    },
    {
      number: "03",
      title: "Build & Launch",
      description: "Execute campaigns, content, and technical improvements with full transparency and tracking.",
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description: "Continuous testing, refinement, and scaling based on real performance data.",
    },
  ];

  const caseStudies = [
    {
      title: "184% Increase in Organic Leads",
      industry: "Professional Services",
      description: "Full technical SEO overhaul and content strategy delivered consistent lead growth.",
      metric: "+184%",
      metricLabel: "Organic Leads",
      href: "/case-studies/professional-services-seo",
    },
    {
      title: "3.2x ROAS in 90 Days",
      industry: "SaaS",
      description: "Google Ads restructure with conversion tracking and landing page optimization.",
      metric: "3.2x",
      metricLabel: "Return on Ad Spend",
      href: "/case-studies/saas-paid-media",
    },
    {
      title: "Complete Website Redesign",
      industry: "Multi-Location Business",
      description: "Modern, conversion-focused design increased leads by 127% within 6 months.",
      metric: "+127%",
      metricLabel: "Lead Volume",
      href: "/case-studies/multi-location-web-design",
    },
  ];

  const comparison = [
    { feature: "Strategic depth", avorria: true, typical: false },
    { feature: "Full conversion tracking setup", avorria: true, typical: false },
    { feature: "Technical SEO as standard", avorria: true, typical: false },
    { feature: "Clear, actionable reporting", avorria: true, typical: false },
    { feature: "Design focused on ROI, not awards", avorria: true, typical: false },
    { feature: "AI-enhanced workflows", avorria: true, typical: false },
  ];

  const testimonials = [
    {
      quote: "Avorria cut through the noise and focused entirely on what mattered: qualified leads and revenue. Best agency decision we've made.",
      author: "Sarah Mitchell",
      role: "CEO",
      company: "TechFlow Solutions",
      result: "+240% qualified leads in 6 months",
    },
    {
      quote: "Finally, an agency that doesn't treat SEO like magic. Clear strategy, transparent reporting, and results we can track directly to revenue.",
      author: "James Cooper",
      role: "Marketing Director",
      company: "Premier Legal Group",
      result: "£180k additional revenue attributed",
    },
    {
      quote: "The website redesign wasn't just pretty—it fundamentally changed how prospects interact with our brand. Conversion rate doubled.",
      author: "Rachel Kim",
      role: "Founder",
      company: "Elevate Consulting",
      result: "2x conversion rate improvement",
    },
  ];

  const faqs = [
    {
      question: "What's your minimum budget for working together?",
      answer: "Our typical engagements start at £2,500/month for focused initiatives (e.g., SEO or paid media) and £5,000+/month for comprehensive digital strategies. We're transparent about costs and what you'll get at each tier.",
    },
    {
      question: "How long until we see results?",
      answer: "Quick wins (conversion optimization, paid media improvements) typically show results within 30-60 days. SEO and content strategies build momentum over 3-6 months. We set realistic expectations and provide transparent reporting throughout.",
    },
    {
      question: "Do you work with specific industries?",
      answer: "We specialize in professional services, SaaS, multi-location businesses, and high-ticket service providers. Our approach works best when there's a clear sales process and measurable conversions.",
    },
    {
      question: "What KPIs do you actually report on?",
      answer: "We focus on business metrics: leads, pipeline value, cost per acquisition, and revenue attribution. We track traffic and rankings, but only as leading indicators of the metrics that matter to your business.",
    },
    {
      question: "Do you require long-term contracts?",
      answer: "Most clients work with us on a 6-12 month basis because real growth takes time. We do require a 3-month minimum to implement strategy properly, but we're confident you'll want to continue based on results.",
    },
    {
      question: "How do you use AI in your work?",
      answer: "We use AI for research, content ideation, data analysis, and optimization—not as a replacement for strategy. It helps us move faster and test more hypotheses, but human expertise drives every decision.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-light leading-tight text-foreground">
                Digital marketing that treats{" "}
                <span className="font-semibold text-accent">revenue</span> as the only
                KPI that matters.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Full-stack digital marketing, SEO, and web design for businesses who are
                done wasting budget on agency fluff.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book a Strategy Call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Get Free SEO Audit</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-sm font-medium text-muted-foreground">Performance Dashboard</span>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Organic Traffic</p>
                      <p className="text-3xl font-semibold text-foreground">+184%</p>
                      <p className="text-xs text-accent flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> vs. last quarter
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Qualified Leads</p>
                      <p className="text-3xl font-semibold text-foreground">+240%</p>
                      <p className="text-xs text-accent flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> vs. last quarter
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                      <p className="text-3xl font-semibold text-foreground">4.8%</p>
                      <p className="text-xs text-accent flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> +2.1% improvement
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Revenue Impact</p>
                      <p className="text-3xl font-semibold text-foreground">£180k</p>
                      <p className="text-xs text-accent flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> attributed this quarter
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-border bg-background">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by teams who are done wasting budget on noise.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-xl font-semibold text-foreground">TechFlow</div>
            <div className="text-xl font-semibold text-foreground">Premier Legal</div>
            <div className="text-xl font-semibold text-foreground">Elevate</div>
            <div className="text-xl font-semibold text-foreground">BuildRight</div>
            <div className="text-xl font-semibold text-foreground">Vertex</div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            We specialize in SMBs, multi-site brands, and high-ticket service businesses.
          </p>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-3">Explore our location-specific services:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/seo/london"
                className="text-sm px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                SEO in London
              </Link>
              <Link
                to="/web-design/for/trades"
                className="text-sm px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                Web Design for Trades
              </Link>
              <Link
                to="/paid-media/for/professional-services"
                className="text-sm px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                Paid Media for Professional Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Performance-led, not vanity-focused
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every campaign, every optimization, every decision is tied directly to business outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Pipeline-First Strategy",
                description: "We build campaigns around your sales process, not random tactics.",
              },
              {
                icon: Zap,
                title: "Technical SEO Meets Design",
                description: "Sites that rank well and convert—not one or the other.",
              },
              {
                icon: BarChart3,
                title: "End-to-End Tracking",
                description: "Full conversion tracking, attribution, and reporting as standard.",
              },
              {
                icon: TrendingUp,
                title: "AI-Enhanced Delivery",
                description: "Faster research, smarter testing, better optimization.",
              },
            ].map((prop, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow animate-fade-in-up">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <prop.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Full-stack digital services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategy, execution, and optimization across every channel that matters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all hover:shadow-lg group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    View service details
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <h2 className="text-4xl font-light mb-4 text-foreground">
              How we work with you
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven process that delivers quick wins and long-term growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="space-y-4">
                  <div className="text-6xl font-light text-accent/20">{step.number}</div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Highlights */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Results that speak louder than promises
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real clients, real metrics, real business impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-border hover:shadow-xl transition-all group">
                <CardContent className="p-8 space-y-4">
                  <div className="text-5xl font-light text-accent mb-4">{study.metric}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    {study.metricLabel}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{study.industry}</p>
                  <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                  <Link
                    to={study.href}
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors"
                  >
                    View full case study
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Avorria vs typical agencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What you actually get when you work with us.
            </p>
          </div>
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-border bg-muted/50">
                <div className="col-span-1"></div>
                <div className="text-center font-semibold text-foreground">Avorria</div>
                <div className="text-center font-semibold text-muted-foreground">Typical Agency</div>
              </div>
              {comparison.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-6 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="col-span-1 text-foreground">{row.feature}</div>
                  <div className="text-center">
                    {row.avorria ? (
                      <CheckCircle2 className="inline text-accent" size={24} />
                    ) : (
                      <X className="inline text-muted-foreground" size={24} />
                    )}
                  </div>
                  <div className="text-center">
                    {row.typical ? (
                      <CheckCircle2 className="inline text-accent" size={24} />
                    ) : (
                      <X className="inline text-muted-foreground" size={24} />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              What clients say about working with us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-8 space-y-6">
                  <p className="text-foreground leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                    <p className="text-sm text-accent font-medium mt-2">{testimonial.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              Frequently asked questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-background px-6 rounded-lg">
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

      {/* Final CTA */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
            Ready to stop experimenting and start scaling?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a strategy call to discuss your goals, challenges, and how we can help you hit them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Request a Proposal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
