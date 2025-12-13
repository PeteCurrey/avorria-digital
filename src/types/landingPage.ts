export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  primaryCTA: string;
  secondaryCTA: string;
  pillarPageUrl: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  painPoints: string[];
  typicalDealSize: string;
  idealChannels: string[];
}

export interface Location {
  id: string;
  city: string;
  region?: string;
  country: string;
  countryCode?: string;
  slug: string;
  isPrimaryMarket: boolean;
  coords?: { lat: number; lng: number };
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  type: "service-location" | "service-industry" | "campaign";
  service: Service;
  industry?: Industry;
  location?: Location;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  problemBullets: string[];
  solutionBullets: string[];
  keyMetrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  testimonialSnippet?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  faqList: Array<{
    question: string;
    answer: string;
  }>;
  processSteps?: Array<{
    title: string;
    description: string;
  }>;
  workingWithYou?: string;
  pricingSnapshot?: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  relatedCaseStudies?: string[];
  relatedArticles?: string[];
}
