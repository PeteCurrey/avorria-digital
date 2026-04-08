'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  RefreshCw, 
  Monitor, 
  Tablet, 
  Smartphone,
  Maximize2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewportSize = "desktop" | "tablet" | "mobile";

interface LiveSitePreviewProps {
  url: string;
  title?: string;
  className?: string;
}

const viewportSizes: Record<ViewportSize, { width: string; icon: React.ElementType; label: string }> = {
  desktop: { width: "100%", icon: Monitor, label: "Desktop" },
  tablet: { width: "768px", icon: Tablet, label: "Tablet" },
  mobile: { width: "375px", icon: Smartphone, label: "Mobile" },
};

export const LiveSitePreview = ({ 
  url, 
  title = "Live Site Preview",
  className 
}: LiveSitePreviewProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  const config = viewportSizes[viewport];
  const Icon = config.icon;

  // Normalize URL
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  const PreviewContent = () => (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* URL bar */}
          <div className="hidden sm:flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 min-w-[200px]">
            <span className="text-xs text-green-600">🔒</span>
            <span className="text-xs text-muted-foreground truncate">
              {normalizedUrl.replace(/^https?:\/\//, "")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-muted rounded-md p-1">
            {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => {
              const ViewportIcon = viewportSizes[size].icon;
              return (
                <Button
                  key={size}
                  variant={viewport === size ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewport(size)}
                  className="h-7 w-7"
                >
                  <ViewportIcon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-7 w-7"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          {!isFullscreen ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(true)}
              className="h-7 w-7"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <a href={normalizedUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Iframe container */}
      <div className="flex-1 bg-muted/50 flex items-start justify-center overflow-auto p-4">
        <motion.div
          key={viewport}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ width: config.width }}
          className={cn(
            "bg-white rounded-lg shadow-2xl overflow-hidden",
            viewport !== "desktop" && "max-w-full"
          )}
        >
          <iframe
            key={refreshKey}
            src={normalizedUrl}
            title={title}
            className="w-full h-[600px] border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-card border-t border-border flex items-center justify-center">
        <span className="text-xs text-muted-foreground">
          <Icon className="inline-block h-3 w-3 mr-1" />
          {config.label} view • {config.width}
        </span>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
      >
        <PreviewContent />
      </motion.div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border overflow-hidden bg-card", className)}>
      <PreviewContent />
    </div>
  );
};

export default LiveSitePreview;

