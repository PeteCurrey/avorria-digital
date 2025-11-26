interface LogoWallProps {
  title?: string;
  type?: "clients" | "tools";
}

export const LogoWall = ({ title, type = "clients" }: LogoWallProps) => {
  const clientLogos = [
    "TechFlow Solutions",
    "Premier Legal Group", 
    "Elevate Digital",
    "BuildRight Construction",
    "Vertex Consulting",
    "Summit Partners"
  ];

  const toolLogos = [
    "Google Analytics",
    "Google Ads",
    "Meta Business",
    "LinkedIn Ads",
    "HubSpot",
    "SEMrush"
  ];

  const logos = type === "clients" ? clientLogos : toolLogos;

  return (
    <div className="py-12">
      {title && (
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center mb-8">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="text-base lg:text-lg font-semibold text-foreground opacity-40 hover:opacity-60 transition-opacity grayscale"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};
