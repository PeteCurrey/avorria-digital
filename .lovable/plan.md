

## Plan: Unique Hero Videos per Service Page + SEO & Quality Review

### Problem
All four service pages (`/services`, `/services/seo`, `/services/paid-media`, `/web-design`) use the identical `city-timelapse.mp4` video hero. This creates a repetitive, templated feel that undermines the premium agency positioning.

### 1. Source Unique Hero Videos

Since we can't generate videos, we need to use **royalty-free stock videos** from services like Pexels or Pixabay. Each page gets a thematically distinct video + matching poster image:

| Page | Video Theme | Poster Fallback |
|------|------------|----------------|
| `/services` | City timelapse (keep current) | `hero-services-digital.jpg` (keep current) |
| `/services/seo` | Data/analytics dashboard, search console visuals | `bg-data-analytics.jpg` (already in assets) |
| `/services/paid-media` | Fast-paced ad metrics, digital advertising screens | `service-paid-media.jpg` (keep current) |
| `/web-design` | Design/code workflow, creative studio | `service-web-design.jpg` (keep current) |

**However** — we cannot download and bundle stock videos without the user providing them. The practical approach is:

- Use **different existing assets** for variety where possible (e.g. `studio-cityscape.mp4` for web design)
- For SEO and Paid Media, show the **poster image on mobile** and keep video on desktop only — this already differentiates
- Ask the user to provide/approve specific video files for each page

### 2. Mobile Optimisation — Image-Only on Mobile

For all four pages, implement a responsive hero that:
- Shows **video on desktop** (md+ breakpoints)
- Shows **static poster image on mobile** (saves bandwidth, faster LCP)
- Uses a `<picture>` element or conditional rendering based on `useIsMobile()`

### 3. SEO Consistency Fixes

The SEO page (`/services/seo`) uses raw `<Helmet>` tags instead of the standardised `<SEOHead>` component. Fix this for consistency.

### 4. Implementation Details

**Files to modify:**
- `src/pages/Services.tsx` — keep current video, add mobile image fallback
- `src/pages/SEOServices.tsx` — swap to `studio-cityscape.mp4` or unique video, replace raw Helmet with `<SEOHead>`, add mobile image fallback
- `src/pages/PaidMedia.tsx` — swap video, add mobile image fallback  
- `src/pages/WebDesign.tsx` — swap to `studio-cityscape.mp4`, add mobile image fallback

**Hero pattern (applied to each page):**
```tsx
const isMobile = useIsMobile();

// In hero section:
{!isMobile ? (
  <video autoPlay muted loop playsInline poster={posterImage}>
    <source src={heroVideo} type="video/mp4" />
  </video>
) : (
  <img src={posterImage} alt="" className="w-full h-full object-cover" />
)}
```

**Available unique videos in project:**
- `city-timelapse.mp4` → keep for `/services` (general overview)
- `studio-cityscape.mp4` → use for `/web-design` (design/studio context)

For SEO and Paid Media, we only have two video files. Options:
1. Reuse the two videos across 4 pages (still some repetition)
2. Ask the user to provide 2 more short looping videos
3. Use static images with subtle CSS animation (ken-burns parallax) for the pages without unique video

### 5. Content & Technical SEO Audit Items

Across all four pages, verify:
- `<SEOHead>` component used consistently (not raw Helmet)
- Unique, keyword-rich meta titles (~60 chars) and descriptions (~155 chars)
- `ServiceSchema`, `FAQSchema`, `BreadcrumbSchema` all present
- Canonical URLs set correctly
- Internal links between service pages (cross-linking)
- H1 tags are unique and keyword-targeted per page

### Decision Needed

Since we only have 2 video files (`city-timelapse.mp4` and `studio-cityscape.mp4`), I need your input on how to handle the other two pages.

