import { Link, useSearchParams } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
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
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border/20 bg-card/90 backdrop-blur-xl transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-border/30 px-4">
            {!collapsed && (
              <AnimatedLogo />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn(
                "h-8 w-8 shrink-0",
                collapsed && "mx-auto"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
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
                      "group flex items-center justify-center rounded-lg p-2.5 text-sm font-medium transition-all",
                      currentTab === "overview"
                        ? "bg-gradient-to-r from-accent/15 to-primary/10 text-accent shadow-sm"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <LayoutDashboard className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      currentTab === "overview" ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Overview</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                to="/admin?tab=overview"
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  currentTab === "overview"
                    ? "bg-gradient-to-r from-accent/15 to-primary/10 text-accent shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <LayoutDashboard className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  currentTab === "overview" ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>Overview</span>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-6">
              {navSections.map((section, sectionIdx) => (
                <div key={section.title}>
                  {!collapsed && (
                    <h3 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = currentTab === item.tab;
                      const NavContent = (
                        <Link
                          key={item.tab}
                          to={`/admin?tab=${item.tab}`}
                          className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                            isActive
                              ? "bg-gradient-to-r from-accent/15 to-primary/10 text-accent shadow-sm"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                            collapsed && "justify-center px-2"
                          )}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-accent" />
                          )}
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0 transition-colors",
                              isActive
                                ? "text-accent"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {!collapsed && (
                            <>
                              <span className="flex-1">{item.name}</span>
                              {item.badge && (
                                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
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
                            <TooltipContent side="right" className="flex items-center gap-2">
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
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          {!collapsed && (
            <div className="border-t border-border/50 p-4">
              <div className="rounded-lg bg-gradient-to-br from-accent/10 to-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Content Studio</p>
                    <p className="text-xs text-muted-foreground">
                      Generate content at scale
                    </p>
                  </div>
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  className="mt-3 w-full"
                  asChild
                >
                  <Link to="/admin?tab=content-studio">
                    <PenTool className="mr-2 h-4 w-4" />
                    Create Content
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AdminSidebar;
