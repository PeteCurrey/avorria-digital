import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lock, Pencil, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { HeroBand, SectionBand, ImageSectionBand } from "@/components/ContentBand";
import heroAboutTeam from "@/assets/hero-about-team.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";

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
      step: "01",
      title: "Reality check.",
      description: "Audits, discovery calls and data pulls to understand where you really are.",
    },
    {
      step: "02",
      title: "90-day operating plan.",
      description: "We choose a small number of big bets and key fixes, then assign owners and timelines.",
    },
    {
      step: "03",
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
        {/* Hero Section */}
        <HeroBand
          headline="The operators behind the pretty dashboards."
          body="Avorria is a small, senior team that has spent years inside real businesses fixing messy marketing, broken tracking and underperforming websites. We care more about your pipeline than our awards shelf."
          backgroundImage={heroAboutTeam}
          cta={{ text: "Meet the team on a call", href: "/contact" }}
          secondaryCta={{ text: "See how we report", href: "/reporting" }}
          minHeight="75vh"
        />

        {/* What We Believe - Dark gradient */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">
                What we actually believe.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5">
                    <principle.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-white/70 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Who We Work Best With - Light */}
        <SectionBand background="light" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-foreground">
                Who we work best with.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl border-2 border-green-500/30 bg-green-500/5">
                <h3 className="text-xl font-semibold text-foreground mb-6">Best fit</h3>
                <ul className="space-y-4">
                  {bestFit.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-xl border-2 border-red-500/30 bg-red-500/5">
                <h3 className="text-xl font-semibold text-foreground mb-6">Probably not a fit</h3>
                <ul className="space-y-4">
                  {notAFit.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* Team Leadership - Dark */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">
                Founder / Lead
              </h2>
            </div>
            
            <div className="p-10 rounded-xl border border-white/10 bg-white/5 max-w-2xl mx-auto">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-[hsl(260,75%,60%)] flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                  A
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-1">Avorria Leadership</h3>
                  <p className="text-accent font-medium mb-5">Founder / Operator</p>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start">
                      <span className="text-accent mr-3">•</span>
                      <span>Built and scaled multiple service brands across B2B, SaaS and multi-location sectors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-3">•</span>
                      <span>Has lived through broken tracking, bad agencies and messy migrations – then fixed them.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-3">•</span>
                      <span>Thinks like an owner, not a supplier.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* How We Work Together - Image background with cityscape */}
        <SectionBand 
          background="image" 
          backgroundImage={heroCityscape}
          backgroundOverlay="blur"
          padding="large"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light drop-shadow-lg">
                How we work together.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howWeWork.map((item, index) => (
                <div key={index} className="p-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md hover:bg-black/50 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-[hsl(260,75%,60%)] flex items-center justify-center text-white text-xl font-semibold mb-5 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">{item.title}</h3>
                  <p className="text-white/85 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* CTA Section - Race car background */}
        <ImageSectionBand variant="racecar" overlay="gradient" padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 drop-shadow-lg">
              Ready to work with a team that treats your budget like their own?
            </h2>
            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
              Book a strategy call to discuss your goals, challenges, and how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild className="w-full sm:w-auto shadow-lg">
                <Link to="/contact">
                  Get a free audit
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white/30 text-white hover:bg-white/20 shadow-lg">
                <Link to="/contact">Book a strategy call</Link>
              </Button>
            </div>
          </div>
        </ImageSectionBand>
      </div>
    </>
  );
};

export default About;
