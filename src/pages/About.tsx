import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Lock, Pencil, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import heroAboutTeam from "@/assets/hero-about-team.jpg";

const About = () => {
  const principles = [
    {
      icon: Target,
      title: "Pipeline or it doesn't count.",
      description: "If we can't connect an activity to leads, opportunities or revenue, it doesn't belong in the plan.",
    },
    {
      icon: Lock,
      title: "Tracking before tactics.",
      description: "We fix the measurement mess first, otherwise every decision is just an opinion war.",
    },
    {
      icon: Pencil,
      title: "Design serves decisions.",
      description: "We love clean interfaces, but only when they make it easier for the right people to say 'yes'.",
    },
    {
      icon: MessageSquare,
      title: "Radical clarity.",
      description: "We'll tell you if something isn't working, even if it makes a nice slide.",
    },
  ];

  const bestFit = [
    "B2B, services, SaaS or multi-location brands",
    "Already spending on marketing, but know it can work harder",
    "Willing to be challenged and make decisions",
    "Want a partner who talks in numbers and trade-offs, not hype",
  ];

  const notAFit = [
    "Looking for the cheapest quote",
    "Want to outsource responsibility but keep all the control",
    "Expect miracles in 30 days on a tiny budget",
    "Want campaigns for the sake of activity",
  ];

  const howWeWork = [
    {
      step: "1",
      title: "Reality check.",
      description: "Audits, discovery calls and data pulls to understand where you really are.",
    },
    {
      step: "2",
      title: "90-day operating plan.",
      description: "We choose a small number of big bets and key fixes, then assign owners and timelines.",
    },
    {
      step: "3",
      title: "Execution & optimisation.",
      description: "We build, ship, and adjust based on actual numbers – not how everyone feels.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Avorria – Your Operator-Level Growth Partner</title>
        <meta name="description" content="A senior, operator-led team that fixes messy marketing, broken tracking and underperforming websites for serious businesses." />
        
        <meta property="og:title" content="About Avorria – Your Operator-Level Growth Partner" />
        <meta property="og:description" content="A senior, operator-led team that fixes messy marketing, broken tracking and underperforming websites for serious businesses." />
        <meta property="og:url" content="https://avorria.com/about" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Avorria – Your Operator-Level Growth Partner" />
        <meta name="twitter:description" content="A senior, operator-led team that fixes messy marketing, broken tracking and underperforming websites for serious businesses." />
        
        <link rel="canonical" href="https://avorria.com/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Avorria",
            "url": "https://avorria.com",
            "logo": "https://avorria.com/logo.png",
            "description": "A senior, operator-led team that fixes messy marketing, broken tracking and underperforming websites for serious businesses.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sheffield",
              "addressRegion": "South Yorkshire",
              "addressCountry": "UK"
            },
            "sameAs": [
              "https://www.linkedin.com/company/avorria"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section with Parallax */}
        <section 
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${heroAboutTeam})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          
          <ScrollReveal>
            <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-24">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white">
                The operators behind{" "}
                <span className="font-semibold text-accent">
                  the pretty dashboards.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
                Avorria is a small, senior team that has spent years inside real businesses fixing messy marketing, broken tracking and underperforming websites. We care more about your pipeline than our awards shelf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-card/40 backdrop-blur-sm text-foreground border border-border/50 hover:bg-card/60" asChild>
                  <Link to="/contact">
                    Meet the team on a call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button size="lg" className="bg-card/40 backdrop-blur-sm text-foreground border border-border/50 hover:bg-card/60" asChild>
                  <Link to="/reporting">See how we report</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* What We Believe */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  What we actually believe.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {principles.map((principle, index) => (
                  <Card
                    key={index}
                    className="border-border/50 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
                  >
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-4">
                        <principle.icon className="text-accent" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* Who We Work Best With */}
        <section className="py-24 px-6 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  Who we work best with.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-background shadow-soft">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Best fit</h3>
                    <ul className="space-y-3">
                      {bestFit.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-background shadow-soft">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Probably not a fit</h3>
                    <ul className="space-y-3">
                      {notAFit.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <XCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* Team Leadership */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  Founder / Lead
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <Card className="border-border/50 shadow-soft max-w-2xl mx-auto">
                <CardContent className="p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-1">Avorria Leadership</h3>
                      <p className="text-accent font-medium mb-4">Founder / Operator</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Built and scaled multiple service brands across B2B, SaaS and multi-location sectors.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Has lived through broken tracking, bad agencies and messy migrations – then fixed them.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Thinks like an owner, not a supplier.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* How We Work Together */}
        <section className="py-24 px-6 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  How we work together.
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid>
              <div className="grid md:grid-cols-3 gap-8">
                {howWeWork.map((item, index) => (
                  <Card key={index} className="border-border/50 shadow-soft hover:shadow-elevated transition-all duration-[var(--duration-normal)]">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xl font-semibold mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollRevealGrid>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <ScrollReveal>
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
                Ready to work with a team that treats your budget like their own?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Book a strategy call to discuss your goals, challenges, and how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Get a free audit
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Book a strategy call</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
};

export default About;
