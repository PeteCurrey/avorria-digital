import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lock, Pencil, MessageSquare, CheckCircle2, XCircle, Users, Globe, Award, TrendingUp } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid, CountUp } from "@/components/animations/ScrollReveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import GradientMesh from "@/components/GradientMesh";
import FloatingElements from "@/components/FloatingElements";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";
import heroAboutTeam from "@/assets/hero-about-team.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import cityTimelapseVideo from "@/assets/city-timelapse.mp4";
import bgRaceCar from "@/assets/bg-race-car.png";

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

const About = () => {
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
            "sameAs": ["https://www.linkedin.com/company/avorria"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* ─── Full-Screen Hero ─── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-20 pt-20">
          <div className="absolute inset-0">
            <img src={heroAboutTeam} alt="Avorria team" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25 z-[1]" />
          <GradientMesh className="opacity-30 z-[2]" />
          <FloatingElements />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl ml-0 mr-auto">
              <motion.span
                className="inline-block text-xs sm:text-sm font-medium text-white/60 uppercase tracking-[0.2em] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About Avorria
              </motion.span>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light leading-[1.05] tracking-tight text-white/90 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                The operators behind the{" "}
                <span className="text-accent font-normal">pretty dashboards.</span>
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Avorria is a small, senior team that has spent years inside real businesses fixing messy marketing, broken tracking and underperforming websites. We care more about your pipeline than our awards shelf.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Button variant="accent" size="default" className="text-sm sm:text-base px-6 py-5 shadow-lg" asChild>
                  <Link to="/contact">
                    Meet the team on a call
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button size="default" className="text-sm sm:text-base px-6 py-5 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 shadow-lg" asChild>
                  <Link to="/reporting">See how we report</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── What We Believe – Video Background with Beam Cards ─── */}
        <SectionReveal type="fade-blur">
          <ParallaxBackground
            backgroundVideo={cityTimelapseVideo}
            speed={0.3}
            overlay="dark"
            minHeight="auto"
            className="py-24 md:py-32"
          >
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Beliefs</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
                      What we actually believe.
                    </h2>
                  </div>
                </ScrollReveal>

                <ScrollRevealGrid className="grid md:grid-cols-2 gap-6" stagger={100} variant="fade-up">
                  {principles.map((principle, index) => (
                    <div
                      key={index}
                      className="relative group p-8 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:bg-white/10 hover:-translate-y-1"
                    >
                      {/* Beam border on hover */}
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors duration-300">
                          <principle.icon className="text-accent" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                        <p className="text-white/70 leading-relaxed">{principle.description}</p>
                      </div>
                    </div>
                  ))}
                </ScrollRevealGrid>
              </div>
            </div>
          </ParallaxBackground>
        </SectionReveal>

        {/* ─── Stats Band ─── */}
        <section className="py-20 md:py-24 bg-[hsl(220,25%,6%)]">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollRevealGrid className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" stagger={80} variant="fade-up">
              {[
                { icon: Users, value: 50, suffix: "+", label: "Active clients" },
                { icon: TrendingUp, value: 2.4, suffix: "M+", label: "Pipeline generated", prefix: "£" },
                { icon: Award, value: 92, suffix: "%", label: "Client retention" },
                { icon: Globe, value: 10, suffix: "+ yrs", label: "Avg. experience" },
              ].map((stat, i) => (
                <div key={i} className="relative group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center transition-all duration-300 hover:bg-white/10 overflow-hidden">
                  <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                  <div className="relative z-10">
                    <stat.icon className="w-7 h-7 text-accent mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-light text-white mb-1">
                      {stat.prefix || ""}<CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </ScrollRevealGrid>
          </div>
        </section>

        {/* ─── Who We Work Best With – Light Section ─── */}
        <SectionReveal type="wipe-up">
          <section className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-foreground">
                      Who we work best with.
                    </h2>
                  </div>
                </ScrollReveal>

                <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={120} variant="fade-up">
                  <div className="p-8 rounded-xl border-2 border-green-500/30 bg-green-500/5 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

                  <div className="p-8 rounded-xl border-2 border-red-500/30 bg-red-500/5 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
                </ScrollRevealGrid>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ─── Founder / Lead – Dark with Gradient Mesh ─── */}
        <SectionReveal type="fade-blur">
          <section className="relative py-24 md:py-32 bg-[hsl(220,25%,8%)] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-60" />
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-12">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Leadership</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">
                      Founder / Lead
                    </h2>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={150} duration={500}>
                  <TiltCard className="max-w-2xl mx-auto">
                    <div className="p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-[hsl(260,75%,60%)] flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 shadow-lg">
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
                  </TiltCard>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ─── How We Work Together – Image Parallax ─── */}
        <SectionReveal type="wipe-up">
          <ParallaxBackground
            backgroundImage={heroCityscape}
            speed={0.3}
            overlay="dark"
            minHeight="auto"
            className="py-24 md:py-32"
          >
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Process</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white drop-shadow-lg">
                      How we work together.
                    </h2>
                  </div>
                </ScrollReveal>

                <ScrollRevealGrid className="grid md:grid-cols-3 gap-8" stagger={100} variant="fade-up">
                  {howWeWork.map((item, index) => (
                    <div key={index} className="relative group p-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md hover:bg-black/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-[hsl(260,75%,60%)] flex items-center justify-center text-white text-xl font-semibold mb-5 shadow-lg">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">{item.title}</h3>
                        <p className="text-white/85 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </ScrollRevealGrid>
              </div>
            </div>
          </ParallaxBackground>
        </SectionReveal>

        {/* ─── CTA Section – Race Car Parallax ─── */}
        <SectionReveal type="fade-blur">
          <ParallaxBackground
            backgroundImage={bgRaceCar}
            speed={0.2}
            overlay="gradient"
            minHeight="auto"
            className="py-32 md:py-40"
          >
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <ScrollReveal variant="fade-up" duration={600}>
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white drop-shadow-lg">
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
              </ScrollReveal>
            </div>
          </ParallaxBackground>
        </SectionReveal>
      </div>
    </>
  );
};

export default About;
