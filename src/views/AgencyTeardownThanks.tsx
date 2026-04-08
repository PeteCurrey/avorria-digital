'use client';
import Link from "next/link";
import Navigate from '@/components/Navigate';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SEOHead from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, BarChart3, Target, TrendingUp, Shield } from "lucide-react";
import heroContactOffice from "@/assets/hero-contact-office.jpg";
import heroServicesDigital from "@/assets/hero-services-digital.jpg";

const AgencyTeardownThanks = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_thankyou_viewed');
    }
  }, []);

  const handleBookCall = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_cta_book_call_clicked');
    }
    router.push('/contact');
  };

  const handleViewReporting = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_cta_view_reporting_clicked');
    }
    router.push('/reporting/demo');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const steps = [
    { icon: Target, text: "We skim for structure: goals, KPIs, tracking." },
    { icon: BarChart3, text: "We assess whether reporting links to real business outcomes." },
    { icon: Shield, text: "We list what's missing, lazy or misaligned." },
    { icon: TrendingUp, text: "We send you a short summary with 3Ã¢â‚¬â€œ5 key recommendations." }
  ];

  const reportFeatures = [
    {
      title: "Clear link between spend and pipeline/revenue",
      description: "Not just impressions and clicks Ã¢â‚¬â€œ real business outcomes."
    },
    {
      title: "Actions taken last month, and actions planned next",
      description: "You know exactly what was done and what's coming."
    },
    {
      title: "Risks, issues and strategic decisions flagged Ã¢â‚¬â€œ not hidden",
      description: "Transparency, not theatre."
    }
  ];

  return (
    <>
      <SEOHead
        title="Report Submitted - Agency Teardown"
        description="We've received your report and will send you a plain-English breakdown within 3-5 working days."
        canonical="/agency-report-teardown/thanks"
        noindex={true}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden -mt-20 pt-20"
          style={{
            backgroundImage: `url(${heroContactOffice})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-24"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm mb-8 border border-accent/30"
            >
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white drop-shadow-lg">
              Got it Ã¢â‚¬â€œ we'll tear this down and come back with the{" "}
              <span className="font-semibold text-accent">truth</span>.
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              We'll review your report/proposal and send a plain-English breakdown within{" "}
              <strong className="text-accent">3Ã¢â‚¬â€œ5 working days</strong>. If we think your agency is doing good work, we'll say so. If not, you'll know exactly why.
            </p>
          </motion.div>
        </section>

        {/* What Happens Next */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-light mb-12 text-center text-foreground"
              >
                What happens next
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                  >
                    <Card className="relative p-6 border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:border-accent/30">
                      {/* Beam animation border */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-lg animate-[spin_3s_linear_infinite]" style={{
                          background: 'conic-gradient(from 0deg, transparent, hsl(320 85% 55% / 0.3), transparent)',
                          padding: '1px',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                        }} />
                      </div>
                      
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <step.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-accent mb-1 block">Step {index + 1}</span>
                          <p className="text-foreground">{step.text}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full Width Image Band */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroServicesDigital})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <p className="text-2xl md:text-3xl font-light text-white max-w-2xl">
                "The best agencies make themselves <span className="text-accent font-medium">accountable</span>. The rest hide behind metrics."
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTAs Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-foreground">
                While you wait
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookCall}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a call to walk through your report live
                  </span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleViewReporting}
                  className="group"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  See how our reporting works
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What a Good Report Looks Like */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-light mb-4 text-center text-foreground"
              >
                What a Good Report Looks Like
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
              >
                Here's what separates genuine performance reporting from marketing theatre
              </motion.p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {reportFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Card className="relative p-6 h-full border-border bg-card group hover:shadow-lg transition-all duration-300 hover:border-accent/30">
                      {/* Animated beam border on hover */}
                      <div className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, hsl(320 85% 55% / 0.4), transparent)',
                            animation: 'shimmer 2s infinite',
                          }}
                        />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-medium mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <Button 
                          variant="link" 
                          className="text-accent p-0 h-auto"
                          onClick={handleViewReporting}
                        >
                          See example Ã¢â€ â€™
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 section-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto max-w-3xl text-center relative z-10"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-white">
              Want to see what transparency looks like in practice?
            </h2>
            <p className="text-white/70 mb-8">
              Explore our live dashboard demo and see how we report to our clients
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleViewReporting}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Explore our live dashboard demo
            </Button>
          </motion.div>
        </section>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

export default AgencyTeardownThanks;


