import { LandingPage, Service, Location } from "@/types/landingPage";
import { services, getServiceBySlug } from "./services";
import { locations, getLocationBySlug } from "./locations";

// Location-specific testimonial data
interface LocationTestimonial {
  seo: { quote: string; author: string; role: string; company: string };
  "web-design": { quote: string; author: string; role: string; company: string };
  "digital-marketing": { quote: string; author: string; role: string; company: string };
  "paid-media": { quote: string; author: string; role: string; company: string };
}

const locationTestimonials: Record<string, LocationTestimonial> = {
  // UK Cities
  london: {
    seo: {
      quote: "We'd been through two agencies before and got nowhere. Avorria rebuilt our site structure and within four months we were ranking for the terms that actually bring in work. The difference is night and day.",
      author: "James Richardson",
      role: "Managing Partner",
      company: "Richardson & Cole Solicitors",
    },
    "web-design": {
      quote: "Our old site looked fine but did nothing for leads. The new site converts visitors properly – enquiries are up 140% and we can finally track what's working.",
      author: "Sophie Chen",
      role: "Marketing Director",
      company: "Canary Wharf Financial Advisors",
    },
    "digital-marketing": {
      quote: "We had three agencies doing SEO, ads and content with no coordination. Avorria brought it together and suddenly we could see what was actually driving pipeline.",
      author: "Marcus Webb",
      role: "Commercial Director",
      company: "Webb Technology Partners",
    },
    "paid-media": {
      quote: "Our previous agency was obsessed with impressions. Avorria restructured everything around actual leads and suddenly the ads started paying for themselves.",
      author: "Priya Sharma",
      role: "Head of Growth",
      company: "Fintech Solutions UK",
    },
  },
  manchester: {
    seo: {
      quote: "We'd tried a couple of SEO suppliers in Manchester and got nowhere. Once Avorria rebuilt the structure and pages, our organic leads finally started matching the traffic numbers.",
      author: "Tom Fletcher",
      role: "Managing Director",
      company: "Northern Property Group",
    },
    "web-design": {
      quote: "The site Avorria built us is head and shoulders above anything else in our sector locally. More importantly, it actually converts – enquiries doubled in the first quarter.",
      author: "Emma Whitfield",
      role: "Operations Director",
      company: "Manchester Business Consulting",
    },
    "digital-marketing": {
      quote: "Finally have a single team who understands our whole marketing picture. No more finger-pointing between agencies when results aren't there.",
      author: "David Morrison",
      role: "CEO",
      company: "Morrison Engineering Solutions",
    },
    "paid-media": {
      quote: "Cost per lead is down 38% since Avorria took over our Google Ads. They actually care about ROI, not just spending our budget.",
      author: "Rachel Adams",
      role: "Marketing Manager",
      company: "Northern Logistics Ltd",
    },
  },
  birmingham: {
    seo: {
      quote: "We serve clients across the Midlands and Avorria built a local SEO strategy that actually reflects that. Enquiries from our target areas are up 67% year on year.",
      author: "Andrew Cooper",
      role: "Director",
      company: "Midlands Legal Services",
    },
    "web-design": {
      quote: "Our competitors' sites all look the same. Avorria built something that stands out and converts. The feedback from prospects has been incredible.",
      author: "Sarah Mitchell",
      role: "Business Development Director",
      company: "Birmingham Wealth Management",
    },
    "digital-marketing": {
      quote: "We'd been throwing money at marketing with no clear view of what worked. Now we know exactly which channels drive revenue and which to cut.",
      author: "Michael Turner",
      role: "Managing Director",
      company: "Turner Manufacturing Group",
    },
    "paid-media": {
      quote: "Finally have ads that target the right people with the right message. Lead quality improved dramatically once Avorria restructured our campaigns.",
      author: "Lisa Chen",
      role: "Head of Marketing",
      company: "West Midlands Tech Hub",
    },
  },
  leeds: {
    seo: {
      quote: "We serve Yorkshire businesses and needed to rank locally. Avorria built location pages that actually work – we now dominate the searches that matter.",
      author: "James Hartley",
      role: "Managing Partner",
      company: "Hartley & Associates Accountants",
    },
    "web-design": {
      quote: "Our new site reflects the quality of our work. It's fast, it looks professional, and most importantly it converts visitors into clients.",
      author: "Charlotte Evans",
      role: "Marketing Director",
      company: "Yorkshire Architecture Studio",
    },
    "digital-marketing": {
      quote: "Having one team handle everything from SEO to ads makes life so much simpler. And the results speak for themselves – pipeline is up 85%.",
      author: "Robert Walsh",
      role: "Commercial Director",
      company: "Walsh Industrial Services",
    },
    "paid-media": {
      quote: "We'd been wasting money on ads that generated clicks but not leads. Avorria fixed our tracking and targeting – now every pound is accountable.",
      author: "Jennifer Brown",
      role: "Operations Director",
      company: "Leeds Business Solutions",
    },
  },
  liverpool: {
    seo: {
      quote: "Avorria understood our market and built an SEO strategy around the services that actually make us money. Organic enquiries are now our biggest lead source.",
      author: "Paul Murphy",
      role: "Director",
      company: "Merseyside Construction Group",
    },
    "web-design": {
      quote: "The site they built us looks like something from a London agency but was designed for Liverpool businesses. Enquiries from the site are up 120%.",
      author: "Karen Williams",
      role: "Managing Director",
      company: "Liverpool Creative Agency",
    },
    "digital-marketing": {
      quote: "We needed a marketing partner who could handle everything without the drama. Avorria delivers results without the usual agency nonsense.",
      author: "Steven Taylor",
      role: "CEO",
      company: "Taylor Maritime Services",
    },
    "paid-media": {
      quote: "Our Google Ads were bleeding money. Avorria rebuilt everything from scratch and we now have a positive ROI for the first time in three years.",
      author: "Angela Roberts",
      role: "Head of Growth",
      company: "Roberts Recruitment Liverpool",
    },
  },
  edinburgh: {
    seo: {
      quote: "We compete with London firms for Scottish clients. Avorria helped us dominate local search while building authority for national terms too.",
      author: "Alistair MacKenzie",
      role: "Senior Partner",
      company: "MacKenzie Law Edinburgh",
    },
    "web-design": {
      quote: "Our old site was an embarrassment compared to competitors. The new one positions us properly and the conversion rate has tripled.",
      author: "Fiona Stewart",
      role: "Marketing Director",
      company: "Edinburgh Financial Planning",
    },
    "digital-marketing": {
      quote: "Having a single team who understands both Scottish and UK-wide marketing has been invaluable. Results have exceeded our expectations.",
      author: "Douglas Campbell",
      role: "Commercial Director",
      company: "Campbell Engineering Scotland",
    },
    "paid-media": {
      quote: "Avorria runs our ads with proper Scottish market understanding. Cost per acquisition dropped 45% while lead quality went up.",
      author: "Morag Henderson",
      role: "Head of Marketing",
      company: "Henderson Medical Practice",
    },
  },
  glasgow: {
    seo: {
      quote: "We needed to rank in Glasgow and across the Central Belt. Avorria built a strategy that covers our whole service area without spreading too thin.",
      author: "Craig Robertson",
      role: "Managing Director",
      company: "Robertson & Sons Builders",
    },
    "web-design": {
      quote: "The site reflects our business properly now. It's not just pretty – it converts. Best investment we've made in marketing.",
      author: "Nicola Fraser",
      role: "Director",
      company: "Glasgow Design Consultancy",
    },
    "digital-marketing": {
      quote: "Finally have marketing that's accountable. We know exactly what's working and Avorria adjusts quickly when something isn't.",
      author: "Stuart Paterson",
      role: "CEO",
      company: "Paterson Technology Group",
    },
    "paid-media": {
      quote: "Our LinkedIn ads were expensive and ineffective. Avorria rebuilt the targeting and creative – now we get qualified leads at half the cost.",
      author: "Eileen Murray",
      role: "Business Development Director",
      company: "Murray HR Consulting",
    },
  },
  bristol: {
    seo: {
      quote: "We compete with London agencies for South West clients. Avorria helped us own the local searches while building credibility for bigger opportunities.",
      author: "Oliver Jenkins",
      role: "Managing Director",
      company: "Bristol Technology Ventures",
    },
    "web-design": {
      quote: "Our new website genuinely impresses clients. It loads fast, looks premium, and converts visitors into enquiries consistently.",
      author: "Hannah Davies",
      role: "Head of Marketing",
      company: "South West Architecture Studio",
    },
    "digital-marketing": {
      quote: "Having strategy and execution under one roof has simplified everything. And the results are better than when we had separate agencies.",
      author: "Matthew Price",
      role: "Commercial Director",
      company: "Price Engineering Bristol",
    },
    "paid-media": {
      quote: "Avorria took our messy ad accounts and turned them into a proper lead generation machine. ROAS is 3.5x now.",
      author: "Rebecca Cole",
      role: "Marketing Manager",
      company: "Bristol Professional Services",
    },
  },
  newcastle: {
    seo: {
      quote: "We serve the whole North East and needed to rank accordingly. Avorria built location-specific pages that actually convert local traffic.",
      author: "Gary Thompson",
      role: "Director",
      company: "Thompson Legal North East",
    },
    "web-design": {
      quote: "Our competitors' sites are stuck in 2015. Avorria built something modern that positions us as the premium choice in the region.",
      author: "Clare Wilson",
      role: "Managing Director",
      company: "Newcastle Digital Agency",
    },
    "digital-marketing": {
      quote: "We'd been doing bits of marketing everywhere with no real strategy. Avorria brought focus and suddenly everything started working.",
      author: "Keith Armstrong",
      role: "CEO",
      company: "Armstrong Manufacturing Ltd",
    },
    "paid-media": {
      quote: "Our Google Ads finally make sense. We can see exactly which searches bring in work and what we pay for each lead.",
      author: "Joanne Bell",
      role: "Operations Director",
      company: "North East Business Services",
    },
  },
  nottingham: {
    seo: {
      quote: "We'd tried DIY SEO and cheap agencies. Avorria was the first to actually explain what they'd do and then deliver on it.",
      author: "Mark Johnson",
      role: "Managing Director",
      company: "East Midlands Property Group",
    },
    "web-design": {
      quote: "The site they built us looks and performs like a six-figure project. It's the best marketing investment we've made.",
      author: "Victoria Reed",
      role: "Director",
      company: "Nottingham Creative Hub",
    },
    "digital-marketing": {
      quote: "Having one team who owns the full picture makes my job so much easier. Results are up and stress is down.",
      author: "Daniel Lewis",
      role: "Head of Sales",
      company: "Lewis & Partners Consulting",
    },
    "paid-media": {
      quote: "Avorria fixed our tracking first, then optimised the campaigns. Now we know exactly what each lead costs and where it came from.",
      author: "Laura Scott",
      role: "Marketing Manager",
      company: "Nottingham Tech Solutions",
    },
  },
  cardiff: {
    seo: {
      quote: "We needed to rank across Wales and the South West. Avorria built a strategy that covers our whole service area effectively.",
      author: "Rhys Morgan",
      role: "Managing Director",
      company: "Morgan & Evans Solicitors",
    },
    "web-design": {
      quote: "Our new site positions us as the premium choice in Cardiff. The enquiry quality has improved dramatically since launch.",
      author: "Sian Williams",
      role: "Director",
      company: "Cardiff Business Advisory",
    },
    "digital-marketing": {
      quote: "Finally have a marketing partner who understands the Welsh market. Results have exceeded what we achieved with our previous London agency.",
      author: "Gareth Davies",
      role: "Commercial Director",
      company: "Davies Manufacturing Wales",
    },
    "paid-media": {
      quote: "Our Facebook ads were getting likes but not leads. Avorria rebuilt everything and now social actually contributes to pipeline.",
      author: "Bethan Jones",
      role: "Head of Marketing",
      company: "Jones Financial Cardiff",
    },
  },
  sheffield: {
    seo: {
      quote: "We'd been invisible online for years. Avorria fixed the basics, built proper pages, and now we rank for the terms our customers actually search.",
      author: "Simon Walker",
      role: "Director",
      company: "Walker Steel Services",
    },
    "web-design": {
      quote: "Our old site was doing nothing for us. The new one looks great and actually generates enquiries. Should have done this years ago.",
      author: "Michelle Taylor",
      role: "Managing Director",
      company: "Sheffield Design Studio",
    },
    "digital-marketing": {
      quote: "We needed someone to take ownership of all our marketing, not just sell us services. Avorria does exactly that.",
      author: "Andrew Jackson",
      role: "CEO",
      company: "Jackson Engineering Group",
    },
    "paid-media": {
      quote: "Cost per lead dropped 50% when Avorria took over our ads. Same budget, twice as many qualified enquiries.",
      author: "Helen Green",
      role: "Operations Director",
      company: "Green HR Consulting Sheffield",
    },
  },
  // USA Cities
  "new-york": {
    seo: {
      quote: "NYC is brutally competitive for search. Avorria built a strategy that actually cut through, focusing on the neighborhoods and niches where we win.",
      author: "Michael Rodriguez",
      role: "Managing Partner",
      company: "Rodriguez & Associates Law",
    },
    "web-design": {
      quote: "Our old site looked like every other firm in Manhattan. The new one stands out and converts. Enquiries are up 180% since launch.",
      author: "Jennifer Walsh",
      role: "CMO",
      company: "Walsh Capital Partners",
    },
    "digital-marketing": {
      quote: "We'd been doing random marketing with no coherent strategy. Avorria brought discipline and focus – ROI improved immediately.",
      author: "David Kim",
      role: "CEO",
      company: "Kim Technology Ventures",
    },
    "paid-media": {
      quote: "NYC clicks are expensive. Avorria rebuilt our targeting to focus on high-intent searches and our cost per lead dropped 55%.",
      author: "Sarah Martinez",
      role: "Head of Growth",
      company: "Martinez Digital NYC",
    },
  },
  "los-angeles": {
    seo: {
      quote: "LA is a huge market but we only serve certain areas. Avorria built local SEO that targets exactly where our customers are.",
      author: "Brian Chen",
      role: "Owner",
      company: "LA Home Services Pro",
    },
    "web-design": {
      quote: "The site they built captures LA perfectly – it's modern, fast, and converts visitors into consultations consistently.",
      author: "Amanda Foster",
      role: "Director",
      company: "Foster Creative Agency LA",
    },
    "digital-marketing": {
      quote: "Having one team handle SEO, ads and content saved us from the finger-pointing between agencies. Results are up and drama is down.",
      author: "Chris Thompson",
      role: "VP Marketing",
      company: "Thompson Entertainment Group",
    },
    "paid-media": {
      quote: "Our Instagram and Google ads finally work together instead of competing. Avorria built proper attribution so we know what drives sales.",
      author: "Michelle Lee",
      role: "Marketing Director",
      company: "Pacific Beauty Brands",
    },
  },
  chicago: {
    seo: {
      quote: "We serve the entire Chicagoland area. Avorria built an SEO strategy that covers downtown and suburbs without spreading too thin.",
      author: "Robert Johnson",
      role: "Managing Partner",
      company: "Johnson Legal Group Chicago",
    },
    "web-design": {
      quote: "Our new site loads in under 2 seconds and converts at 3x our old site. The investment paid for itself in the first quarter.",
      author: "Katherine Miller",
      role: "COO",
      company: "Miller Consulting Chicago",
    },
    "digital-marketing": {
      quote: "Finally have marketing that's accountable. We know what works, what doesn't, and Avorria adjusts quickly when markets shift.",
      author: "Thomas Anderson",
      role: "CEO",
      company: "Anderson Manufacturing Midwest",
    },
    "paid-media": {
      quote: "Chicago is competitive for B2B. Avorria rebuilt our LinkedIn strategy and we're now getting meetings with companies we couldn't reach before.",
      author: "Patricia Davis",
      role: "Head of Business Development",
      company: "Davis Professional Services",
    },
  },
  "san-francisco": {
    seo: {
      quote: "In a market full of tech companies, SEO is hyper-competitive. Avorria helped us carve out the specific niches where we can actually win.",
      author: "Jason Park",
      role: "Founder",
      company: "Park Tech Solutions",
    },
    "web-design": {
      quote: "Bay Area companies have high standards. Our new site finally reflects the quality of our work and converts accordingly.",
      author: "Stephanie Hughes",
      role: "VP Marketing",
      company: "Hughes Venture Partners",
    },
    "digital-marketing": {
      quote: "We'd been doing the 'spray and pray' approach. Avorria brought focus and suddenly our marketing spend started generating real pipeline.",
      author: "Kevin Zhang",
      role: "CMO",
      company: "Zhang Software Group",
    },
    "paid-media": {
      quote: "SaaS competition in SF is brutal. Avorria rebuilt our paid strategy around actual product demos, not just leads. Pipeline 2x'd.",
      author: "Rachel Nguyen",
      role: "Head of Growth",
      company: "Nguyen AI Platforms",
    },
  },
  boston: {
    seo: {
      quote: "We compete with well-established firms for Boston clients. Avorria helped us build authority online that matches our reputation offline.",
      author: "William Sullivan",
      role: "Senior Partner",
      company: "Sullivan & Partners LLP",
    },
    "web-design": {
      quote: "Boston clients expect quality. Our new site delivers that first impression and converts visitors into discovery calls.",
      author: "Elizabeth Connor",
      role: "Managing Director",
      company: "Connor Financial Advisors",
    },
    "digital-marketing": {
      quote: "Having strategy, SEO and paid under one roof simplified everything. No more coordination headaches between agencies.",
      author: "James O'Brien",
      role: "CEO",
      company: "O'Brien Technology Group",
    },
    "paid-media": {
      quote: "Avorria runs our ads with the same analytical rigor we bring to our own work. Cost per qualified lead is down 40%.",
      author: "Catherine Murphy",
      role: "Head of Marketing",
      company: "Murphy Bio Sciences",
    },
  },
  miami: {
    seo: {
      quote: "Miami is competitive and multilingual. Avorria built SEO that works for both English and Spanish searches in our market.",
      author: "Carlos Hernandez",
      role: "Managing Partner",
      company: "Hernandez Law Miami",
    },
    "web-design": {
      quote: "Our new site captures the energy of Miami while converting visitors effectively. It's exactly what our brand needed.",
      author: "Maria Santos",
      role: "CEO",
      company: "Santos Luxury Real Estate",
    },
    "digital-marketing": {
      quote: "The Miami market is unique. Avorria understood that and built a strategy that actually fits how business works here.",
      author: "Roberto Garcia",
      role: "Commercial Director",
      company: "Garcia Hospitality Group",
    },
    "paid-media": {
      quote: "Our Facebook and Instagram ads finally target the right people. Lead quality improved dramatically since Avorria took over.",
      author: "Isabella Rodriguez",
      role: "Head of Growth",
      company: "Miami Wellness Brands",
    },
  },
  austin: {
    seo: {
      quote: "Austin's tech scene is competitive. Avorria helped us stand out by focusing on the specific problems we solve, not just keywords.",
      author: "Tyler Williams",
      role: "Founder",
      company: "Williams SaaS Ventures",
    },
    "web-design": {
      quote: "Our old site looked like every other Austin startup. The new one reflects our actual quality and converts visitors into demos.",
      author: "Ashley Martin",
      role: "VP Marketing",
      company: "Martin Tech Partners",
    },
    "digital-marketing": {
      quote: "Austin grows fast and marketing needs to keep up. Avorria provides the strategic flexibility to adjust as our market changes.",
      author: "Brandon Davis",
      role: "CEO",
      company: "Davis Innovation Labs",
    },
    "paid-media": {
      quote: "Avorria runs our LinkedIn campaigns like they're spending their own money. Efficiency is up, waste is down.",
      author: "Megan Johnson",
      role: "Head of Demand Gen",
      company: "Johnson Cloud Services",
    },
  },
  denver: {
    seo: {
      quote: "We serve the whole Front Range. Avorria built local SEO that covers Denver and surrounding areas without spreading too thin.",
      author: "Mark Peterson",
      role: "Owner",
      company: "Peterson Home Services Colorado",
    },
    "web-design": {
      quote: "Our new site captures Colorado authenticity while performing like a serious business. Enquiries are up 95% since launch.",
      author: "Laura Nelson",
      role: "Marketing Director",
      company: "Nelson Architecture Denver",
    },
    "digital-marketing": {
      quote: "Denver is growing fast and competition is fierce. Avorria helps us stay ahead with marketing that actually adapts.",
      author: "Scott Mitchell",
      role: "CEO",
      company: "Mitchell Outdoor Adventures",
    },
    "paid-media": {
      quote: "Our Google Ads were wasting money on the wrong searches. Avorria rebuilt targeting and cost per lead dropped by half.",
      author: "Jennifer Ryan",
      role: "Head of Marketing",
      company: "Rocky Mountain Consulting",
    },
  },
  seattle: {
    seo: {
      quote: "Seattle is full of tech companies competing for attention. Avorria helped us find the specific niches where we can win.",
      author: "Nathan Lee",
      role: "Founder",
      company: "Lee Software Solutions",
    },
    "web-design": {
      quote: "Pacific Northwest clients appreciate quality and authenticity. Our new site delivers both and converts consistently.",
      author: "Emily Chang",
      role: "Creative Director",
      company: "Chang Design Collective",
    },
    "digital-marketing": {
      quote: "Having one team handle the whole marketing picture makes life simpler. And the results are better than our previous multi-agency setup.",
      author: "Andrew White",
      role: "VP Sales",
      company: "White Technology Consulting",
    },
    "paid-media": {
      quote: "Avorria rebuilt our paid strategy around actual qualified leads, not just clicks. The sales team finally has quality to work with.",
      author: "Rachel Kim",
      role: "Head of Growth",
      company: "Seattle AI Ventures",
    },
  },
  atlanta: {
    seo: {
      quote: "Atlanta is competitive for professional services. Avorria helped us stand out with SEO that focuses on our actual strengths.",
      author: "Marcus Williams",
      role: "Managing Partner",
      company: "Williams & Associates Atlanta",
    },
    "web-design": {
      quote: "Our new site positions us as the premium choice in Atlanta. The conversion rate has tripled since launch.",
      author: "Denise Jackson",
      role: "CEO",
      company: "Jackson Creative Agency",
    },
    "digital-marketing": {
      quote: "The Southeast is our market. Avorria built a strategy that actually understands regional business development.",
      author: "Ronald Thompson",
      role: "Commercial Director",
      company: "Thompson Industries Southeast",
    },
    "paid-media": {
      quote: "Our Meta ads finally work. Avorria built proper audiences and creative that speaks to our actual customers.",
      author: "Vanessa Brown",
      role: "Head of Marketing",
      company: "Atlanta Professional Services",
    },
  },
};

