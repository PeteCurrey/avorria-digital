'use client';
import Link from "next/link";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Globe, Search, TrendingUp, FileText, ArrowRight, X } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { BeamBorder } from '@/components/BeamBorder';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Challenge {
  id: string;
  icon: React.ElementType;
  title: string;
  problem: string;
  solution: string;
  services: string[];
  serviceLinks: { name: string; href: string }[];
  stat: string;
  statLabel: string;
}

const challenges: Challenge[] = [
  {
    id: 'data',
    icon: BarChart3,
    title: 'Our data is a mess',
    problem: "You can't trust your analytics. Decisions are made on gut feeling because no one knows what's actually working.",
    solution: 'We untangle GA4, fix your tracking, build clean dashboards and give you a single source of truth for every marketing decision.',
    services: ['Analytics', 'CRO'],
    serviceLinks: [{ name: 'Analytics & CRO', href: '/services/analytics' }],
    stat: '100%',
    statLabel: 'tracking accuracy',
  },
  {
    id: 'leads',
    icon: Users,
    title: 'We need more qualified leads',
    problem: "You're getting traffic but not the right kind. Form fills are low, and sales complains about lead quality.",
    solution: 'We build demand through SEO and Paid Media, targeting buyers who are actually ready to talk â€“ not just browsing.',
    services: ['SEO', 'Paid Media'],
    serviceLinks: [
      { name: 'SEO', href: '/services/seo' },
      { name: 'Paid Media', href: '/services/paid-media' },
    ],
    stat: '+147%',
    statLabel: 'qualified pipeline',
  },
  {
    id: 'website',
    icon: Globe,
    title: "Our website isn't converting",
    problem: "You're paying for traffic but it's not turning into leads. Pages load slow, CTAs are unclear, and the journey is confusing.",
    solution: 'We rebuild key pages with SEO, speed and CRO wired in from day one. Every section has a job to do.',
    services: ['Web Design', 'CRO'],
    serviceLinks: [{ name: 'Web Design', href: '/services/web-design' }],
    stat: '+89%',
    statLabel: 'conversion rate',
  },
  {
    id: 'visibility',
    icon: Search,
    title: "We're invisible on Google",
    problem: "Your competitors outrank you for every term that matters. You're relying on paid ads to stay visible.",
    solution: "We fix technical issues, build the pages you're missing and target keywords that attract qualified demand â€“ not just traffic.",
    services: ['SEO', 'Content'],
    serviceLinks: [
      { name: 'SEO', href: '/services/seo' },
      { name: 'Content', href: '/services/content-email' },
    ],
    stat: '#1-3',
    statLabel: 'rankings achieved',
  },
  {
    id: 'campaigns',
    icon: TrendingUp,
    title: "Our campaigns aren't profitable",
    problem: "You're spending on ads but can't prove ROI. CPAs are climbing and you're not sure what's actually driving revenue.",
    solution: "We restructure campaigns around your offers, set clear ROAS targets and cut anything that can't justify its spend.",
    services: ['Paid Media', 'Analytics'],
    serviceLinks: [{ name: 'Paid Media', href: '/services/paid-media' }],
    stat: '3.2x',
    statLabel: 'average ROAS',
  },
  {
    id: 'content',
    icon: FileText,
    title: "Our content isn't driving results",
    problem: "You're publishing blogs but they don't rank or convert. Content feels disconnected from your sales process.",
    solution: 'We create long-form SEO content and email sequences designed to educate buyers and support your sales team.',
    services: ['Content', 'Email'],
    serviceLinks: [{ name: 'Content & Email', href: '/services/content-email' }],
    stat: '+312%',
    statLabel: 'organic traffic',
  },
];

const ServiceChallengePicker: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  return (
    <section id="challenges" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
            Choose your challenge.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Click on the problem that sounds most like you. We'll show you exactly how we solve it.
          </p>
        </motion.div>

        {/* Challenge Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard tiltAmount={6} glareOpacity={0.15}>
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className={cn(
                    'w-full text-left p-6 md:p-8 rounded-xl border transition-all duration-300',
                    selectedChallenge?.id === challenge.id
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                        selectedChallenge?.id === challenge.id
                          ? 'bg-accent/20'
                          : 'bg-white/10'
                      )}
                    >
                      <challenge.icon
                        className={cn(
                          'transition-colors',
                          selectedChallenge?.id === challenge.id
                            ? 'text-accent'
                            : 'text-white/70'
                        )}
                        size={24}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        "{challenge.title}"
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {challenge.problem}
                      </p>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Selected Challenge Detail */}
        <AnimatePresence mode="wait">
          {selectedChallenge && (
            <motion.div
              key={selectedChallenge.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BeamBorder>
                <div className="p-8 md:p-12 rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                        <selectedChallenge.icon className="text-accent" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">
                          {selectedChallenge.title}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {selectedChallenge.services.map((service) => (
                            <span
                              key={service}
                              className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedChallenge(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="text-white/60" size={20} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
                          The Problem
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {selectedChallenge.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
                          Our Solution
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {selectedChallenge.solution}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-4">
                        {selectedChallenge.serviceLinks.map((link) => (
                          <Button key={link.href} variant="outline-dark" asChild>
                            <Link href={link.href}>
                              {link.name}
                              <ArrowRight className="ml-2" size={16} />
                            </Link>
                          </Button>
                        ))}
                        <Button variant="accent" asChild>
                          <Link href="/contact">
                            Book Strategy Call
                            <ArrowRight className="ml-2" size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-accent/5 border border-accent/20">
                      <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                        {selectedChallenge.stat}
                      </div>
                      <div className="text-sm text-white/60 uppercase tracking-wider text-center">
                        {selectedChallenge.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </BeamBorder>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServiceChallengePicker;


