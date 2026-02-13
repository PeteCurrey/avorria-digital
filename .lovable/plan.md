

## Redesign the About Page — Established, Premium Agency Identity

### Problem
The current About page mirrors the homepage too closely — same video timelapse background, same parallax race car CTA, same beam-border card patterns, and identical visual effects. The "Founder / Lead" section is generic placeholder content. The page feels fragmented with too many alternating background treatments (dark/light/video/image/dark/image).

### Design Direction
Strip back the visual noise. A premium agency About page should feel **calm, confident and authoritative** — not flashy. Use a cleaner visual rhythm with fewer background changes, richer written content, and a proper story arc.

### Changes (Single File: `src/pages/About.tsx`)

#### 1. Simplified Hero (Keep Image, Remove Effects)
- Keep the `heroAboutTeam` image background — it's appropriate for About
- **Remove** `GradientMesh` and `FloatingElements` overlays (these are homepage signatures)
- Cleaner gradient overlay: simple left-to-right dark fade
- Refine the copy to be more story-driven: "We started Avorria because we got tired of watching good businesses waste money on bad marketing."
- Keep the two CTAs but soften the second to "Our approach" (anchor link down-page)

#### 2. Our Story Section (NEW — Replace Video Background Beliefs)
- **Remove** the city timelapse `ParallaxBackground` (that's a homepage element)
- Replace with a clean, light-background narrative section
- Two-column layout: left side has a short origin story (3-4 paragraphs about why Avorria exists, what frustrated the founders about the agency world, what they set out to fix), right side has a subtle accent-bordered pull quote
- Uses standard `bg-background` — no video, no parallax
- This gives the page its own identity and actual substance

#### 3. What We Believe (Refined, No Video)
- Keep the four principles but present them on a clean dark section (`bg-[hsl(220,25%,8%)]`) without the video background
- Simpler card styling: clean border, no beam animation, subtle hover lift only
- This differentiates from the homepage's beam-heavy card style

#### 4. Stats Band (Keep, Minor Refinement)
- Keep the stats section but remove beam-border hover effects
- Simpler presentation: just the numbers with clean dividers between them, inline on one row
- More understated, letting the numbers speak

#### 5. Who We Are — Team / Leadership (Replace Generic Section)
- **Remove** the placeholder "Avorria Leadership / Founder / Operator" card with its gradient "A" avatar
- Replace with a proper team section showing 3-4 named roles with brief bios:
  - Founder and Strategy Lead
  - Head of SEO and Technical
  - Head of Paid Media and CRO  
  - Head of Design and Development
- Each presented as a clean card with initials avatar, name, title, and 2-3 sentence bio
- No TiltCard effect — clean, professional grid layout
- Section title: "The team behind the work."

#### 6. Who We Work Best With (Keep, Light Polish)
- This section is good and unique to the About page — keep it
- Minor: soften the border colours slightly for a more premium feel

#### 7. How We Work (Simplify)
- **Remove** the `heroCityscape` parallax background (another homepage-style treatment)
- Present the 3-step process on a clean dark background
- Horizontal timeline layout with connecting lines between steps on desktop
- Cleaner, more editorial presentation

#### 8. CTA Section (Replace Race Car)
- **Remove** the `bgRaceCar` parallax — this is directly from the homepage
- Replace with a clean, gradient-background CTA section (subtle radial gradient, no image)
- Refined copy: "Let's talk about what's not working." with two buttons
- Understated and confident rather than flashy

### What Gets Removed
- `GradientMesh` component (homepage signature)
- `FloatingElements` component (homepage signature)
- `ParallaxBackground` with video (homepage signature)
- `ParallaxBackground` with cityscape image
- `ParallaxBackground` with race car image
- `TiltCard` wrapping the leadership card
- Beam-border hover animations on cards
- All three parallax/video background sections

### What Gets Added
- Origin story narrative section (new content, two-column layout)
- Proper team grid with 4 named roles and bios
- Horizontal timeline for the process steps
- Clean gradient CTA without background imagery

### Visual Rhythm (Top to Bottom)
1. **Hero** — Image background (dark), full-width
2. **Our Story** — Light background, editorial two-column
3. **What We Believe** — Dark background, clean cards
4. **Stats** — Darker band, minimal styling
5. **The Team** — Light background, professional grid
6. **Best Fit / Not a Fit** — Light background (kept)
7. **How We Work** — Dark background, timeline
8. **CTA** — Gradient background, no image

This creates a calmer dark/light/dark/dark/light/light/dark/gradient flow instead of the current chaotic mix of videos, images and parallax layers.

### Technical Notes
- Single file edit: `src/pages/About.tsx`
- Removes imports for `GradientMesh`, `FloatingElements`, `ParallaxBackground`, `TiltCard`, `cityTimelapseVideo`, `heroCityscape`, `bgRaceCar`
- Keeps `ScrollReveal`, `ScrollRevealGrid`, `CountUp`, `SectionReveal` for subtle animation
- Keeps `heroAboutTeam` for the hero image
- No new dependencies or components needed

