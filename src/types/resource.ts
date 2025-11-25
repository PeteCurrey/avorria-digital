export interface Resource {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "SEO" | "Paid Media" | "Web Design" | "Analytics" | "Strategy";
  readingTime: number;
  serviceRelation?: string;
  industryRelation?: string;
  isPillar: boolean;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string;
}

export interface ComparisonPage {
  id: string;
  title: string;
  slug: string;
  comparisonType: "avorria-vs-agency" | "avorria-vs-diy" | "tool-comparison";
  primarySubject: string;
  secondarySubject: string;
  audience: string;
  summary: string;
  sections: ComparisonSection[];
  ctaText: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ComparisonSection {
  type: "intro" | "table" | "pros-cons" | "use-cases" | "cta";
  heading?: string;
  content?: string;
  tableData?: ComparisonTableRow[];
  prosCons?: {
    pros: string[];
    cons: string[];
  };
  useCases?: {
    them: string[];
    us: string[];
  };
}

export interface ComparisonTableRow {
  criterion: string;
  primaryValue: string;
  secondaryValue: string;
}
