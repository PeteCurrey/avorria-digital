import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  TrendingUp, 
  Mail, 
  FileText,
  Menu,
  X
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDemoMode?: boolean;
  userName?: string;
}

const DashboardLayout = ({ children, isDemoMode = false, userName }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const basePath = isDemoMode ? "/reporting/demo" : "/client";

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, path: `${basePath}` },
    { name: "SEO", icon: Search, path: `${basePath}?tab=seo` },
    { name: "Paid Media", icon: Target, path: `${basePath}?tab=paid` },
    { name: "Funnel & Conversions", icon: TrendingUp, path: `${basePath}?tab=funnel` },
    { name: "Content & Email", icon: Mail, path: `${basePath}?tab=content` },
    { name: "Notes & Next Actions", icon: FileText, path: `${basePath}?tab=notes` },
  ];

  const isActive = (path: string) => {
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get("tab") || "overview";
    const pathTab = new URLSearchParams(path.split("?")[1]).get("tab") || "overview";
    return currentTab === pathTab;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-secondary border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            {sidebarOpen && (
              <Link to="/" className="text-xl font-light tracking-tight text-foreground">
                Avorria
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-background rounded-md transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive(item.path)
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Need help?</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary rounded-md transition-colors lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              {isDemoMode ? (
                <div>
                  <h1 className="text-lg font-medium text-foreground">
                    Avorria Client Dashboard
                  </h1>
                  <p className="text-xs text-muted-foreground">Demo Mode</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-lg font-medium text-foreground">
                    Welcome back, {userName || "Client"}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Here's your current performance snapshot
                  </p>
                </div>
              )}
            </div>
          </div>
          <Button variant="accent" size="sm" asChild>
            <Link to="/contact">
              {isDemoMode ? "Talk to us about setting this up" : "Book Strategy Call"}
            </Link>
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
