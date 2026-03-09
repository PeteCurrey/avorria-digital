import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClientImpersonationBanner from "./ClientImpersonationBanner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  Users,
  Target,
  Globe,
  FileText,
  BarChart3,
  BookOpen,
  Settings,
  Search,
  Menu,
  X,
  FileCheck,
  Activity,
  Library,
  LogOut,
  Eye,
  Check,
  ChevronsUpDown,
  Briefcase,
  UserPlus,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface AppShellProps {
  children: ReactNode;
  type: "platform" | "client";
  userName?: string;
  userRole?: string;
  clientName?: string;
}

interface NavItem {
  name: string;
  path: string;
  icon: any;
}

const platformNavItems: NavItem[] = [
  { name: "Dashboard", path: "/platform", icon: LayoutDashboard },
  { name: "Leads", path: "/platform/leads", icon: UserPlus },
  { name: "Clients", path: "/platform/clients", icon: Users },
  { name: "Case Studies", path: "/platform/case-studies", icon: Briefcase },
  { name: "Campaigns & Channels", path: "/platform/campaigns", icon: Target },
  { name: "SEO & Web Assets", path: "/platform/seo-web", icon: Globe },
  { name: "Content & Social", path: "/platform/content", icon: FileText },
  { name: "Reporting & Alerts", path: "/platform/reporting", icon: BarChart3 },
  { name: "Playbooks & Docs", path: "/platform/playbooks", icon: BookOpen },
  { name: "Settings", path: "/platform/settings", icon: Settings },
];

const clientNavItems: NavItem[] = [
  { name: "Overview", path: "/client", icon: LayoutDashboard },
  { name: "Projects", path: "/client/projects", icon: Briefcase },
  { name: "Proposals", path: "/client/proposals", icon: FileText },
  { name: "Documents", path: "/client/documents", icon: Library },
  { name: "Billing", path: "/client/billing", icon: Target },
  { name: "Analytics", path: "/client/analytics", icon: BarChart3 },
  { name: "SEO Intelligence", path: "/client/seo-intelligence", icon: TrendingUp },
  { name: "Audits", path: "/client/audits", icon: FileCheck },
  { name: "Website Health", path: "/client/website-health", icon: Activity },
  { name: "Reporting", path: "/client/reporting", icon: BarChart3 },
  { name: "Resources", path: "/client/resources", icon: Library },
];

const AppShell = ({ children, type, userName = "User", userRole = "Team Member", clientName }: AppShellProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, impersonatedClient, setImpersonatedClient } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientSelectorOpen, setClientSelectorOpen] = useState(false);

  const isClient = type === "client";

  const availableClients = [
    { id: "acme-corp", name: "Acme Corp", industry: "Technology" },
    { id: "techflow", name: "TechFlow Solutions", industry: "SaaS" },
    { id: "greenleaf", name: "GreenLeaf Solutions", industry: "Sustainability" },
    { id: "bluesky", name: "BlueSky Consulting", industry: "Consulting" },
    { id: "urban-dynamics", name: "Urban Dynamics", industry: "Real Estate" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/login");
  };

  const handleClientSelect = (clientName: string) => {
    setImpersonatedClient(clientName);
    setClientSelectorOpen(false);
    navigate("/client");
  };

  const displayName = userName !== "User" ? userName : user?.email?.split("@")[0] || "User";
  const navItems = type === "platform" ? platformNavItems : clientNavItems;
  const title = type === "platform" ? "Growth Platform" : "Client Portal";

  const isActive = (path: string) => {
    if (path === "/platform" || path === "/client") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Client portal uses cinematic dark sidebar
  if (isClient) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[hsl(220,25%,7%)]">
        {/* Cinematic sidebar */}
        <motion.aside
          animate={{ width: sidebarOpen ? 256 : 72 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative flex flex-col flex-shrink-0 border-r border-white/[0.06] bg-[hsl(220,25%,6%)] overflow-hidden"
        >
          {/* Ambient glow top */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="flex h-16 items-center border-b border-white/[0.06] px-5">
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">Avorria</p>
                    <p className="text-white/40 text-[10px] mt-0.5 leading-none">{title}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center mx-auto"
                >
                  <span className="text-white text-xs font-bold">A</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-0.5 px-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                      active
                        ? "bg-accent/15 text-accent"
                        : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="client-nav-active"
                        className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                    )}
                    <Icon className={cn("h-4 w-4 shrink-0 relative z-10", active ? "text-accent" : "")} />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm whitespace-nowrap overflow-hidden relative z-10"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {active && sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto relative z-10"
                      >
                        <ChevronRight className="h-3 w-3 text-accent/60" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Client name footer */}
          {clientName && (
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/[0.06] p-4"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Account</p>
                  <p className="text-white/70 text-sm font-medium truncate">{clientName}</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <ClientImpersonationBanner />

          {/* Cinematic top bar */}
          <header className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-[hsl(220,25%,7%)]/80 backdrop-blur-xl px-5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white/40 hover:text-white/80 hover:bg-white/[0.05] h-8 w-8"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>

              {/* Breadcrumb path */}
              <div className="hidden md:flex items-center gap-1.5 text-xs text-white/30">
                <span>Client Portal</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/60">
                  {navItems.find(n => isActive(n.path))?.name || "Overview"}
                </span>
              </div>
            </div>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2.5 px-2 hover:bg-white/[0.05]">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-medium text-white/80 leading-none">{displayName}</p>
                    <p className="text-[10px] text-white/30 mt-0.5 leading-none">{userRole}</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-accent to-purple-500 text-white text-xs font-semibold">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-[hsl(220,25%,10%)] border-white/10 text-white/80">
                <DropdownMenuLabel className="text-white/50 text-xs">{displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem onClick={() => navigate("/client/settings")} className="hover:bg-white/[0.05] focus:bg-white/[0.05] cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Page content — dark background with scroll */}
          <main className="flex-1 overflow-y-auto bg-[hsl(220,25%,7%)] p-6 pt-7">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  // Platform shell (unchanged standard look)
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-4">
          {sidebarOpen ? (
            <div>
              <h1 className="text-xl font-semibold text-foreground">Avorria</h1>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          ) : (
            <div className="hidden md:block text-center w-full">
              <span className="text-lg font-bold text-primary">A</span>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        {sidebarOpen && clientName && (
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Client</p>
            <p className="text-sm font-medium text-foreground">{clientName}</p>
          </div>
        )}
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <ClientImpersonationBanner />
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search clients, campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <Popover open={clientSelectorOpen} onOpenChange={setClientSelectorOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={clientSelectorOpen} className="w-[240px] justify-between">
                    <Eye className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="truncate">View as client...</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0 bg-popover border-border z-50" align="start">
                  <Command className="bg-popover">
                    <CommandInput placeholder="Search clients..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No client found.</CommandEmpty>
                      <CommandGroup>
                        {availableClients.map((client) => (
                          <CommandItem key={client.id} value={client.name} onSelect={() => handleClientSelect(client.name)} className="cursor-pointer">
                            <Check className={cn("mr-2 h-4 w-4", impersonatedClient === client.name ? "opacity-100" : "opacity-0")} />
                            <div className="flex flex-col">
                              <span className="font-medium">{client.name}</span>
                              <span className="text-xs text-muted-foreground">{client.industry}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">{getInitials(displayName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/${type}/settings`)}>
                <Settings className="mr-2 h-4 w-4" />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6 pt-8">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
