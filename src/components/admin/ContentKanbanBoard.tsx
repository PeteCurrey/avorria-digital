import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Eye, Check, Calendar, Globe, Twitter, Linkedin, Instagram, Facebook,
  Mail, FileText, ArrowRight, Loader2, Trash2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface KanbanItem {
  id: string;
  title?: string | null;
  content: string;
  platform?: string | null;
  content_type?: string;
  status: string;
  created_at?: string;
  scheduled_for?: string | null;
  published_at?: string | null;
}

interface ContentKanbanBoardProps {
  reviewItems: KanbanItem[];
  approvedItems: KanbanItem[];
  scheduledItems: KanbanItem[];
  publishedItems: KanbanItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish?: (id: string) => void;
  isLoading?: boolean;
}

const platformIcons: Record<string, React.ElementType> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  blog: FileText,
};

const columns = [
  { key: "review", label: "Review", icon: Eye, color: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
  { key: "approved", label: "Approved", icon: Check, color: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { key: "scheduled", label: "Scheduled", icon: Calendar, color: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  { key: "published", label: "Published", icon: Globe, color: "bg-green-500/10 border-green-500/30 text-green-400" },
];

const KanbanCard = ({ item, actions }: { item: KanbanItem; actions?: React.ReactNode }) => {
  const Icon = platformIcons[item.platform || ""] || FileText;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} layout>
      <Card className="bg-card/80 border-border/30 hover:border-accent/20 transition-all cursor-default mb-2">
        <CardContent className="p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Icon className="h-3 w-3 text-accent" />
            <span className="text-[10px] font-medium capitalize text-muted-foreground">{item.platform || item.content_type}</span>
          </div>
          {item.title && <p className="text-xs font-semibold mb-1 truncate">{item.title}</p>}
          <p className="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed">{item.content}</p>
          {item.created_at && (
            <p className="text-[9px] text-muted-foreground/50 mt-2 font-mono">
              {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
            </p>
          )}
          {actions && <div className="flex gap-1 mt-2 pt-2 border-t border-border/20">{actions}</div>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ContentKanbanBoard = ({
  reviewItems, approvedItems, scheduledItems, publishedItems,
  onApprove, onReject, onDelete, onPublish,
}: ContentKanbanBoardProps) => {
  const itemsByColumn: Record<string, KanbanItem[]> = {
    review: reviewItems,
    approved: approvedItems,
    scheduled: scheduledItems,
    published: publishedItems,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((col) => {
        const items = itemsByColumn[col.key] || [];
        const ColIcon = col.icon;
        return (
          <div key={col.key} className="flex flex-col">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border ${col.color} mb-2`}>
              <ColIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">{col.label}</span>
              <Badge variant="secondary" className="ml-auto text-[9px] h-4 min-w-[16px] px-1">{items.length}</Badge>
            </div>
            <ScrollArea className="flex-1 max-h-[60vh]">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-[11px] text-muted-foreground/40">No items</div>
                ) : (
                  items.map((item) => (
                    <KanbanCard
                      key={item.id}
                      item={item}
                      actions={
                        col.key === "review" ? (
                          <>
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] text-green-400" onClick={() => onApprove(item.id)}>
                              <Check className="h-3 w-3 mr-0.5" /> Approve
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] text-destructive" onClick={() => onReject(item.id)}>
                              Reject
                            </Button>
                          </>
                        ) : col.key === "approved" && onPublish ? (
                          <Button size="sm" variant="ghost" className="h-6 text-[10px] text-accent" onClick={() => onPublish(item.id)}>
                            <ArrowRight className="h-3 w-3 mr-0.5" /> Publish
                          </Button>
                        ) : undefined
                      }
                    />
                  ))
                )}
              </AnimatePresence>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
};

export default ContentKanbanBoard;

