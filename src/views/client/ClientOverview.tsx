'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useClientStats, useClientFocus } from "@/hooks/useClientStats";
import { useMyProjects } from "@/hooks/useClientProjects";
import { useMyInvoices } from "@/hooks/useInvoices";
import AppShell from "@/components/app/AppShell";
import { WelcomeHero } from "@/components/client/WelcomeHero";
import { ClientOnboarding } from "@/components/client/ClientOnboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  FileCheck,
  Activity,
  BarChart3,
  ArrowRight,
  Search,
  Loader2,
  CreditCard,
  Clock,
  Briefcase,
  Eye,
  Sparkles,
  Palette,
} from "lucide-react";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const CinematicCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    variants={fadeUp}
    className={`rounded-xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const ClientOverview = () => {
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  const { data: stats, isLoading: statsLoading } = useClientStats(null);
  const { data: currentFocus, isLoading: focusLoading } = useClientFocus(null);
  const { data: projects, isLoading: projectsLoading } = useMyProjects();
  const { data: invoices } = useMyInvoices();

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding =
      localStorage.getItem(`onboarding-complete-${clientName}`) ||
      localStorage.getItem(`onboarding-dismissed-${clientName}`);
    if (!hasSeenOnboarding) setShowOnboarding(true);
  }, [clientName]);

  const websiteProject = projects?.find((p) => p.project_type === "website" || p.project_type === "branding");
  const seoProject = projects?.find((p) => p.project_type === "seo");
  const hasWebsiteProject = !!websiteProject;
  const hasSEOProject = !!seoProject;

  const outstandingInvoices = invoices?.filter((inv) => inv.status === "sent" || inv.status === "overdue") || [];
  const totalOutstanding = outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const nextDueInvoice = outstandingInvoices.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0];

  const fmt = (v: number) => (v >= 1000 ? `£${(v / 1000).toFixed(1)}k` : `£${v.toLocaleString()}`);

  const statItems = stats
    ? [
        { label: "Monthly leads", value: stats.totalLeads.toString(), change: stats.leadChange },
        { label: "Qualified leads", value: stats.qualifiedLeads.toString(), change: stats.qualifiedChange },
        { label: "Pipeline value", value: fmt(stats.pipelineValue), change: stats.pipelineChange },
      ]
    : [];

  return (
    <>
      
        <title>Overview - Client Portal</title>
      

      {showOnboarding && (
        <ClientOnboarding
          userName={userName}
          clientName={clientName}
          accountManagerName="Tom Currey"
          accountManagerEmail="tom@avorria.com"
          onComplete={() => setShowOnboarding(false)}
          onDismiss={() => setShowOnboarding(false)}
        />
      )}

      <AppShell type="client" userName={userName} userRole="Marketing Director" clientName={clientName}>
        <motion.div className="space-y-6" variants={stagger} initial="hidden" animate="visible">
          {/* Cinematic Welcome Hero */}
          <motion.div variants={fadeUp}>
            <WelcomeHero
              userName={userName}
              clientName={clientName}
              featuredProject={
                websiteProject ? { id: websiteProject.id, name: websiteProject.name, status: websiteProject.status, description: websiteProject.description || undefined } : null
              }
              hasWebsiteProject={hasWebsiteProject}
            />
          </motion.div>

          {/* Account & Projects Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CinematicCard>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-medium text-white/70">Account Balance</h3>
                </div>
                <p className="text-3xl font-light text-white mb-1">{totalOutstanding > 0 ? fmt(totalOutstanding) : "£0"}</p>
                <p className="text-xs text-white/30 mb-4">
                  {totalOutstanding > 0 ? `${outstandingInvoices.length} invoice${outstandingInvoices.length > 1 ? "s" : ""} outstanding` : "All invoices paid"}
                </p>
                {nextDueInvoice && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-white/30" />
                      <span className="text-xs text-white/40">Next due</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-white/70">{fmt(nextDueInvoice.amount)}</p>
                      <p className="text-[10px] text-white/30">{new Date(nextDueInvoice.due_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                <Link href="/client/billing">
                  <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/[0.08]">
                    View Invoices <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CinematicCard>

            <CinematicCard>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-medium text-white/70">Active Projects</h3>
                </div>
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-white/20" />
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="space-y-2">
                    {projects.slice(0, 3).map((project) => (
                      <Link
                        key={project.id}
                        href={`/client/projects/${project.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:border-accent/20 hover:bg-accent/[0.03] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center">
                            <Briefcase className="h-3.5 w-3.5 text-accent" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white/70 group-hover:text-accent transition-colors">{project.name}</p>
                            <Badge variant="outline" className="text-[10px] capitalize border-white/10 text-white/30 mt-0.5">
                              {project.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                        <Eye className="h-3.5 w-3.5 text-white/20 group-hover:text-accent transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Sparkles className="h-6 w-6 mx-auto text-white/20 mb-2" />
                    <p className="text-xs text-white/30">Your first project is being set up.</p>
                  </div>
                )}
              </div>
            </CinematicCard>
          </div>

          {/* Current Focus */}
          <CinematicCard>
            <div className="p-5">
              <h3 className="text-sm font-medium text-white/70 mb-3">Current Focus</h3>
              {focusLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white/20" />
              ) : (
                <ul className="space-y-2">
                  {(currentFocus || []).map((item, i) => (
                    <li key={item.id || i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-white/50">{item.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CinematicCard>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsLoading ? (
              <div className="col-span-3 flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-white/20" />
              </div>
            ) : (
              statItems.map((stat) => {
                const positive = stat.change >= 0;
                return (
                  <CinematicCard key={stat.label}>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {positive ? <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> : <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
                        <span className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                      <p className={`text-xs ${positive ? "text-emerald-400/80" : "text-red-400/80"}`}>
                        {positive ? "+" : ""}{stat.change}% vs last month
                      </p>
                    </div>
                  </CinematicCard>
                );
              })
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hasWebsiteProject && (
              <CinematicCard>
                <div className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Palette className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Design Progress</h3>
                  <p className="text-xs text-white/30 mb-4">View before & after comparisons and leave feedback.</p>
                  <Link href={`/client/projects/${websiteProject!.id}`}>
                    <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08]">
                      View designs <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CinematicCard>
            )}
            {hasSEOProject && (
              <CinematicCard>
                <div className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Search className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">SEO Intelligence</h3>
                  <p className="text-xs text-white/30 mb-4">AI-powered website analysis & keyword research.</p>
                  <Link href="/client/seo-intelligence">
                    <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08]">
                      Open tools <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CinematicCard>
            )}
            <CinematicCard>
              <div className="p-5">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <FileCheck className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-white/70 mb-1">Latest Audit</h3>
                <p className="text-xs text-white/30 mb-4">SEO & website audit with priority actions.</p>
                <Link href="/client/audits">
                  <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08]">
                    View audits <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CinematicCard>
            <CinematicCard>
              <div className="p-5">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <BarChart3 className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-white/70 mb-1">Analytics</h3>
                <p className="text-xs text-white/30 mb-4">Real-time website performance insights.</p>
                <Link href="/client/analytics">
                  <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08]">
                    View analytics <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CinematicCard>
            <CinematicCard>
              <div className="p-5">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Activity className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-white/70 mb-1">Website Health</h3>
                <p className="text-xs text-white/30 mb-4">Track your health score over time.</p>
                <Link href="/client/website-health">
                  <Button size="sm" className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08]">
                    View health <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CinematicCard>
          </div>
        </motion.div>
      </AppShell>
    </>
  );
};

export default ClientOverview;


