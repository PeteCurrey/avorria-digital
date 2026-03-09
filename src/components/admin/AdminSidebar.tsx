import { useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedLogo from "@/components/AnimatedLogo";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Gauge,
  Search,
  Map,
  FileText,
  ClipboardList,
  Settings,
  Sparkles,
  Mail,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  Calendar,
  PenTool,
  FileCheck,
  FolderKanban,
  Image,
  MessageSquareQuote,
  Building2,
  UserPlus,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  icon: React.ElementType;
  tab: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Clients & Projects",
    items: [
      { name: "Clients", icon: UserPlus, tab: "clients" },
      { name: "Projects", icon: FolderKanban, tab: "projects" },
      { name: "Client Projects", icon: Building2, tab: "client-projects" },
      { name: "Assets", icon: Image, tab: "assets" },
      { name: "Invoicing", icon: Receipt, tab: "invoicing" },
    ],
  },
  {
    title: "Leads & Sales",
    items: [
      { name: "Leads", icon: Users, tab: "leads" },
      { name: "Audits", icon: FileCheck, tab: "audits" },
    ],
  },
  {
    title: "Website",
    items: [
      { name: "Team Members", icon: Users, tab: "team-members" },
      { name: "Resources", icon: FileText, tab: "resources" },
      { name: "Case Studies", icon: Image, tab: "case-studies" },
      { name: "Testimonials", icon: MessageSquareQuote, tab: "testimonials" },
      { name: "Client Logos", icon: Building2, tab: "client-logos" },
    ],
  },
  {
    title: "Content & Marketing",
    items: [
      { name: "Content Studio", icon: Sparkles, tab: "content-studio" },
      { name: "Content Calendar", icon: Calendar, tab: "content" },
      { name: "Newsletter Builder", icon: Mail, tab: "newsletter" },
    ],
  },
  {
    title: "SEO & Performance",
    items: [
      { name: "Landing Pages", icon: FileText, tab: "landing-pages" },
      { name: "Performance", icon: Gauge, tab: "performance" },
      { name: "SEO Dashboard", icon: Search, tab: "seo" },
      { name: "Sitemap Manager", icon: Map, tab: "sitemap" },
    ],
  },
  {
    title: "Paid Advertising",
    items: [
      { name: "Google Ads", icon: TrendingUp, tab: "google-ads" },
      { name: "Meta Ads", icon: Zap, tab: "meta-ads" },
      { name: "LinkedIn Ads", icon: BarChart3, tab: "linkedin-ads" },
    ],
  },
  {
    title: "Analytics & Reports",
    items: [
      { name: "Analytics", icon: BarChart3, tab: "analytics" },
      { name: "Reports", icon: ClipboardList, tab: "reports" },
      { name: "Analytics Connections", icon: TrendingUp, tab: "analytics-connections" },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Integrations", icon: Zap, tab: "integrations" },
      { name: "Settings", icon: Settings, tab: "settings" },
    ],
  },
];

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  return (
    <TooltipProvider>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen overflow-hidden",
          "bg-[hsl(220,25%,6%)] border-r border-white/[0.06]"
        )}
      >
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-accent/10 blur-[80px]" />
          <div className="absolute -right-10 top-2/3 h-32 w-32 rounded-full bg-primary/8 blur-[60px]" />
          <div className="absolute left-1/2 bottom-20 h-24 w-24 rounded-full bg-accent/5 blur-[50px]" />
        </div>

        <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedLogo />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn(
                "h-8 w-8 shrink-0 text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200",
                collapsed && "mx-auto"
              )}
            >
              <motion.div
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.div>
            </Button>
          </div>

          {/* Overview Link */}
          <div className="px-3 pt-4">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin?tab=overview"
                    className={cn(
                      "group relative flex items-center justify-center rounded-lg p-2.5 text-sm font-medium transition-all duration-200",
                      currentTab === "overview"
                        ? "bg-accent/15 text-accent"
                        : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    {currentTab === "overview" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg bg-accent/15"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <LayoutDashboard className="relative h-5 w-5 shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[hsl(220,25%,12%)] border-white/10 text-white">
                  Overview
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                to="/admin?tab=overview"
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  currentTab === "overview"
                    ? "text-accent"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {currentTab === "overview" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-accent/15"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <LayoutDashboard className="relative h-5 w-5 shrink-0" />
                <span className="relative">Overview</span>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4" type="scroll">
            <nav className="space-y-6">
              {navSections.map((section, sectionIdx) => (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIdx * 0.05 }}
                >
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30"
                      >
                        {section.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = currentTab === item.tab;
                      const NavContent = (
                        <Link
                          key={item.tab}
                          to={`/admin?tab=${item.tab}`}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "text-accent"
                              : "text-white/50 hover:bg-white/[0.06] hover:text-white",
                            collapsed && "justify-center px-2"
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 rounded-lg bg-accent/15"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          {isActive && (
                            <motion.span 
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-accent"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <item.icon className="relative h-5 w-5 shrink-0 transition-colors" />
                          {!collapsed && (
                            <>
                              <span className="relative flex-1">{item.name}</span>
                              {item.badge && (
                                <span className="relative rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      );

                      if (collapsed) {
                        return (
                          <Tooltip key={item.tab}>
                            <TooltipTrigger asChild>{NavContent}</TooltipTrigger>
                            <TooltipContent side="right" className="bg-[hsl(220,25%,12%)] border-white/10 text-white flex items-center gap-2">
                              {item.name}
                              {item.badge && (
                                <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-xs text-accent">
                                  {item.badge}
                                </span>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      return NavContent;
                    })}
                  </div>
                  {!collapsed && sectionIdx < navSections.length - 1 && (
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  )}
                </motion.div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer CTA */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/[0.06] p-4"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-4 backdrop-blur-sm">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                  
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/30">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">AI Content Studio</p>
                      <p className="text-xs text-white/50">
                        Generate content at scale
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="accent"
                    size="sm"
                    className="relative mt-3 w-full"
                    asChild
                  >
                    <Link to="/admin?tab=content-studio">
                      <PenTool className="mr-2 h-4 w-4" />
                      Create Content
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default AdminSidebar;
