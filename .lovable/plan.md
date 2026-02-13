

## Fix White-on-White Secondary Buttons Across the Entire Site

### Root Cause
The `outline` button variant in the design system has `bg-background` (white) baked in. When pages on dark sections add `text-white` and `border-white/20` overrides, the white background still shows through, making the text invisible until hover.

### Solution — Two-Part Fix

#### Part 1: Update the `outline-dark` Button Variant (Design System Level)

Update `src/components/ui/button.tsx` to make the `outline-dark` variant the proper frosted glass style with beam hover:

- **Resting state**: `bg-white/[0.06] border-white/20 text-white backdrop-blur-sm` — dark, frosted, semi-transparent with visible text
- **Hover state**: `hover:bg-white/10 hover:border-accent/50 hover:scale-[0.98]` — gentle shrink + accent border glow
- This eliminates the need for every page to manually override classes

#### Part 2: Update All Affected Buttons Across the Site

Switch every `variant="outline"` button on a dark background from messy class overrides to the clean `variant="outline-dark"`. Remove the redundant `border-white`, `text-white`, `hover:bg-white` class overrides since the variant handles it all.

**Files and locations to update:**

| File | Instances | Button Text |
|------|-----------|-------------|
| `src/pages/Services.tsx` | 4 | "Get Free Audit", 3x "Where Should You Start" cards, "Book a strategy call" |
| `src/pages/SEOServices.tsx` | 6 | "Discuss your industry", "View case studies", 3x location cards, "Book an SEO strategy call" |
| `src/pages/WebDesign.tsx` | 2 | "Request a website teardown", "Talk about a rebuild" |
| `src/pages/Analytics.tsx` | 1 | "View all services" |
| `src/pages/SocialPersonalBrand.tsx` | 1 | "View all services" |
| `src/pages/ContentEmail.tsx` | 1 | "View all services" |
| `src/pages/CaseStudies.tsx` | 1 | "Try the Studio" |
| `src/components/ContentBand.tsx` | 1 | Secondary CTA (reusable component) |
| `src/components/case-studies/CaseCTACluster.tsx` | 1 | "Download Case Study PDF" |

**Note:** `src/pages/Home.tsx` already has `bg-white/10` in its classes so it works — but we'll clean it up to use the variant too. `src/pages/Reporting.tsx` was already fixed in a previous session with `bg-white/[0.06]`.

### What Each Button Will Look Like

- **Resting**: Dark frosted glass background, white text, subtle white/pink border — clearly readable
- **Hover**: Gentle 2% scale-down (shrink), border shifts to accent pink, slightly brighter background

### Files Modified
- `src/components/ui/button.tsx` — update `outline-dark` variant styling
- `src/pages/Services.tsx` — 4 buttons
- `src/pages/SEOServices.tsx` — 6 buttons
- `src/pages/WebDesign.tsx` — 2 buttons
- `src/pages/Analytics.tsx` — 1 button
- `src/pages/SocialPersonalBrand.tsx` — 1 button
- `src/pages/ContentEmail.tsx` — 1 button
- `src/pages/CaseStudies.tsx` — 1 button
- `src/pages/Home.tsx` — 1 button
- `src/components/ContentBand.tsx` — 1 button
- `src/components/case-studies/CaseCTACluster.tsx` — 1 button
