export interface PageSection {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}

export interface PageTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  defaultSlug: string;
  sections: PageSection[];
  isRequired?: boolean;
}

export const pageTemplates: PageTemplate[] = [
  {
    id: "homepage",
    name: "Homepage",
    category: "Core",
    description: "Your main landing page with hero, services, case studies, and CTAs",
    icon: "Home",
    defaultSlug: "/",
    isRequired: true,
    sections: [
      { id: "hero", name: "Hero", description: "Bold headline with primary CTAs", isDefault: true },
      { id: "trust-bar", name: "Trust Bar", description: "Client logos and credibility", isDefault: true },
      { id: "value-props", name: "Value Props", description: "Outcome-focused benefits", isDefault: true },
      { id: "services", name: "Service Overview", description: "Grid of key services", isDefault: true },
      { id: "process", name: "Process", description: "4-step delivery process", isDefault: true },
      { id: "case-studies", name: "Case Studies", description: "Featured results", isDefault: true },
      { id: "comparison", name: "Why Us", description: "vs typical agency comparison", isDefault: true },
      { id: "testimonials", name: "Testimonials", description: "Client quotes and results", isDefault: true },
      { id: "faq", name: "FAQ", description: "Common questions", isDefault: true },
      { id: "final-cta", name: "Final CTA", description: "Closing conversion section", isDefault: true }
    ]
  },
  {
    id: "seo-service",
    name: "SEO Services",
    category: "Services",
    description: "Technical SEO, content strategy, and performance tracking",
    icon: "Search",
    defaultSlug: "/services/seo",
    sections: [
      { id: "hero", name: "Hero", description: "Service-specific value proposition", isDefault: true },
      { id: "pain-points", name: "Pain Points", description: "Problems this solves", isDefault: true },
      { id: "whats-included", name: "What's Included", description: "Detailed deliverables checklist", isDefault: true },
      { id: "process-timeline", name: "Process Timeline", description: "Month-by-month roadmap", isDefault: true },
      { id: "deliverables", name: "Deliverables", description: "What clients receive", isDefault: true },
      { id: "results", name: "Results", description: "Case studies and metrics", isDefault: true },
      { id: "faq", name: "FAQ", description: "Service-specific questions", isDefault: true },
      { id: "cta", name: "CTA", description: "Book strategy call", isDefault: true }
    ]
  },
  {
    id: "paid-media",
    name: "Paid Media",
    category: "Services",
    description: "Google Ads, Meta, LinkedIn campaigns with conversion tracking",
    icon: "Target",
    defaultSlug: "/services/paid-media",
    sections: [
      { id: "hero", name: "Hero", description: "Paid traffic value prop", isDefault: true },
      { id: "channels", name: "Channels", description: "Google, Meta, LinkedIn coverage", isDefault: true },
      { id: "funnel-design", name: "Funnel Design", description: "Campaign structure", isDefault: true },
      { id: "creative-landing", name: "Creative & Landing", description: "Ad creative + pages", isDefault: true },
      { id: "tracking", name: "Tracking", description: "Conversion events setup", isDefault: true },
      { id: "optimization", name: "Optimization", description: "A/B testing approach", isDefault: true },
      { id: "results", name: "Results", description: "Performance metrics", isDefault: true },
      { id: "cta", name: "CTA", description: "Get started", isDefault: true }
    ]
  },
  {
    id: "web-design",
    name: "Web Design & Dev",
    category: "Services",
    description: "High-end design meets conversion optimization",
    icon: "Layout",
    defaultSlug: "/services/web-design",
    sections: [
      { id: "hero", name: "Hero", description: "Design + CRO positioning", isDefault: true },
      { id: "portfolio", name: "Portfolio", description: "Example layouts and screens", isDefault: true },
      { id: "discovery", name: "Discovery & UX", description: "Research and mapping", isDefault: true },
      { id: "design-system", name: "Design System", description: "Brand and components", isDefault: true },
      { id: "development", name: "Development", description: "Tech stack and approach", isDefault: true },
      { id: "cro-features", name: "CRO Features", description: "Conversion science", isDefault: true },
      { id: "technical", name: "Technical", description: "Speed, mobile, SEO", isDefault: true },
      { id: "cta", name: "CTA", description: "Start your project", isDefault: true }
    ]
  },
  {
    id: "content-email",
    name: "Content & Email",
    category: "Services",
    description: "Long-form content and automated nurture sequences",
    icon: "Mail",
    defaultSlug: "/services/content-email",
    sections: [
      { id: "hero", name: "Hero", description: "Content strategy focus", isDefault: true },
      { id: "content-types", name: "Content Types", description: "SEO content, newsletters", isDefault: true },
      { id: "nurture-flows", name: "Nurture Flows", description: "Email automation", isDefault: true },
      { id: "launch-campaigns", name: "Launch Campaigns", description: "Campaign management", isDefault: true },
      { id: "results", name: "Results", description: "Engagement metrics", isDefault: true },
      { id: "cta", name: "CTA", description: "Get content strategy", isDefault: true }
    ]
  },
  {
    id: "social-personal",
    name: "Social & Personal Brand",
    category: "Services",
    description: "LinkedIn & Instagram content for founders and experts",
    icon: "Users",
    defaultSlug: "/services/social-personal-brand",
    sections: [
      { id: "hero", name: "Hero", description: "Personal brand positioning", isDefault: true },
      { id: "platforms", name: "Platforms", description: "LinkedIn + Instagram focus", isDefault: true },
      { id: "content-system", name: "Content System", description: "Calendars and ghostwriting", isDefault: true },
      { id: "lead-capture", name: "Lead Capture", description: "Funnel integration", isDefault: true },
      { id: "examples", name: "Examples", description: "Sample content", isDefault: true },
      { id: "cta", name: "CTA", description: "Build your brand", isDefault: true }
    ]
  },
  {
    id: "case-studies",
    name: "Case Studies",
    category: "Proof",
    description: "Portfolio of results with filters by service and industry",
    icon: "Award",
    defaultSlug: "/case-studies",
    sections: [
      { id: "hero", name: "Hero", description: "Portfolio intro", isDefault: true },
      { id: "filters", name: "Filters", description: "Service and industry filters", isDefault: true },
      { id: "case-grid", name: "Case Grid", description: "Case study cards", isDefault: true },
      { id: "cta", name: "CTA", description: "Replicate results", isDefault: true }
    ]
  },
  {
    id: "case-study-detail",
    name: "Case Study Detail",
    category: "Proof",
    description: "Individual case study with problem, strategy, execution, results",
    icon: "FileText",
    defaultSlug: "/case-studies/[slug]",
    sections: [
      { id: "hero", name: "Hero", description: "Case overview", isDefault: true },
      { id: "problem", name: "Problem", description: "Initial challenge", isDefault: true },
      { id: "strategy", name: "Strategy", description: "Our approach", isDefault: true },
      { id: "execution", name: "Execution", description: "What we did", isDefault: true },
      { id: "results", name: "Results", description: "Metrics and outcomes", isDefault: true },
      { id: "cta", name: "CTA", description: "Start your project", isDefault: true }
    ]
  },
  {
    id: "industries",
    name: "Industries Hub",
    category: "Targeting",
    description: "Industry-specific marketing solutions",
    icon: "Building",
    defaultSlug: "/industries",
    sections: [
      { id: "hero", name: "Hero", description: "Industry expertise intro", isDefault: true },
      { id: "industry-grid", name: "Industry Grid", description: "Service by industry", isDefault: true },
      { id: "cta", name: "CTA", description: "Industry-specific call", isDefault: true }
    ]
  },
  {
    id: "industry-detail",
    name: "Industry Detail Page",
    category: "Targeting",
    description: "Tailored content for specific industries",
    icon: "Briefcase",
    defaultSlug: "/industries/[industry]",
    sections: [
      { id: "hero", name: "Hero", description: "Industry-specific headline", isDefault: true },
      { id: "pain-points", name: "Pain Points", description: "Industry challenges", isDefault: true },
      { id: "services", name: "Relevant Services", description: "What we offer", isDefault: true },
      { id: "case-studies", name: "Industry Cases", description: "Relevant results", isDefault: true },
      { id: "faq", name: "FAQ", description: "Industry-specific questions", isDefault: true },
      { id: "cta", name: "CTA", description: "Book strategy call", isDefault: true }
    ]
  },
  {
    id: "resources",
    name: "Resources Hub",
    category: "Content",
    description: "Blog and long-form guides for SEO and lead generation",
    icon: "BookOpen",
    defaultSlug: "/resources",
    sections: [
      { id: "hero", name: "Hero", description: "Resources intro", isDefault: true },
      { id: "featured", name: "Featured", description: "Top guides", isDefault: true },
      { id: "resource-grid", name: "Resource Grid", description: "All articles", isDefault: true },
      { id: "filters", name: "Filters", description: "Topic filtering", isDefault: true },
      { id: "cta", name: "CTA", description: "Subscribe or contact", isDefault: true }
    ]
  },
  {
    id: "resource-detail",
    name: "Resource Article",
    category: "Content",
    description: "Long-form guide with internal links and CTAs",
    icon: "FileText",
    defaultSlug: "/resources/[slug]",
    sections: [
      { id: "hero", name: "Hero", description: "Article title and summary", isDefault: true },
      { id: "content", name: "Content", description: "Main article body", isDefault: true },
      { id: "related", name: "Related", description: "Related resources", isDefault: true },
      { id: "cta", name: "CTA", description: "Next steps", isDefault: true }
    ]
  },
  {
    id: "about",
    name: "About",
    category: "Company",
    description: "Agency story, values, and team",
    icon: "Info",
    defaultSlug: "/about",
    sections: [
      { id: "hero", name: "Hero", description: "Agency positioning", isDefault: true },
      { id: "story", name: "Story", description: "Why we exist", isDefault: true },
      { id: "values", name: "Values", description: "Core principles", isDefault: true },
      { id: "team", name: "Team", description: "Key people", isDefault: true },
      { id: "how-we-work", name: "How We Work", description: "Partnership model", isDefault: true },
      { id: "cta", name: "CTA", description: "Work with us", isDefault: true }
    ]
  },
  {
    id: "pricing",
    name: "Pricing & Packages",
    category: "Commercial",
    description: "Transparent pricing tiers and package details",
    icon: "DollarSign",
    defaultSlug: "/pricing",
    sections: [
      { id: "hero", name: "Hero", description: "Pricing intro", isDefault: true },
      { id: "tiers", name: "Pricing Tiers", description: "Growth, Scale, Partner", isDefault: true },
      { id: "comparison", name: "Comparison", description: "What's included", isDefault: true },
      { id: "faq", name: "FAQ", description: "Pricing questions", isDefault: true },
      { id: "cta", name: "CTA", description: "Get started", isDefault: true }
    ]
  },
  {
    id: "contact",
    name: "Contact",
    category: "Conversion",
    description: "Strategy call booking and proposal request",
    icon: "MessageSquare",
    defaultSlug: "/contact",
    isRequired: true,
    sections: [
      { id: "hero", name: "Hero", description: "Contact headline", isDefault: true },
      { id: "form", name: "Form", description: "Multi-step intake form", isDefault: true },
      { id: "calendar", name: "Calendar", description: "Booking embed option", isDefault: true },
      { id: "confirmation", name: "Confirmation", description: "Success message", isDefault: true }
    ]
  },
  {
    id: "landing-template",
    name: "Landing Page Template",
    category: "Campaigns",
    description: "Reusable campaign landing page for specific offers",
    icon: "Rocket",
    defaultSlug: "/landing/[offer]",
    sections: [
      { id: "hero", name: "Hero", description: "Clear promise + CTA", isDefault: true },
      { id: "pain-points", name: "Pain Points", description: "Problem bullets", isDefault: true },
      { id: "solution", name: "Solution", description: "3-step how it works", isDefault: true },
      { id: "proof", name: "Proof", description: "Cases, logos, testimonials", isDefault: true },
      { id: "faq", name: "FAQ", description: "Quick answers", isDefault: true },
      { id: "form", name: "Form", description: "Lead capture", isDefault: true }
    ]
  }
];

export const categoryIcons = {
  "Core": "Home",
  "Services": "Wrench",
  "Proof": "Award",
  "Targeting": "Target",
  "Content": "BookOpen",
  "Company": "Info",
  "Commercial": "DollarSign",
  "Conversion": "MessageSquare",
  "Campaigns": "Rocket"
};
