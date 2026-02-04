import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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

  // Demo client list for impersonation
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
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        )}
      >
        {/* Logo & Title */}
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

        {/* Navigation */}
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
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        {sidebarOpen && clientName && (
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Client</p>
            <p className="text-sm font-medium text-foreground">{clientName}</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Impersonation Banner */}
        <ClientImpersonationBanner />
        
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="shrink-0"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Search & Client Selector */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={type === "platform" ? "Search clients, campaigns..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Client Selector - Only for platform users */}
              {type === "platform" && (
                <Popover open={clientSelectorOpen} onOpenChange={setClientSelectorOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={clientSelectorOpen}
                      className="w-[240px] justify-between"
                    >
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
                            <CommandItem
                              key={client.id}
                              value={client.name}
                              onSelect={() => handleClientSelect(client.name)}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  impersonatedClient === client.name ? "opacity-100" : "opacity-0"
                                )}
                              />
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
              )}
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(displayName)}
                  </AvatarFallback>
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
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
