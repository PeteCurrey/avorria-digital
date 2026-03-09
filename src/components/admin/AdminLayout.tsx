import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import CommandPalette from "./CommandPalette";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search, User, Check, Command, ExternalLink } from "lucide-react";
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

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  
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
      navigate(notification.link);
    }
  };

  return (
    <div className="admin-theme min-h-screen bg-[hsl(220,25%,6%)] text-white">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
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
            <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
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
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-6 bg-[hsl(220,25%,6%)]/80 backdrop-blur-xl border-b border-white/[0.06]">
          {/* Shimmer gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          
          <div className="flex items-center gap-4">
            {/* Search / Cmd+K trigger */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 w-64 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/50 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/70 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search commands...</span>
              <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-white/[0.1] bg-white/[0.05] px-1.5 font-mono text-[10px] text-white/40">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Site Link */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white hover:bg-white/[0.06] gap-2"
              asChild
            >
              <Link to="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden md:inline">View Site</span>
              </Link>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white/50 hover:text-white hover:bg-white/[0.06]">
                  <Bell className="h-5 w-5" />
                  {(unreadCount || 0) > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-[hsl(220,25%,10%)] border-white/[0.08] text-white">
                <div className="flex items-center justify-between px-2">
                  <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                  {(unreadCount || 0) > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-7 text-white/50 hover:text-white hover:bg-white/[0.06]"
                      onClick={() => markAllAsRead.mutate()}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                {!notifications || notifications.length === 0 ? (
                  <div className="py-6 text-center text-sm text-white/40">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-white/[0.06] focus:bg-white/[0.06]",
                        !notification.is_read && "bg-accent/10"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <span className="font-medium text-white">{notification.title}</span>
                      {notification.message && (
                        <span className="text-xs text-white/50 line-clamp-2">
                          {notification.message}
                        </span>
                      )}
                      <span className="text-xs text-white/30">
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
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/[0.06]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/60 ring-2 ring-accent/20">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[hsl(220,25%,10%)] border-white/[0.08] text-white">
                <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem asChild className="hover:bg-white/[0.06] focus:bg-white/[0.06] cursor-pointer">
                  <Link to="/admin?tab=settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-white/[0.06] focus:bg-white/[0.06] cursor-pointer">
                  <Link to="/">View Site</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem className="text-red-400 hover:bg-white/[0.06] focus:bg-white/[0.06] cursor-pointer">
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
                <h1 className="text-2xl font-light tracking-tight lg:text-3xl text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-white/50">{subtitle}</p>
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
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 bg-[hsl(220,25%,6%)]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/[0.06]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/50 hover:text-white hover:bg-white/[0.06]"
              onClick={() => setCmdOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white/50 hover:text-white hover:bg-white/[0.06]">
                  <Bell className="h-5 w-5" />
                  {(unreadCount || 0) > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-[hsl(220,25%,10%)] border-white/[0.08] text-white">
                <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                {!notifications || notifications.length === 0 ? (
                  <div className="py-6 text-center text-sm text-white/40">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-white/[0.06]"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <span className="font-medium text-white">{notification.title}</span>
                      <span className="text-xs text-white/30">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile User */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/[0.06]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/60">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4 pt-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-xl font-light tracking-tight text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-white/50">{subtitle}</p>
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