// Fallback testimonial generator for locations not in the specific list
const generateFallbackTestimonial = (
  city: string,
  serviceSlug: string
): { quote: string; author: string; role: string; company: string } => {
  const templates: Record<string, { quote: string; author: string; role: string; company: string }> = {
    seo: {
      quote: `We'd tried various SEO approaches in ${city} with mixed results. Avorria brought structure and accountability – we now know exactly what organic search contributes to our pipeline.`,
      author: "Alex Thompson",
      role: "Managing Director",
      company: `${city} Business Solutions`,
    },
    "web-design": {
      quote: `Our old site wasn't converting. Avorria built something that looks premium and actually generates enquiries. Best marketing investment we've made in ${city}.`,
      author: "Sarah Mitchell",
      role: "Operations Director",
      company: `${city} Professional Services`,
    },
    "digital-marketing": {
      quote: `Having one team who owns the full marketing picture has simplified everything for our ${city} business. Results are up and the coordination headaches are gone.`,
      author: "David Chen",
      role: "Commercial Director",
      company: `${city} Growth Partners`,
    },
    "paid-media": {
      quote: `Our paid campaigns finally make sense. Avorria rebuilt everything around actual leads and now we can see clear ROI from our ${city} ad spend.`,
      author: "Emma Williams",
      role: "Head of Marketing",
      company: `${city} Tech Solutions`,
    },
  };

  return templates[serviceSlug] || templates.seo;
};

