

## Enhance the Why Avorria Page — Premium Visual Upgrade

### Content Fixes
- **Remove "fluff"** everywhere — replace with "filler" or "noise" depending on context
  - Hero H1: "Why teams who are done with the noise pick Avorria"
  - Meta description: updated accordingly
  - "How We Work" communication card: "30 minutes, no filler"
- Refine copy throughout for authenticity and SEO value

### Visual Enhancements (Single File: `src/pages/WhyAvorria.tsx`)

#### 1. Hero — Cinematic Dark Treatment
- Replace the flat gradient background with a dark hero section matching the About page pattern (`bg-[hsl(220,25%,8%)]`)
- Add radial gradient accent glow for depth
- Use `motion` animated entrance (staggered fade-up) for badge, heading, subtext and CTAs — same pattern as About hero
- Add a small uppercase tracking badge above the H1 ("Why Avorria")
- Larger, more spacious layout with `min-h-[70vh]` and centred alignment
- Update CTAs: accent gradient primary button + glass-effect secondary button

#### 2. Operating Principles — Dark Cards on Light
- Keep the 2x2 grid but elevate the cards with gradient top border accent bars (matching Resources pillar cards pattern)
- Add backdrop-blur and subtle `bg-card/80` treatment
- Refine icon containers with slightly larger rounded backgrounds
- Keep the `OpinionatedQuote` component — it works well here
- Wrap section heading in `SectionReveal` for scroll transition

#### 3. How We Work — Horizontal Timeline
- Replace the stacked cards with a horizontal numbered timeline (matching the About page's "How We Work" pattern)
- Three columns on desktop, stacked on mobile
- Connecting line between steps with accent-coloured step numbers
- Dark background section (`bg-[hsl(220,25%,8%)]`) for contrast rhythm
- Use `SectionReveal` with `wipe-up` type

#### 4. Comparison Grid — Embed Inline
- Replace the plain "Dig into the detail" link cards with the `ServiceComparisonGrid` component (Avorria vs. Typical Agency table)
- This adds real substance and visual interest instead of just link buttons
- Keep the link buttons below the grid as secondary navigation

#### 5. Services and Case Studies — Refined Cards
- Elevate the two-column cards with gradient top accent bars, hover lift, and backdrop-blur
- Add subtle icons (Briefcase for Services, BarChart3 for Case Studies) above each card title
- Wrap in `SectionReveal` for scroll entrance

#### 6. Final CTA — Gradient Background Treatment
- Replace flat `bg-background` with a radial gradient dark section matching the About page CTA
- Glass-effect secondary button (same fix applied on About page)
- Stronger, more confident closing copy

#### 7. SEO Enhancements
- Add full Open Graph and Twitter Card meta tags
- Add canonical URL
- Add Organization + WebPage structured data (JSON-LD)
- Improve meta description with keyword-rich copy

### Visual Rhythm (Top to Bottom)
1. **Hero** — Dark with radial accent glow, centred
2. **Operating Principles** — Light background, elevated cards with gradient bars
3. **Opinionated Quote** — Gradient banner (existing)
4. **How We Work** — Dark background, horizontal timeline
5. **Comparison Grid** — Light background, data table
6. **Services / Case Studies** — Light/secondary background, refined cards
7. **CTA** — Dark gradient, glass buttons

### Technical Notes
- Single file edit: `src/pages/WhyAvorria.tsx`
- New imports: `motion` from framer-motion, `SectionReveal`, `ServiceComparisonGrid`, additional Lucide icons (`Briefcase`, `BarChart3`, `Check`, `X`)
- Removes: `LogoWall` import (unused on page)
- No new dependencies or files needed
