

## Enhance SEO Glossary Page — Tasteful Visual Upgrade

The glossary is an information-dense page, so this upgrade keeps things refined rather than showy. The goal is subtle colour, gentle animation, and better visual hierarchy — not a full cinematic experience.

### Changes (Single File)

**File: `src/pages/SEOGlossary.tsx`**

#### Hero Section
- Add `GradientMesh` background with low opacity for a subtle living gradient behind the hero text
- Use `ScrollReveal` on the heading and subtext for a gentle fade-up entrance
- Add a small accent badge above the heading ("A-Z Reference") matching the style used on other enhanced pages

#### Alphabet Filter
- Colour the active letter button with the accent style (matching the Resources page filter pattern)
- Add a subtle scale transition on hover for the letter buttons

#### Term Cards
- Add a coloured left border per category (SEO = emerald, Analytics = purple, Conversion = blue, Paid Media = orange, Sales & Marketing = pink) — same pattern as the Resources page
- Add category badge on each card using `categoryBadgeColors`
- Add hover lift animation (`hover:-translate-y-0.5`, `hover:shadow-lg`) with smooth transition
- Wrap the terms list in `ScrollRevealGrid` with staggered fade-up so cards animate in as you scroll
- Style the "Why it matters" box with a subtle gradient background instead of flat `bg-secondary/30`
- Style "See also" links as proper accent-coloured text links

#### Search Bar
- Add a subtle background card around the search input for better visual weight

#### CTA Section
- Add a gradient background treatment matching other pages
- Use accent-styled primary button

#### General
- Import and use `ScrollReveal`, `ScrollRevealGrid` from existing animation components
- Import `GradientMesh` for the hero
- Import `Badge` for category labels on cards
- No new dependencies or files needed

### Technical Detail

This is a single-file edit to `src/pages/SEOGlossary.tsx`. All components being used (`GradientMesh`, `ScrollReveal`, `ScrollRevealGrid`, `Badge`) already exist in the codebase. The category colour map follows the exact same pattern established in the Resources page for consistency across the site.