// Get testimonial for a specific location and service
const getLocationTestimonial = (
  locationSlug: string,
  serviceSlug: string,
  city: string
): { quote: string; author: string; role: string; company: string } => {
  const locationData = locationTestimonials[locationSlug];
  if (locationData && locationData[serviceSlug as keyof LocationTestimonial]) {
    return locationData[serviceSlug as keyof LocationTestimonial];
  }
  return generateFallbackTestimonial(city, serviceSlug);
};

// Service-specific content templates
interface ServiceTemplate {
  problemBullets: (city: string, region: string) => string[];
  solutionBullets: (city: string, region: string) => string[];
  keyMetrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  faqList: (city: string, region: string) => Array<{
    question: string;
    answer: string;
  }>;
  processSteps: Array<{
    title: string;
    description: string;
  }>;
  workingWithYou: (city: string, region: string) => string;
  pricingSnapshot: string;
}

const seoTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You've used SEO agencies before in ${city} and got monthly reports but no real change in enquiries.`,
    `You rank for your brand name but not for the searches that matter in ${city} and ${region}.`,
    `Your site gets traffic, but people don't fill in forms or pick up the phone.`,
    `You're spending on ads or directories because SEO has never really been sorted.`,
    `Nobody can show you a clear line from SEO to your pipeline.`,
  ],
  solutionBullets: (city, region) => [
    `Local and regional SEO strategy focused on the services and areas in ${region} that actually make you money.`,
    `Technical and on-page clean-up so Google understands what you do and who you do it for.`,
    `Service and location pages for ${city} built for conversion – clear offers, proof and CTAs.`,
    `Tracking wired into calls, forms and enquiries so you can see what came from where.`,
    `Simple dashboards showing organic leads and pipeline – not just 'visibility'.`,
  ],
  keyMetrics: [
    {
      value: "+63%",
      label: "Qualified Enquiries",
      description: "Increase in qualified enquiries in 3 months after fixing structure and key pages",
    },
    {
      value: "+82%",
      label: "Organic Traffic",
      description: "Non-branded organic traffic up over 9 months for a regional service firm",
    },
    {
      value: "Clear View",
      label: "Local Insights",
      description: "Clear view of which local searches actually drive business",
    },
  ],
  faqList: (city, region) => [
    {
      question: `Do we have to be based in ${city}?`,
      answer: `Not at all. We work with businesses across ${region} and the wider area. What matters is understanding your local market, not our proximity.`,
    },
    {
      question: "Can you work alongside our existing web developer?",
      answer: "Yes. We can provide technical recommendations for your developer to implement, or handle changes directly if you give us access.",
    },
    {
      question: `How long until we see results locally in ${city}?`,
      answer: "Typically 2-3 months for early movement on key terms, 4-6 months for meaningful impact on enquiries. We'll set realistic expectations upfront.",
    },
    {
      question: "Is this just about Google rankings?",
      answer: "Rankings are a means to an end. We focus on the searches that drive revenue, then track the connection from SEO to actual business results.",
    },
    {
      question: "Do you lock us into long contracts?",
      answer: "No. We recommend a 6-12 month runway for meaningful SEO work, but we don't hide behind punitive terms.",
    },
  ],
  processSteps: [
    {
      title: "Discovery & Audit",
      description: "We review your current SEO position, analyse competitors in your local market, and identify quick wins alongside longer-term opportunities.",
    },
    {
      title: "Strategy & Roadmap",
      description: "We build a prioritised plan focused on the searches and pages that will have the biggest commercial impact for your business.",
    },
    {
      title: "Implementation",
      description: "Technical fixes, content improvements, and new pages built to capture local demand. We handle the work or guide your team.",
    },
    {
      title: "Tracking & Reporting",
      description: "Proper tracking on calls, forms and enquiries, with simple dashboards showing what SEO is actually doing for your pipeline.",
    },
  ],
  workingWithYou: (city, region) =>
    `We work with businesses across ${city} and ${region} who are serious about growing through organic search. Whether you're a single-location business or expanding across the region, we bring the same discipline: clear strategy, proper tracking, and a focus on commercial outcomes rather than vanity metrics.`,
  pricingSnapshot:
    "SEO retainers typically start from £1,500/month for local SEO and go up to £5,000+/month for larger regional or national campaigns. We'll scope properly based on your situation and give you honest expectations.",
};

const webDesignTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `Your current website looks dated compared to competitors in ${city}.`,
    `Visitors browse but don't enquire – your site isn't converting.`,
    `The site is slow, awkward on mobile, or hard to update.`,
    `You've had agencies redesign before but it didn't move the needle on leads.`,
    `There's no clear tracking to show which pages or channels drive business.`,
  ],
  solutionBullets: (city, region) => [
    `Modern, fast websites designed to convert ${city} visitors into enquiries.`,
    `Mobile-first design that works beautifully on every device.`,
    `Clear conversion paths with prominent CTAs and easy contact options.`,
    `Built for SEO from day one – structure, speed and content that ranks.`,
    `Tracking wired in so you can see exactly what's driving business.`,
  ],
  keyMetrics: [
    {
      value: "+127%",
      label: "Conversion Rate",
      description: "Increase in website enquiries after redesign and CRO implementation",
    },
    {
      value: "2.1s",
      label: "Load Time",
      description: "Average page load time on new builds, down from 6+ seconds",
    },
    {
      value: "+45%",
      label: "Time on Site",
      description: "Visitors staying longer and engaging more with content",
    },
  ],
  faqList: (city, region) => [
    {
      question: "How long does a website project take?",
      answer: "A typical business website takes 6-10 weeks from kickoff to launch. Larger or more complex sites may take longer. We'll give you a clear timeline upfront.",
    },
    {
      question: "Do you work with existing brands and guidelines?",
      answer: "Yes. We can work within your existing brand or help refine it as part of the project. Either way, the result will be consistent and professional.",
    },
    {
      question: "Will we be able to update the site ourselves?",
      answer: "Absolutely. We build on modern platforms with intuitive editing. We'll train you and provide documentation so you're not dependent on us for every change.",
    },
    {
      question: `Can you help with ongoing SEO and marketing after launch?`,
      answer: "Yes. Many clients work with us on ongoing SEO, content and paid media after the initial build. We can discuss what makes sense for your goals.",
    },
    {
      question: "What's included in the price?",
      answer: "Design, development, copywriting support, basic SEO setup, and training. We'll scope properly so there are no surprises.",
    },
  ],
  processSteps: [
    {
      title: "Discovery & Planning",
      description: "We understand your business, goals and audience. Then map out the site structure, pages and features you actually need.",
    },
    {
      title: "Design",
      description: "Custom designs that match your brand and convert visitors. You'll see and approve everything before we build.",
    },
    {
      title: "Development",
      description: "Clean, fast code built for performance and SEO. Mobile-first and tested across devices and browsers.",
    },
    {
      title: "Launch & Handover",
      description: "We handle the launch, set up analytics and tracking, and train your team so you can manage the site confidently.",
    },
  ],
  workingWithYou: (city, region) =>
    `We design and build websites for businesses in ${city} and across ${region} who want their site to work as a proper sales tool. Not just something that looks nice, but a site that converts visitors into leads and gives you clear visibility on what's happening.`,
  pricingSnapshot:
    "Website projects typically range from £5,000 for a focused business site to £25,000+ for larger builds with custom functionality. We'll scope based on your needs and give you a fixed price upfront.",
};

const digitalMarketingTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You're spending on marketing but can't clearly connect it to revenue.`,
    `Multiple agencies, tools and channels but no coherent strategy.`,
    `SEO says one thing, ads say another – nobody owns the full picture.`,
    `Reports focus on vanity metrics instead of pipeline and sales.`,
    `You suspect you're wasting budget but can't prove where.`,
  ],
  solutionBullets: (city, region) => [
    `Integrated digital strategy across SEO, paid, content and web – one team, one plan.`,
    `Clear focus on the channels and tactics that drive results for ${city} businesses.`,
    `Proper tracking and attribution so you can see what's actually working.`,
    `Regular strategy reviews and adjustments based on real performance data.`,
    `One point of contact who understands your whole marketing picture.`,
  ],
  keyMetrics: [
    {
      value: "+94%",
      label: "Pipeline Growth",
      description: "Increase in qualified pipeline after consolidating and optimising channels",
    },
    {
      value: "-35%",
      label: "Cost Per Lead",
      description: "Reduction in average cost per lead through better channel mix",
    },
    {
      value: "Clear",
      label: "Attribution",
      description: "Finally know which channels drive revenue, not just clicks",
    },
  ],
  faqList: (city, region) => [
    {
      question: "Do you handle everything or just strategy?",
      answer: "We can do both. Some clients want full execution, others want strategic oversight while their team or other partners execute. We'll design an engagement that fits.",
    },
    {
      question: "How do you work with our existing marketing team?",
      answer: "Collaboratively. We can fill gaps, provide specialist capability, or act as a strategic layer. We're not here to replace your team, but to make them more effective.",
    },
    {
      question: `What industries do you specialise in?`,
      answer: "We work best with B2B service businesses, multi-location brands, and companies where leads and pipeline are the main measures of marketing success.",
    },
    {
      question: "How quickly can we expect to see results?",
      answer: "Paid channels can show results quickly (weeks). SEO and content take longer (months). We'll set realistic expectations and show progress along the way.",
    },
    {
      question: "What's the minimum commitment?",
      answer: "We recommend at least 6 months for meaningful impact, but we don't require long lock-in contracts. Results will speak for themselves.",
    },
  ],
  processSteps: [
    {
      title: "Audit & Discovery",
      description: "We review everything you're currently doing, identify what's working, what's wasted, and where the opportunities are.",
    },
    {
      title: "Strategy & Planning",
      description: "A clear roadmap prioritising the channels and tactics that will have the biggest impact on your specific goals.",
    },
    {
      title: "Execution & Optimisation",
      description: "We implement (or oversee implementation), then continuously test, measure and optimise based on performance data.",
    },
    {
      title: "Reporting & Review",
      description: "Regular reporting focused on business outcomes, with strategic reviews to adjust course as we learn what works.",
    },
  ],
  workingWithYou: (city, region) =>
    `We partner with businesses across ${city} and ${region} who want marketing that actually moves the needle. Not more activity for activity's sake, but a focused approach that connects spend to pipeline and revenue.`,
  pricingSnapshot:
    "Digital marketing retainers typically start from £3,000/month and scale based on scope and channels. We'll propose something that fits your budget and goals.",
};

const paidMediaTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You're spending on Google or Meta ads but can't clearly tie it to revenue.`,
    `Previous agencies focused on clicks and impressions, not leads and sales.`,
    `Landing pages don't convert – you're paying for traffic that goes nowhere.`,
    `Campaigns haven't been properly reviewed or optimised in months.`,
    `Attribution is a mess – you don't know what's really working.`,
  ],
  solutionBullets: (city, region) => [
    `Paid campaigns built around your commercial goals, not vanity metrics.`,
    `Targeting focused on ${city} and ${region} audiences most likely to convert.`,
    `Landing pages designed for conversion, not just traffic.`,
    `Proper tracking and attribution so you can see real ROI.`,
    `Continuous optimisation based on what's actually driving results.`,
  ],
  keyMetrics: [
    {
      value: "-42%",
      label: "Cost Per Lead",
      description: "Reduction in CPL after restructuring campaigns and improving targeting",
    },
    {
      value: "+78%",
      label: "Conversion Rate",
      description: "Increase in landing page conversion after CRO improvements",
    },
    {
      value: "3.2x",
      label: "ROAS",
      description: "Return on ad spend achieved for clients with proper tracking",
    },
  ],
  faqList: (city, region) => [
    {
      question: "Which platforms do you work with?",
      answer: "Primarily Google Ads, Meta (Facebook/Instagram), and LinkedIn. We can also help with Microsoft Ads, TikTok and other platforms where it makes sense for your audience.",
    },
    {
      question: "What's the minimum ad spend you work with?",
      answer: "We typically work with clients spending £2,000/month or more on ads. Below that, the economics often don't justify agency management.",
    },
    {
      question: "Do you manage landing pages too?",
      answer: "Yes. Ads are only half the story – we can build or optimise landing pages to improve conversion and make your spend work harder.",
    },
    {
      question: "How do you handle attribution?",
      answer: "We set up proper conversion tracking, integrate with your CRM where possible, and give you a realistic view of what's driving results across the funnel.",
    },
    {
      question: "What reporting do we get?",
      answer: "Monthly reporting focused on leads, cost per lead, and revenue impact – not just impressions and clicks. Plus a strategy call to review performance and next steps.",
    },
  ],
  processSteps: [
    {
      title: "Audit & Discovery",
      description: "We review your current campaigns, tracking setup, and conversion data. Then identify quick wins and longer-term opportunities.",
    },
    {
      title: "Campaign Setup",
      description: "New or restructured campaigns built around your commercial goals, with proper targeting, creative and tracking.",
    },
    {
      title: "Optimisation",
      description: "Continuous testing and refinement based on performance data. We focus on what drives results, not activity.",
    },
    {
      title: "Scaling",
      description: "Once we find what works, we scale efficiently while maintaining efficiency and ROI.",
    },
  ],
  workingWithYou: (city, region) =>
    `We manage paid media for businesses in ${city} and across ${region} who want real results from their ad spend. Not vanity metrics, but qualified leads and measurable revenue impact.`,
  pricingSnapshot:
    "Paid media management typically starts from £1,500/month plus ad spend. Pricing scales with spend and complexity. We'll scope based on your situation and goals.",
};

