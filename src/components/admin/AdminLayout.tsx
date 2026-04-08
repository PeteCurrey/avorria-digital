'use client';
import Navigate from '@/components/Navigate';
import React, { useState, useEffect } from "react";
import { Link, use  , useRouter} from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import CommandPalette from "./CommandPalette";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search, User, Check, Command, ExternalLink, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications, useUnreadNotificationCount, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { useAdminTheme } from "@/hooks/useAdminTheme";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { theme, toggle, isDark } = useAdminTheme();
  
  const { data: notifications } = useNotifications(10);
  const { data: unreadCount } = useUnreadNotificationCount();
  const markAsRead = useMarkNotificationRead();
  const markAllAsRead = useMarkAllNotificationsRead();

  // Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsRead.mutate(notification.id);
    }
    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <div className={cn("admin-theme min-h-screen bg-background text-foreground", !isDark && "admin-light")}>
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "var(--admin-glow-accent)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "var(--admin-glow-primary)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]" style={{ background: "var(--admin-glow-accent)" }} />
        
        <div 
          className="absolute inset-0"
          style={{
            opacity: "var(--admin-grid-opacity)",
            backgroundImage: `linear-gradient(var(--admin-grid-line) 1px, transparent 1px),
                             linear-gradient(90deg, var(--admin-grid-line) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isDark={isDark}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-40 w-64 lg:hidden"
          >
            <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen relative hidden lg:block"
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-6 backdrop-blur-xl border-b" style={{ background: "var(--admin-bg-overlay)", borderColor: "var(--admin-border-subtle)" }}>
          {/* Shimmer gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, var(--admin-shimmer), transparent)` }} />
          
          <div className="flex items-center gap-4">
            {/* Search / Cmd+K trigger */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 w-64 px-3 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                background: "var(--admin-overlay-subtle)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "var(--admin-border-subtle)",
                color: "var(--admin-text-secondary)",
              }}
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search commands...</span>
              <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px]" style={{ borderColor: "var(--admin-border-subtle)", background: "var(--admin-overlay-subtle)", color: "var(--admin-text-tertiary)" }}>
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* View Site Link */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary gap-2"
              asChild
            >
              <Link href="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden md:inline">View Site</span>
              </Link>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <Bell className="h-5 w-5" />
                  {(unreadCount || 0) > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-popover border-border text-popover-foreground">
                <div className="flex items-center justify-between px-2">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  {(unreadCount || 0) > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      onClick={() => markAllAsRead.mutate()}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator />
                {!notifications || notifications.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start gap-1 py-3 cursor-pointer",
                        !notification.is_read && "bg-accent/10"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <span className="font-medium text-foreground">{notification.title}</span>
                      {notification.message && (
                        <span className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: "var(--admin-text-tertiary)" }}>
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/60 ring-2 ring-accent/20">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/admin?tab=settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/">View Site</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 pt-8">
          {(title || subtitle) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              {title && (
                <h1 className="text-2xl font-light tracking-tight lg:text-3xl text-foreground">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-muted-foreground">{subtitle}</p>
              )}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen relative">
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 backdrop-blur-xl border-b" style={{ background: "var(--admin-bg-overlay)", borderColor: "var(--admin-border-subtle)" }}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={() => setCmdOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <Bell className="h-5 w-5" />
                  {(unreadCount || 0) > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-popover border-border text-popover-foreground">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!notifications || notifications.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <span className="font-medium text-foreground">{notification.title}</span>
                      <span className="text-xs" style={{ color: "var(--admin-text-tertiary)" }}>
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile User */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/60">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
            </Button>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4 pt-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-xl font-light tracking-tight text-foreground">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          )}
          {children}
        </main>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
};

export default AdminLayout;

