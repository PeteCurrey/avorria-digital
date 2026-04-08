import Link from "next/link";
import { cn } from "@/lib/utils";
import { useClientLogosPublic } from "@/hooks/useClientLogos";

interface StaticLogo {
  name: string;
  logo_url?: string;
}

interface LogoWallProps {
  title?: string;
  type?: "clients" | "tools";
  variant?: "dark" | "light";
}

export const LogoWall = ({ title, type = "clients", variant = "dark" }: LogoWallProps) => {
  const { data: clientLogos, isLoading } = useClientLogosPublic();

  const toolLogos: StaticLogo[] = [
    { name: "Google Analytics" },
    { name: "Google Ads" },
    { name: "Meta Business" },
    { name: "LinkedIn Ads" },
    { name: "HubSpot" },
    { name: "SEMrush" },
  ];

  // Generate initials from company name
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase();
  };

  // Use database logos for clients, static for tools
  const logos = type === "clients" 
    ? (clientLogos || []).map(logo => ({ name: logo.name, logo_url: logo.logo_url }))
    : toolLogos;

  // Show loading state or empty state for clients
  if (type === "clients" && isLoading) {
    return (
      <div className="py-8">
        {title && (
          <h3 className={cn(
            "text-sm font-semibold uppercase tracking-wide text-center mb-8",
            variant === "light" ? "text-muted-foreground" : "text-white/60"
          )}>
            {title}
          </h3>
        )}
        <div className="flex justify-center items-center gap-6 lg:gap-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-muted/30 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Don't render if no logos
  if (type === "clients" && (!clientLogos || clientLogos.length === 0)) {
    return null;
  }

  return (
    <div className="py-8">
      {title && (
        <h3 className={cn(
          "text-sm font-semibold uppercase tracking-wide text-center mb-8",
          variant === "light" ? "text-muted-foreground" : "text-white/60"
        )}>
          {title}
        </h3>
      )}
      <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
        {logos.map((logo, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 group",
              variant === "light" 
                ? "hover:bg-secondary/50" 
                : "hover:bg-white/5"
            )}
          >
            {/* Logo image or initials fallback */}
            {logo.logo_url ? (
              <img 
                src={logo.logo_url} 
                alt={logo.name} 
                className="w-10 h-10 rounded-lg object-contain"
              />
            ) : (
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300",
                variant === "light"
                  ? "bg-secondary text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                  : "bg-white/10 text-white/70 group-hover:bg-accent group-hover:text-accent-foreground"
              )}>
                {getInitials(logo.name)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

