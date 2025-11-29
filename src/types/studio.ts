export interface StudioConfig {
  purpose: "lead-generation" | "content-hub" | "product-saas" | "service-portal";
  minimal: number; // 0-100
  bold: number; // 0-100
  palette: "light" | "dark" | "monochrome" | "gradient";
  siteSize: "lean" | "standard" | "expanded";
  modules: string[];
  features: string[];
  straightTalking: number; // 0-100
  analytical: number; // 0-100
  understated: number; // 0-100
  notes: string;
}
