import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lock, Pencil, MessageSquare, CheckCircle2, XCircle, Users, Globe, Award, TrendingUp, Linkedin, Mail } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid, CountUp } from "@/components/animations/ScrollReveal";
import SectionReveal from "@/components/SectionReveal";
import heroAboutTeam from "@/assets/hero-about-team.jpg";
import { useTeamMembers } from "@/hooks/useTeamMembers";

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
  { step: "01", title: "Reality check.", description: "Audits, discovery calls and data pulls to understand where you really are." },
  { step: "02", title: "90-day operating plan.", description: "We choose a small number of big bets and key fixes, then assign owners and timelines." },
  { step: "03", title: "Execution & optimisation.", description: "We build, ship, and adjust based on actual numbers – not how everyone feels." },
];

// Fallback data for when DB is loading or empty
const fallbackTeam = [
  { initials: "JH", full_name: "James Hartley", title: "Founder & Strategy Lead", bio: "Spent a decade inside B2B and SaaS businesses watching agencies burn budgets on vanity metrics. Started Avorria to build the agency he wished he'd hired — one that thinks like an owner, not a supplier.", photo_url: null, linkedin_url: null, email: null },
  { initials: "SR", full_name: "Sophie Reynolds", title: "Head of SEO & Technical", bio: "Former in-house SEO lead for a £40M e-commerce brand. Obsessed with site architecture, Core Web Vitals and the kind of technical detail that actually moves rankings — not just blog posts.", photo_url: null, linkedin_url: null, email: null },
  { initials: "MK", full_name: "Marcus Keane", title: "Head of Paid Media & CRO", bio: "Has managed over £8M in ad spend across Google, Meta and LinkedIn. Believes every pound should be accountable and that landing pages matter more than audience targeting.", photo_url: null, linkedin_url: null, email: null },
  { initials: "AL", full_name: "Ava Linton", title: "Head of Design & Development", bio: "Designs websites that convert, not just look good. Background in UX research and front-end development means every layout decision is backed by data and built to perform.", photo_url: null, linkedin_url: null, email: null },
];

