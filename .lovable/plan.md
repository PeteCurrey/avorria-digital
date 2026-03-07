

## Services Page Enhancement Plan

### Current State
The page has solid content structure (hero, intro, services grid, process, stats, deliverables, web design feature, FAQ, CTA) but feels flat and repetitive visually. Every section uses the same pattern: heading + subtitle + grid of cards. There's no visual rhythm, no texture variation, and no moments that surprise or delight.

### Enhancement Strategy

The goal is to create visual drama and rhythm while keeping the content SEO-rich. We'll add depth through layered scroll effects, break the grid monotony, and introduce premium interactive touches that match the Home page's quality.

---

### Changes

#### 1. Hero: Add video background with fallback
Replace the static `heroServicesDigital` parallax image with the existing `city-timelapse.mp4` video (already used on Home). The video plays muted/looped behind the overlay, with the static image as a poster/fallback. Adds immediate cinematic impact.

#### 2. Logo Wall social proof strip
Add the existing `LogoWall` component (already built, pulls from DB) directly below the hero, before the intro section. A simple "Trusted by" strip that breaks the hero-to-content transition and adds credibility immediately.

#### 3. Services Grid: Upgrade to staggered masonry-style layout
Change from 2-column uniform grid to a staggered layout where alternating cards are slightly larger or have image accents pulled from the service page hero images (already imported: `serviceSeo`, `servicePaidMedia`, etc.). Each card gets a subtle background image with a heavy overlay, making them feel like miniature hero sections rather than flat cards.

#### 4. Comparison Grid section
Re-add the `ServiceComparisonGrid` component (already built, currently unused) between the deliverables and web design sections. This is a strong conversion piece that differentiates Avorria and is currently wasted.

#### 5. Process section: Horizontal scroll on desktop
Wrap the 4 process steps in the existing `HorizontalScroll` component on desktop, creating a scroll-jacking effect where the user scrolls vertically but the cards move horizontally. Falls back to vertical stack on mobile.

#### 6. Sticky image parallax for Web Design section
Replace the `SectionBand background="mesh"` wrapper with `StickyImageSection` using `serviceWebDesign` as the background, so the case study image sits over a pinned parallax photo background instead of a flat mesh gradient.

#### 7. Testimonials section
Add a testimonials strip (using `useTestimonialsPublic()` hook, already exists) between the comparison grid and FAQ. Pull 2-3 client quotes and display as large, elegant pull-quotes with client name and company.

#### 8. Scroll-spy vertical dot navigation
Add the existing `SectionNav` component with `useScrollSpy` (same pattern as Home page) to provide a sticky vertical dot nav on the right side, letting users jump between sections.

#### 9. Visual polish
- Add `ScrollReveal` wrappers to sections that currently use inline `motion.div` for consistency
- Add subtle `FloatingElements` behind the intro section for depth
- Refine spacing: increase padding between major sections for breathing room

---

### Section Flow (top to bottom)
1. **Hero** -- video background, cinematic overlay
2. **Logo Wall** -- trusted-by social proof strip
3. **Introduction** -- two-column explainer (existing, unchanged)
4. **Services Grid** -- staggered cards with service imagery
5. **Opinionated Quote** (existing)
6. **Process** -- horizontal scroll on desktop
7. **Stats Explosion** (existing)
8. **Deliverables** (existing)
9. **Comparison Grid** -- Avorria vs typical agency table
10. **Web Design Feature** -- sticky image parallax
11. **Testimonials** -- client quotes
12. **FAQ** (existing)
13. **CTA** (existing)
14. **SectionNav** -- floating dot nav throughout

### Files Modified
- `src/pages/Services.tsx` -- all changes in this single file

### No new files or dependencies needed
All components (`LogoWall`, `SectionNav`, `HorizontalScroll`, `StickyImageSection`, `ServiceComparisonGrid`, `useScrollSpy`, `useTestimonialsPublic`, `FloatingElements`) already exist in the codebase.

