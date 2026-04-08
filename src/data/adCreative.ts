import Link from "next/link";
/**
 * Ad Creative Bank for Avorria Campaigns
 * 
 * Use these hooks, headlines and primary text for:
 * - Meta (Facebook/Instagram) ads
 * - LinkedIn ads
 * - Google Display/Responsive ads
 * 
 * Adapt and test variations as needed.
 */

export const adCreative = {
  // SEO & FREE AUDIT ADS
  seoAudit: {
    hookAngle: "You've got traffic, but not enough pipeline",
    headlines: [
      "Free SEO & website audit Ã¢â‚¬â€œ straight talk only",
      "Your SEO report says 'up' Ã¢â‚¬â€œ your pipeline doesn't",
      "If SEO doesn't touch revenue, why bother?"
    ],
    primaryText: [
      {
        variant: 1,
        text: `You don't need another 40-page SEO report.
You need someone to look at your site, your structure and your tracking, then tell you Ã¢â‚¬â€œ in plain English Ã¢â‚¬â€œ what's actually holding you back.

We'll do that, for free. No filler, no junior "specialist", no 6-month pitch.

Ã°Å¸â€˜â€° Request a free SEO & website audit.`
      },
      {
        variant: 2,
        text: `Paying for SEO but not feeling it in your pipeline?

We run a blunt review of your site, SEO and tracking and send you a prioritised list of fixes for the next 90 days.

Keep your agency and push them harder, or ask us to own it. Either way, you get clarity.

Ã°Å¸â€˜â€° Get your audit.`
      },
      {
        variant: 3,
        text: `If your SEO report talks a lot about "visibility" and not much about leads and pipeline, that's a red flag.

We'll review your setup, translate the noise and show you where the money is actually leaking.

Ã°Å¸â€˜â€° Request your free audit.`
      }
    ],
    cta: [
      "Request your free audit",
      "Get your audit",
      "Request a free SEO audit"
    ],
    targetAudience: "Growing service businesses, B2B teams, multi-site brands already investing in SEO",
    platforms: ["Meta", "LinkedIn", "Google Display"]
  },

  // WEB/FUNNEL REBUILD ADS
  webRebuild: {
    hookAngle: "Pretty site, weak pipeline",
    headlines: [
      "Your website looks fine. That's the problem.",
      "Websites we'd fire (is yours one?)",
      "Make your site behave like a sales asset"
    ],
    primaryText: [
      {
        variant: 1,
        text: `If your site looks good but your enquiries are flat, you don't have a design problem Ã¢â‚¬â€œ you have a conversion problem.

We rebuild homepages, service pages and funnels so they look sharp and sell hard.

Same traffic, better structure, more qualified leads.

Ã°Å¸â€˜â€° See the 'Websites We'd Fire' gallery.`
      },
      {
        variant: 2,
        text: `Hero slider from 2012. Vague strapline. No clear CTA.
If that sounds like your homepage, it's taxing your pipeline every day.

We'll rip it apart (nicely), redesign it for conversions and wire it into your tracking so you can see the lift.

Ã°Å¸â€˜â€° Request a website & funnel teardown.`
      },
      {
        variant: 3,
        text: `Marketing spend without a conversion-optimised site is like pouring water into a leaky bucket.

We fix the bucket. Then we scale the spend.

Ã°Å¸â€˜â€° Talk to Avorria about a rebuild.`
      }
    ],
    cta: [
      "See Websites We'd Fire",
      "Request a website teardown",
      "Talk about a rebuild"
    ],
    targetAudience: "Service businesses with existing websites, teams running paid ads but seeing poor conversion",
    platforms: ["Meta", "LinkedIn", "Google Display"]
  },

  // AGENCY-SWITCH / TEARDOWN ADS
  agencySwitch: {
    hookAngle: "You suspect your agency is stealing a living",
    headlines: [
      "Upload your agency's report. We'll tell you the truth.",
      "Is your marketing agency earning its keep?",
      "Your agency report, decoded."
    ],
    primaryText: [
      {
        variant: 1,
        text: `If your agency sends you 40 slides of charts and you still don't know if the retainer is worth it, something's off.

Upload their latest report. We'll tell you what's solid, what's fluff and whether the work matches the invoice.

Ã°Å¸â€˜â€° Get an honest teardown.`
      },
      {
        variant: 2,
        text: `You don't need another agency pitch.
You need someone to read your current report like a CFO and a CMO, then tell you if you're getting a return.

We do exactly that. Quietly, confidentially, and with zero obligation.

Ã°Å¸â€˜â€° Submit your agency report for teardown.`
      },
      {
        variant: 3,
        text: `Most teams stay with underperforming agencies 6Ã¢â‚¬â€œ12 months longer than they should.

We'll accelerate that decision with a blunt report teardown and 3Ã¢â‚¬â€œ5 clear recommendations.

Ã°Å¸â€˜â€° Start the teardown.`
      }
    ],
    cta: [
      "Get an honest teardown",
      "Submit your report",
      "Start the teardown"
    ],
    targetAudience: "Businesses currently working with agencies, marketing directors with budget accountability",
    platforms: ["LinkedIn", "Meta (decision-maker targeting)"],
    notes: "Use more cautious targeting - don't want to alienate existing clients. LinkedIn likely performs best for this angle."
  }
};

// CAMPAIGN STRUCTURE RECOMMENDATIONS
export const campaignNotes = {
  seoAudit: {
    budgetAllocation: "40% of total ad budget - highest volume opportunity",
    platforms: {
      meta: "Broad targeting, conversion objective, optimize for form submissions",
      linkedin: "Job title targeting (Marketing Director, CMO, Founder), lead gen forms",
      google: "Display retargeting to site visitors who haven't converted"
    },
    testingPriority: [
      "Test 'traffic vs pipeline' angle vs 'audit' angle",
      "Short-form primary text vs longer educational text",
      "Video creative showing actual audit examples"
    ]
  },
  webRebuild: {
    budgetAllocation: "35% of total ad budget - higher value, lower volume",
    platforms: {
      meta: "Retargeting to audit requesters + lookalike audiences",
      linkedin: "Retargeting + decision-maker job titles",
      google: "In-market audiences for web design + business services"
    },
    testingPriority: [
      "Before/after visuals in creative",
      "Websites We'd Fire landing page vs direct contact",
      "Price anchoring in copy vs no mention"
    ]
  },
  agencySwitch: {
    budgetAllocation: "25% of total ad budget - highest intent, smallest audience",
    platforms: {
      linkedin: "Primary platform - tightest targeting",
      meta: "Retargeting only - too aggressive for cold"
    },
    testingPriority: [
      "Aggressive tone vs empathetic tone",
      "Anonymous testimonials in creative",
      "Direct upload CTA vs softer 'learn more' approach"
    ],
    warnings: [
      "Be careful not to position as predatory",
      "Emphasize confidentiality and professionalism",
      "Monitor frequency - don't oversaturate this audience"
    ]
  }
};

