import Link from "next/link";
export interface GlossaryTerm {
  term: string;
  definition: string;
  whyItMatters: string;
  seeAlso?: string[];
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "SEO",
    definition: "Search Engine Optimization Ã¢â‚¬â€œ the practice of improving your website and content to rank higher in organic (unpaid) search results.",
    whyItMatters: "Higher rankings mean more qualified traffic without paying for every click.",
    seeAlso: ["/services/seo", "/resources/seo-glossary"],
    category: "SEO"
  },
  {
    term: "Technical SEO",
    definition: "The backend optimisation of your website's crawlability, indexation, speed and structure so search engines can properly understand and rank your content.",
    whyItMatters: "Even great content won't rank if search engines can't crawl and index your site properly.",
    seeAlso: ["/services/seo/technical-seo"],
    category: "SEO"
  },
  {
    term: "On-Page SEO",
    definition: "Optimisation of individual pages including titles, headings, content, internal links and meta descriptions to improve rankings and click-through rates.",
    whyItMatters: "Proper on-page SEO ensures each page clearly signals what it's about to both users and search engines.",
    category: "SEO"
  },
  {
    term: "Local SEO",
    definition: "Optimisation focused on appearing in location-based searches and local map results, primarily through Google Business Profiles and location-specific pages.",
    whyItMatters: "For businesses serving specific areas, local SEO is often the fastest path to qualified leads.",
    seeAlso: ["/services/seo/local-seo"],
    category: "SEO"
  },
  {
    term: "Organic Search",
    definition: "Unpaid search results that appear based on relevance and authority, as opposed to paid ads.",
    whyItMatters: "Organic traffic compounds over time and doesn't disappear when you stop paying.",
    category: "SEO"
  },
  {
    term: "SERP",
    definition: "Search Engine Results Page Ã¢â‚¬â€œ the page Google (or another search engine) shows after you search for something.",
    whyItMatters: "Understanding SERP features helps you target the right types of content and optimize for visibility.",
    category: "SEO"
  },
  {
    term: "CTR",
    definition: "Click-Through Rate Ã¢â‚¬â€œ the percentage of people who see your link or ad and actually click it.",
    whyItMatters: "High impressions with low CTR means you're visible but not compelling Ã¢â‚¬â€œ wasted opportunity.",
    category: "Analytics"
  },
  {
    term: "Conversion Rate",
    definition: "The percentage of visitors who complete a desired action (form submission, purchase, call, etc.).",
    whyItMatters: "Traffic is meaningless if it doesn't convert into leads or revenue.",
    seeAlso: ["/services/web-design"],
    category: "Conversion"
  },
  {
    term: "Lead",
    definition: "A potential customer who has expressed interest by providing contact information or engaging meaningfully with your business.",
    whyItMatters: "Leads are the currency that connects marketing spend to sales pipeline.",
    category: "Sales & Marketing"
  },
  {
    term: "MQL",
    definition: "Marketing Qualified Lead Ã¢â‚¬â€œ a lead that meets specific criteria indicating they're worth sales attention, based on behaviour, fit or engagement.",
    whyItMatters: "Separating MQLs from noise helps sales focus on prospects that are actually ready to buy.",
    category: "Sales & Marketing"
  },
  {
    term: "CPC",
    definition: "Cost Per Click Ã¢â‚¬â€œ the amount you pay each time someone clicks your paid ad.",
    whyItMatters: "CPC determines how much budget you need to drive meaningful traffic from paid channels.",
    category: "Paid Media"
  },
  {
    term: "ROAS",
    definition: "Return On Ad Spend Ã¢â‚¬â€œ revenue generated divided by ad spend (e.g., Ã‚Â£5 revenue for every Ã‚Â£1 spent = 5x ROAS).",
    whyItMatters: "ROAS tells you whether paid campaigns are profitable or burning money.",
    seeAlso: ["/reporting"],
    category: "Paid Media"
  },
  {
    term: "Attribution",
    definition: "The process of assigning credit to marketing touchpoints that contributed to a conversion or sale.",
    whyItMatters: "Proper attribution helps you invest in channels that actually drive revenue, not just last-click vanity metrics.",
    seeAlso: ["/services/seo/analytics-tracking"],
    category: "Analytics"
  },
  {
    term: "Funnel",
    definition: "The journey prospects take from awareness to purchase, typically narrowing at each stage (e.g., visitor Ã¢â€ â€™ lead Ã¢â€ â€™ MQL Ã¢â€ â€™ customer).",
    whyItMatters: "Understanding where prospects drop off lets you fix leaks and improve conversion rates.",
    category: "Conversion"
  },
  {
    term: "Landing Page",
    definition: "A standalone page designed for a specific campaign or audience with a single focused goal (usually lead capture or purchase).",
    whyItMatters: "Dedicated landing pages convert better than sending traffic to generic homepage or service pages.",
    seeAlso: ["/services/web-design"],
    category: "Conversion"
  },
  {
    term: "CTA",
    definition: "Call To Action Ã¢â‚¬â€œ a button, link or prompt that tells visitors what to do next (e.g., 'Book a call', 'Get your audit').",
    whyItMatters: "Clear, compelling CTAs are the difference between passive browsers and active leads.",
    category: "Conversion"
  },
  {
    term: "Bounce Rate",
    definition: "The percentage of visitors who leave your site after viewing only one page without taking any action.",
    whyItMatters: "High bounce rates often signal poor message-match, slow load times or unclear value propositions.",
    category: "Analytics"
  },
  {
    term: "Core Web Vitals",
    definition: "Google's set of performance metrics measuring load speed, interactivity and visual stability of web pages.",
    whyItMatters: "Poor Core Web Vitals hurt both rankings and user experience Ã¢â‚¬â€œ they're now a ranking factor.",
    seeAlso: ["/services/seo/technical-seo"],
    category: "SEO"
  },
  {
    term: "Schema",
    definition: "Structured data markup that helps search engines understand your content and display rich results (ratings, FAQs, events, etc.).",
    whyItMatters: "Schema can increase visibility and CTR in search results by enabling enhanced SERP features.",
    category: "SEO"
  },
  {
    term: "UTM",
    definition: "Urchin Tracking Module parameters Ã¢â‚¬â€œ tags added to URLs to track campaign performance in analytics (e.g., utm_source, utm_medium, utm_campaign).",
    whyItMatters: "UTMs let you see exactly which campaigns, channels and creatives drive traffic and conversions.",
    seeAlso: ["/services/seo/analytics-tracking"],
    category: "Analytics"
  },
  {
    term: "GA4",
    definition: "Google Analytics 4 Ã¢â‚¬â€œ the latest version of Google's web analytics platform, focused on event-based tracking and cross-platform measurement.",
    whyItMatters: "GA4 is the current standard for understanding user behaviour and measuring marketing performance.",
    seeAlso: ["/services/seo/analytics-tracking"],
    category: "Analytics"
  }
];

export const getTermsByLetter = (letter: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.term.charAt(0).toUpperCase() === letter.toUpperCase());
};

export const searchTerms = (query: string): GlossaryTerm[] => {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

