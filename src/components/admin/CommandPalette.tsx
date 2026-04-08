'use client';
import Link from "next/link";
import Navigate from '@/components/Navigate';
import React, { useEffect, useState } from "react";
import { useSearchParams , useRouter} from "next/navigation";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import {
  LayoutDashboard, Users, BarChart3, Search, TrendingUp, Mail, Sparkles, FileText,
  Settings, Globe, Calendar, Newspaper, Link2, BookOpen, Shield, Lightbulb,
  CreditCard, FolderOpen, Image, UserPlus, Megaphone
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const router = useRouter();
  const [, setSearchParams] = useSearchParams();

  const goTo = (tab: string) => {
    router.push(`/admin?tab=${tab}`);
    onOpenChange(false);
  };

  const navigationItems = [
    { label: "Dashboard Overview", icon: LayoutDashboard, tab: "overview" },
    { label: "Clients", icon: Users, tab: "clients" },
    { label: "Leads", icon: UserPlus, tab: "leads" },
    { label: "Analytics", icon: BarChart3, tab: "analytics" },
    { label: "SEO Dashboard", icon: TrendingUp, tab: "seo" },
    { label: "Content Studio", icon: Sparkles, tab: "content-studio" },
    { label: "Content Calendar", icon: Calendar, tab: "content" },
    { label: "Newsletter Builder", icon: Newspaper, tab: "newsletter" },
    { label: "Resources", icon: BookOpen, tab: "resources" },
    { label: "Case Studies", icon: FileText, tab: "case-studies" },
    { label: "Projects", icon: FolderOpen, tab: "projects" },
    { label: "Client Projects", icon: FolderOpen, tab: "client-projects" },
    { label: "Asset Manager", icon: Image, tab: "assets" },
    { label: "Invoicing", icon: CreditCard, tab: "invoicing" },
    { label: "Reports", icon: FileText, tab: "reports" },
    { label: "Sitemap Manager", icon: Globe, tab: "sitemap" },
    { label: "Landing Pages", icon: Link2, tab: "landing-pages" },
    { label: "Integrations", icon: Link2, tab: "integrations" },
    { label: "Settings", icon: Settings, tab: "settings" },
  ];

  const quickActions = [
    { label: "Generate AI Content", icon: Sparkles, action: () => goTo("content-studio") },
    { label: "Build Newsletter", icon: Mail, action: () => goTo("newsletter") },
    { label: "Run Competitor Analysis", icon: Shield, action: () => goTo("seo") },
    { label: "View SEO Suggestions", icon: Lightbulb, action: () => goTo("seo") },
    { label: "Create Campaign", icon: Megaphone, action: () => goTo("clients") },
    { label: "View Site", icon: Globe, action: () => { window.open("/", "_blank"); onOpenChange(false); } },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border-border/50">
        <CommandInput placeholder="Search pages, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            {quickActions.map((item) => (
              <CommandItem key={item.label} onSelect={item.action} className="gap-2 cursor-pointer">
                <item.icon className="h-4 w-4 text-accent" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigate to">
            {navigationItems.map((item) => (
              <CommandItem key={item.tab} onSelect={() => goTo(item.tab)} className="gap-2 cursor-pointer">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default CommandPalette;


