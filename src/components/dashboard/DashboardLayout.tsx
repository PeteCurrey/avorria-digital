'use client';
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const [sidebarOpen, setSidebarOpen] = useState(true);
 const basePath = isDemoMode ? "/reporting/demo" : "/client";

 const navItems = [
 { name: "Overview", icon: LayoutDashboard, path: `${basePath}` },
 { name: "SEO", icon: Search, path: `${basePath}?tab=seo` },
 { name: "Paid Media", icon: Target, path: `${basePath}?tab=paid` },
 { name: "Funnel & Conversions", icon: TrendingUp, path: `${basePath}?tab=funnel` },
 { name: "Content & Email", icon: Mail, path: `${basePath}?tab=content` },
 { name: "Notes & Next Actions", icon: FileText, path: `${basePath}?tab=notes` },
 { name: "Audits", icon: FileText, path: `${basePath}?tab=audits` },
 { name: "Website Health", icon: TrendingUp, path: `${basePath}?tab=health` },
 ];

 const isActive = (path: string) => {
 const currentTab = searchParams.get("tab") || "overview";
 const pathTab = new URLSearchParams(path.split("?")[1]).get("tab") || "overview";
 return currentTab === pathTab;
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex w-full">
  {/* Sidebar */}
  <aside
  className={`fixed lg:static inset-y-0 left-0 z-30 bg-card/95 backdrop-blur-sm border-r border-border/50 transition-all [transition-duration:var(--duration-normal)] ${
   sidebarOpen ? "w-64" : "w-0 lg:w-20"
  }`}
  >
  <div className="h-full flex flex-col">
   {/* Sidebar Header */}
   <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
   {sidebarOpen && (
    <div>
    <Link href="/" className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
     Avorria
    </Link>
    <p className="text-xs text-muted-foreground mt-0.5">Client Portal</p>
    </div>
   )}
   <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 hover:bg-secondary/50 rounded-md transition-all [transition-duration:var(--duration-fast)] lg:hidden"
   >
    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
   </button>
   </div>

   {/* Navigation */}
   <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
   {navItems.map((item) => (
    <Link
    key={item.path}
    href={item.path}
    className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all [transition-duration:var(--duration-fast)] ${
     isActive(item.path)
     ? "bg-gradient-to-r from-accent/10 to-primary/5 text-accent font-medium shadow-sm"
     : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5"
    }`}
    >
    <item.icon size={20} className="flex-shrink-0" />
    {sidebarOpen && <span className="text-sm">{item.name}</span>}
    </Link>
   ))}
   </nav>

   {/* Sidebar Footer */}
   {sidebarOpen && (
   <div className="p-4 border-t border-border/50 bg-secondary/20">
    <p className="text-xs text-muted-foreground mb-2 font-medium">Need help?</p>
    <Button variant="outline" size="sm" className="w-full" asChild>
    <Link href="/contact">Contact Support</Link>
    </Button>
   </div>
   )}
  </div>
  </aside>

  {/* Main Content */}
  <div className="flex-1 flex flex-col min-w-0 lg:ml-0 ml-0">
  {/* Top Bar */}
  <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-40">
   <div className="flex items-center gap-4">
   <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 hover:bg-secondary/50 rounded-md transition-all [transition-duration:var(--duration-fast)] lg:hidden"
   >
    <Menu size={20} />
   </button>
   <div>
    {isDemoMode ? (
    <div>
     <h1 className="text-lg font-semibold text-foreground">
     Avorria Client Dashboard
     </h1>
     <p className="text-xs text-muted-foreground">Demo Mode · Last updated 2 hours ago</p>
    </div>
    ) : (
    <div>
     <h1 className="text-lg font-semibold text-foreground">
     {userName || "Client"} · Client Area
     </h1>
     <p className="text-xs text-muted-foreground">
     Last updated 2 hours ago
     </p>
    </div>
    )}
   </div>
   </div>
   <div className="flex items-center gap-3">
   <Button variant="accent" size="sm" asChild>
    <Link href="/contact">
    {isDemoMode ? "Talk to us about setting this up" : "Book Strategy Call"}
    </Link>
   </Button>
   {!isDemoMode && (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-medium">
    {userName ? userName.charAt(0).toUpperCase() : "C"}
    </div>
   )}
   </div>
  </header>

  {/* Page Content */}
  <main className="flex-1 overflow-auto p-6 pt-8 bg-gradient-to-br from-background via-background to-secondary/5">
   {children}
  </main>
  </div>
 </div>
 );
};

export default DashboardLayout;

