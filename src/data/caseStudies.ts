/**
 * Case Studies Data Model
 * 
 * TypeScript interfaces for case study presentation.
 * All case study data is now sourced from the database.
 */

export interface CaseMetric {
  label: string;
  value: string;
  baseline?: string;
  highlight?: boolean;
}

export interface CaseQuote {
  text: string;
  name: string;
  role: string;
  company?: string;
}

export interface CaseTimelineStep {
  phase: string;
  title: string;
  description: string;
  duration?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  services: string[];
  timeframe: string;
  year: number;
  outcome: 'leads' | 'revenue' | 'traffic' | 'efficiency';
  
  // Hero
  heroMedia: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  headline: string;
  subheadline: string;
  kpiBadges: CaseMetric[];
  
  // Content
  problem: string;
  approach: CaseTimelineStep[];
  outcomes: CaseMetric[];
  
  // Media
  galleryMedia: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  }[];
  beforeMedia?: string;
  afterMedia?: string;
  
  // Social proof
  quote?: CaseQuote;
  
  // PDF content for download
  pdfContent?: {
    summary: string;
    keyResults: string[];
  };
  
  // Related
  relatedSlugs: string[];
  
  // Featured
  isFeatured?: boolean;
}