const serviceTemplates: Record<string, ServiceTemplate> = {
  seo: seoTemplate,
  "web-design": webDesignTemplate,
  "digital-marketing": digitalMarketingTemplate,
  "paid-media": paidMediaTemplate,
};

// Generate a landing page for a service-location combination
function generateServiceLocationPage(
  service: Service,
  location: Location
): LandingPage {
  const template = serviceTemplates[service.slug];
  if (!template) {
    throw new Error(`No template for service: ${service.slug}`);
  }

  const isUSA = location.countryCode === "US";
  const region = location.region || location.country;

  // Service-specific headline patterns
  const headlinePatterns: Record<string, string> = {
    seo: `SEO in ${location.city} that actually brings in leads, not just rankings.`,
    "web-design": `Web design in ${location.city} that makes your site behave like a sales asset.`,
    "digital-marketing": `Digital marketing in ${location.city} for teams who want pipeline, not noise.`,
    "paid-media": `Paid media in ${location.city} that delivers ROI, not just impressions.`,
  };

  // Service-specific subheadlines
  const subheadlinePatterns: Record<string, string> = {
    seo: `Avorria is a performance-focused SEO partner for ${location.city} businesses. We sort your site, content and tracking so you can see – in hard numbers – what organic search is doing for enquiries and revenue.`,
    "web-design": `We design and build websites for ${location.city} businesses that look sharp and convert visitors into enquiries, bookings and orders – with tracking to prove it.`,
    "digital-marketing": `Integrated digital marketing for ${location.city} businesses who want growth, not noise. SEO, paid media, web and content under one roof with proper tracking.`,
    "paid-media": `We run paid campaigns for ${location.city} businesses that focus on leads and revenue, not clicks and impressions. Proper tracking, real results.`,
  };

  // Meta title and description patterns
  const metaTitlePatterns: Record<string, string> = {
    seo: `SEO Agency ${location.city} | Performance-Focused SEO | Avorria`,
    "web-design": `Web Design ${location.city} | Conversion-Focused Websites | Avorria`,
    "digital-marketing": `Digital Marketing Agency ${location.city} | Full-Funnel Growth | Avorria`,
    "paid-media": `Paid Media Agency ${location.city} | Google & Meta Ads | Avorria`,
  };

  const metaDescPatterns: Record<string, string> = {
    seo: `${location.city} SEO agency that brings in leads, not just rankings. Technical SEO, content strategy and tracking that shows real business impact.`,
    "web-design": `${location.city} web design that makes your site behave like a sales asset. Sharp design that converts visitors into enquiries and orders.`,
    "digital-marketing": `${location.city} digital marketing agency for teams who want pipeline, not noise. SEO, paid media, web and content strategy with clear tracking.`,
    "paid-media": `${location.city} paid media agency that delivers ROI. Google Ads, Meta Ads and LinkedIn campaigns built around leads and revenue.`,
  };

  const targetKeywordPatterns: Record<string, string> = {
    seo: `seo agency ${location.city.toLowerCase()}`,
    "web-design": `web design ${location.city.toLowerCase()}`,
    "digital-marketing": `digital marketing agency ${location.city.toLowerCase()}`,
    "paid-media": `paid media agency ${location.city.toLowerCase()}`,
  };

  const slug = `${service.slug}-${location.slug}`;

  return {
    id: slug,
    title: `${service.name} in ${location.city}`,
    slug,
    type: "service-location",
    service,
    location,
    heroHeadline: headlinePatterns[service.slug],
    heroSubheadline: subheadlinePatterns[service.slug],
    primaryCTA: service.primaryCTA,
    secondaryCTA: service.secondaryCTA,
    problemBullets: template.problemBullets(location.city, region),
    solutionBullets: template.solutionBullets(location.city, region),
    keyMetrics: template.keyMetrics,
    testimonialSnippet: getLocationTestimonial(location.slug, service.slug, location.city),
    faqList: template.faqList(location.city, region),
    processSteps: template.processSteps,
    workingWithYou: template.workingWithYou(location.city, region),
    pricingSnapshot: template.pricingSnapshot,
    targetKeyword: targetKeywordPatterns[service.slug],
    metaTitle: metaTitlePatterns[service.slug],
    metaDescription: metaDescPatterns[service.slug],
    relatedCaseStudies: [],
    relatedArticles: [],
  };
}

// Target services for location pages
const targetServiceSlugs = ["seo", "web-design", "digital-marketing", "paid-media"];

// Generate all service-location landing pages
export const serviceLocationLandingPages: LandingPage[] = [];

// Generate pages for each location and service combination
for (const location of locations) {
  for (const serviceSlug of targetServiceSlugs) {
    const service = getServiceBySlug(serviceSlug);
    if (service) {
      serviceLocationLandingPages.push(
        generateServiceLocationPage(service, location)
      );
    }
  }
}

// Helper to get a service-location page by slug
export const getServiceLocationPageBySlug = (
  slug: string
): LandingPage | undefined => {
  return serviceLocationLandingPages.find((lp) => lp.slug === slug);
};

// Helper to get all pages for a location
export const getPagesByLocation = (locationSlug: string): LandingPage[] => {
  return serviceLocationLandingPages.filter(
    (lp) => lp.location?.slug === locationSlug
  );
};

// Helper to get all pages for a service
export const getPagesByService = (serviceSlug: string): LandingPage[] => {
  return serviceLocationLandingPages.filter(
    (lp) => lp.service.slug === serviceSlug
  );
};
