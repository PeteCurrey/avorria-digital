'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Laptop, Tablet, Smartphone, Columns2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DeviceType = "desktop" | "laptop" | "tablet" | "mobile";

interface DevicePreviewProps {
  imageUrl: string;
  alt?: string;
  className?: string;
  showDeviceSwitcher?: boolean;
  defaultDevice?: DeviceType;
}

const deviceConfig: Record<DeviceType, { 
  icon: React.ElementType; 
  label: string;
  frameClass: string;
  screenClass: string;
  aspectRatio: string;
}> = {
  desktop: {
    icon: Monitor,
    label: "Desktop",
    frameClass: "bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-2 pb-6",
    screenClass: "rounded-md",
    aspectRatio: "aspect-[16/10]",
  },
  laptop: {
    icon: Laptop,
    label: "Laptop",
    frameClass: "bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg p-1.5",
    screenClass: "rounded-sm",
    aspectRatio: "aspect-[16/10]",
  },
  tablet: {
    icon: Tablet,
    label: "Tablet",
    frameClass: "bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl p-3",
    screenClass: "rounded-lg",
    aspectRatio: "aspect-[4/3]",
  },
  mobile: {
    icon: Smartphone,
    label: "Mobile",
    frameClass: "bg-gradient-to-b from-gray-700 to-gray-800 rounded-3xl p-2",
    screenClass: "rounded-2xl",
    aspectRatio: "aspect-[9/19]",
  },
};

export const DevicePreview = ({ 
  imageUrl, 
  alt = "Preview",
  className,
  showDeviceSwitcher = true,
  defaultDevice = "desktop"
}: DevicePreviewProps) => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>(defaultDevice);
  const [showSideBySide, setShowSideBySide] = useState(false);

  const config = deviceConfig[activeDevice];
  const Icon = config.icon;

  if (showSideBySide) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Device switcher */}
        {showDeviceSwitcher && (
          <div className="flex items-center justify-center gap-2 bg-card rounded-lg p-2 border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSideBySide(false)}
              className="text-primary"
            >
              <Columns2 className="h-4 w-4 mr-2" />
              Exit Comparison
            </Button>
          </div>
        )}

        {/* Side by side view */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Desktop */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Desktop</span>
            <div className={cn("relative", deviceConfig.desktop.frameClass, "w-full max-w-md")}>
              <div className={cn("overflow-hidden bg-white", deviceConfig.desktop.screenClass, deviceConfig.desktop.aspectRatio)}>
                <img src={imageUrl} alt={`${alt} - Desktop`} className="w-full h-full object-cover object-top" />
              </div>
              {/* Stand */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-600 rounded-b-md" />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Mobile</span>
            <div className={cn("relative", deviceConfig.mobile.frameClass, "w-32")}>
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-900 rounded-full z-10" />
              <div className={cn("overflow-hidden bg-white", deviceConfig.mobile.screenClass, deviceConfig.mobile.aspectRatio)}>
                <img src={imageUrl} alt={`${alt} - Mobile`} className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Device switcher */}
      {showDeviceSwitcher && (
        <div className="flex items-center justify-center gap-2 bg-card rounded-lg p-2 border border-border">
          {(Object.keys(deviceConfig) as DeviceType[]).map((device) => {
            const DeviceIcon = deviceConfig[device].icon;
            return (
              <Button
                key={device}
                variant={activeDevice === device ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveDevice(device)}
                className="gap-2"
              >
                <DeviceIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{deviceConfig[device].label}</span>
              </Button>
            );
          })}
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSideBySide(true)}
            className="gap-2"
          >
            <Columns2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compare</span>
          </Button>
        </div>
      )}

      {/* Device frame */}
      <motion.div
        key={activeDevice}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex justify-center"
      >
        <div className={cn(
          "relative inline-block",
          activeDevice === "mobile" && "w-40",
          activeDevice === "tablet" && "w-64",
          activeDevice === "laptop" && "w-full max-w-lg",
          activeDevice === "desktop" && "w-full max-w-xl"
        )}>
          <div className={cn("relative", config.frameClass)}>
            {/* Notch for mobile */}
            {activeDevice === "mobile" && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-900 rounded-full z-10" />
            )}
            
            {/* Camera for laptop */}
            {activeDevice === "laptop" && (
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rounded-full z-10" />
            )}

            {/* Screen */}
            <div className={cn(
              "overflow-hidden bg-white",
              config.screenClass,
              config.aspectRatio
            )}>
              <img 
                src={imageUrl} 
                alt={alt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Stand for desktop */}
          {activeDevice === "desktop" && (
            <>
              <div className="w-16 h-8 bg-gray-600 mx-auto" />
              <div className="w-24 h-2 bg-gray-700 rounded-full mx-auto" />
            </>
          )}

          {/* Base for laptop */}
          {activeDevice === "laptop" && (
            <div className="w-full h-3 bg-gradient-to-b from-gray-500 to-gray-600 rounded-b-xl" />
          )}
        </div>
      </motion.div>

      {/* Device label */}
      <p className="text-center text-sm text-muted-foreground">
        <Icon className="inline-block h-4 w-4 mr-1" />
        {config.label} Preview
      </p>
    </div>
  );
};

export default DevicePreview;

