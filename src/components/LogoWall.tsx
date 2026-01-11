import { cn } from "@/lib/utils";

interface ClientLogo {
  name: string;
  logo?: string;
}

interface LogoWallProps {
  title?: string;
  type?: "clients" | "tools";
  variant?: "dark" | "light";
}

export const LogoWall = ({ title, type = "clients", variant = "dark" }: LogoWallProps) => {
  // Real client logos - using initials/badges for now, can be replaced with actual SVGs
  const clientLogos: ClientLogo[] = [
    { name: "One Great Northern" },
    { name: "EntireFM" },
    { name: "Classic Cars Direct" },
    { name: "Apex Professional" },
    { name: "Northfield Group" },
    { name: "Velocity SaaS" },
  ];

  const toolLogos: ClientLogo[] = [
    { name: "Google Analytics" },
    { name: "Google Ads" },
    { name: "Meta Business" },
    { name: "LinkedIn Ads" },
    { name: "HubSpot" },
    { name: "SEMrush" },
  ];

  const logos = type === "clients" ? clientLogos : toolLogos;

  // Generate initials from company name
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase();
  };

  return (
    <div className="py-8">
      {title && (
        <h3 className={cn(
          "text-sm font-semibold uppercase tracking-wide text-center mb-8",
          variant === "light" ? "text-gray-500" : "text-white/60"
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
                ? "hover:bg-gray-100" 
                : "hover:bg-white/5"
            )}
          >
            {/* Logo badge with initials */}
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300",
              variant === "light"
                ? "bg-gray-100 text-gray-600 group-hover:bg-accent group-hover:text-white"
                : "bg-white/10 text-white/70 group-hover:bg-accent group-hover:text-white"
            )}>
              {getInitials(logo.name)}
            </div>
            {/* Company name */}
            <span className={cn(
              "text-sm font-medium transition-colors duration-300 hidden sm:block",
              variant === "light"
                ? "text-gray-600 group-hover:text-gray-900"
                : "text-white/60 group-hover:text-white"
            )}>
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