const About = () => {
  const { data: dbTeam } = useTeamMembers();
  const team = dbTeam && dbTeam.length > 0 ? dbTeam : fallbackTeam;

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
            "address": { "@type": "PostalAddress", "addressLocality": "Sheffield", "addressRegion": "South Yorkshire", "addressCountry": "UK" },
            "sameAs": ["https://www.linkedin.com/company/avorria"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* ─── Hero ─── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-20 pt-20">
          <div className="absolute inset-0">
            <img src={heroAboutTeam} alt="Avorria team" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-[1]" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <motion.span className="inline-block text-xs sm:text-sm font-medium text-white/50 uppercase tracking-[0.2em] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>About Avorria</motion.span>
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight text-white/95 mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
                We started Avorria because we got tired of watching good businesses{" "}
                <span className="text-accent font-normal">waste money on bad marketing.</span>
              </motion.h1>
              <motion.p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
                A small, senior team that has spent years inside real businesses — fixing what's broken, cutting what doesn't work, and building what actually drives revenue.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}>
                <Button variant="accent" size="default" className="text-sm sm:text-base px-6 py-5 shadow-lg" asChild>
                  <Link to="/contact">Meet the team on a call<ArrowRight className="ml-2" size={18} /></Link>
                </Button>
                <Button size="default" className="text-sm sm:text-base px-6 py-5 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 shadow-lg" asChild>
                  <a href="#our-approach">Our approach</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Our Story ─── */}
        <SectionReveal type="fade-blur">
          <section className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Story</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-12">Why Avorria exists.</h2>
                </ScrollReveal>
                <div className="grid md:grid-cols-5 gap-12 items-start">
                  <ScrollReveal variant="fade-up" delay={100} duration={500} className="md:col-span-3">
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>Before Avorria, we spent years working inside businesses — not agencies. We sat in the meetings where marketing budgets were questioned, where dashboards full of impressions meant nothing to the board, and where "the agency" was just another line item nobody could justify.</p>
                      <p>We watched good companies hand over five-figure monthly retainers to agencies that delivered activity reports instead of results. Agencies that confused being busy with being effective. That prioritised their own award entries over their client's pipeline.</p>
                      <p>So we built something different. Avorria is deliberately small. Every client works directly with senior people who've managed real P&Ls, fixed broken tracking stacks, rebuilt websites that weren't converting, and turned paid media from a cost centre into a growth engine.</p>
                      <p>We don't do fluff. We don't do vanity metrics. We do the hard, unglamorous work that actually moves the numbers — and we're transparent about what's working and what isn't.</p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal variant="fade-up" delay={200} duration={500} className="md:col-span-2">
                    <div className="border-l-2 border-accent/40 pl-6 py-2">
                      <p className="text-xl md:text-2xl font-light text-foreground italic leading-relaxed">"We'd rather lose a pitch by being honest than win one by overpromising."</p>
                      <p className="text-sm text-muted-foreground mt-4">— Avorria founding principle</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ─── What We Believe ─── */}
        <SectionReveal type="fade-blur">
          <section id="our-approach" className="py-24 md:py-32 bg-[hsl(220,25%,8%)]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Beliefs</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">What we actually believe.</h2>
                  </div>
                </ScrollReveal>
                <ScrollRevealGrid className="grid md:grid-cols-2 gap-6" stagger={100} variant="fade-up">
                  {principles.map((principle, index) => (
                    <div key={index} className="p-8 rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1">
                      <div className="w-11 h-11 rounded-lg bg-accent/15 flex items-center justify-center mb-5">
                        <principle.icon className="text-accent" size={22} />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                      <p className="text-white/60 leading-relaxed">{principle.description}</p>
                    </div>
                  ))}
                </ScrollRevealGrid>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ─── Stats Band ─── */}
        <section className="py-16 md:py-20 bg-[hsl(220,25%,6%)]">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollRevealGrid className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-4xl mx-auto" stagger={80} variant="fade-up">
              {[
                { icon: Users, value: 50, suffix: "+", label: "Active clients" },
                { icon: TrendingUp, value: 2.4, suffix: "M+", label: "Pipeline generated", prefix: "£" },
                { icon: Award, value: 92, suffix: "%", label: "Client retention" },
                { icon: Globe, value: 10, suffix: "+ yrs", label: "Avg. experience" },
              ].map((stat, i) => (
                <div key={i} className="text-center py-8 px-4">
                  <stat.icon className="w-6 h-6 text-accent mx-auto mb-3 opacity-70" />
                  <div className="text-2xl md:text-3xl font-light text-white mb-1">
                    {stat.prefix || ""}<CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </ScrollRevealGrid>
          </div>
        </section>

        {/* ─── The Team ─── */}
        <SectionReveal type="wipe-up">
          <section className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our People</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground">The team behind the work.</h2>
                  </div>
                </ScrollReveal>

                <ScrollRevealGrid className="grid sm:grid-cols-2 gap-6" stagger={100} variant="fade-up">
                  {team.map((member, index) => (
                    <div key={index} className="p-8 rounded-xl border border-border/60 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                      <div className="flex items-start gap-5">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={member.full_name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-accent/20 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm font-semibold flex-shrink-0">
                            {member.initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground">{member.full_name}</h3>
                          <p className="text-sm text-accent font-medium mb-3">{member.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                          <div className="flex items-center gap-3">
                            {member.linkedin_url && (
                              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label={`${member.full_name} on LinkedIn`}>
                                <Linkedin size={18} />
                              </a>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-accent transition-colors" aria-label={`Email ${member.full_name}`}>
                                <Mail size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollRevealGrid>

                {/* Divider */}
                <div className="my-20 border-t border-border/30" />
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-foreground">Who we work best with.</h2>
                  </div>
                </ScrollReveal>

                <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={120} variant="fade-up">
                  <div className="p-8 rounded-xl border border-green-500/20 bg-green-500/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/5">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Best fit</h3>
                    <ul className="space-y-4">
                      {bestFit.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="text-green-500/80 flex-shrink-0 mt-0.5" size={20} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 rounded-xl border border-red-500/20 bg-red-500/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Probably not a fit</h3>
                    <ul className="space-y-4">
                      {notAFit.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <XCircle className="text-red-500/80 flex-shrink-0 mt-0.5" size={20} />
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

        {/* ─── How We Work ─── */}
        <SectionReveal type="fade-blur">
          <section className="py-24 md:py-32 bg-[hsl(220,25%,8%)]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Process</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">How we work together.</h2>
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={100} duration={500}>
                  <div className="grid md:grid-cols-3 gap-0 relative">
                    <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-white/10" />
                    {howWeWork.map((item, index) => (
                      <div key={index} className="relative text-center px-6 py-8 md:py-0">
                        <div className="relative z-10 w-20 h-20 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-accent text-xl font-semibold mx-auto mb-6">{item.step}</div>
                        <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                        <p className="text-white/55 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ─── CTA ─── */}
        <section className="py-32 md:py-40" style={{ background: 'radial-gradient(ellipse at center, hsl(320 85% 55% / 0.12), transparent 70%), hsl(220 25% 6%)' }}>
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up" duration={600}>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">Let's talk about what's not working.</h2>
                <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">Book a strategy call to discuss your goals, challenges, and where the biggest opportunities are hiding.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                    <Link to="/contact">Get a free audit<ArrowRight className="ml-2" size={20} /></Link>
                  </Button>
                  <Button size="lg" asChild className="w-full sm:w-auto border border-white/30 bg-white/[0.08] text-white hover:bg-white/15 backdrop-blur-sm">
                    <Link to="/contact">Book a strategy call</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
