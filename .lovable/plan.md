

# Phase 2 Implementation Plan: "Websites We'd Fire" Page Enhancements

## Overview

This plan implements the Phase 2 enhancements outlined in the approved plan, focusing on:
1. **AI-Generated Mock-Up Images** with proper English text
2. **8 New UX Features** to maximize engagement and conversions

---

## Part 1: AI-Generated Mock-Up Images

### Current State
The page currently uses 5 static example images:
- `bad-hero-slider.jpg`
- `bad-generalist-site.jpg`
- `bad-no-cta.jpg`
- `bad-wall-of-text.jpg`
- `good-hero-focused.jpg`

These images may contain placeholder or lorem ipsum text that needs replacing with realistic English content.

### Solution: Edge Function for Image Generation

Create a new edge function that generates high-fidelity website mock-ups using the Lovable AI gateway with specific prompts for each archetype.

**New Edge Function**: `supabase/functions/generate-mockup-images/index.ts`

This function will:
1. Accept an archetype ID parameter
2. Generate a professional website screenshot mock-up using detailed prompts
3. Upload the result to Supabase storage (`case-study-images` bucket)
4. Return the public URL for use in the frontend

**Image Prompts:**

| Archetype | Prompt Description |
|-----------|-------------------|
| Hero Slider | Browser window showing a website with rotating carousel, multiple "WELCOME TO OUR COMPANY" banners, "Learn More" buttons, generic handshake stock photo, cluttered navigation with 10+ menu items |
| Generalist Site | Browser window showing agency website listing 15+ services: SEO, Web Design, Social Media, Branding, Print, Video, Apps, Consulting. Tagline "Your Success is Our Priority". No clear positioning |
| No CTA | Browser window showing beautiful hero imagery with inspirational quote "Inspiring Tomorrow's Leaders", no visible buttons, contact info barely visible in footer |
| Wall of Text | Browser window showing dense paragraphs about "Our Methodology", "Our Values", "Our Approach", no testimonials or case studies, no pricing |
| Fixed (Avorria) | Browser window showing clean homepage with headline "We Help B2B Companies Double Qualified Leads", prominent purple CTA "Get Your Free Audit", client logos below, clean 5-item navigation |

**Admin Integration**: Add an image generation panel to the admin area or create a utility hook that allows regenerating images on demand.

---

## Part 2: New UX Enhancement Components

### Enhancement A: Social Proof Ticker
**File**: `src/components/websites-we-fire/SocialProofTicker.tsx`

A horizontal scrolling ticker below the hero showing real-time social proof:
- Auto-scrolling messages with pause on hover
- Messages like "Sarah from London just requested a teardown" and "TechCorp saw +47% conversions after rebuild"
- Subtle fade edges on left and right
- CSS animation for smooth infinite scroll

**Integration**: Add after the hero section in `WebsitesWeFire.tsx`

---

### Enhancement B: Quiz Results Sharing
**File**: `src/components/websites-we-fire/QuizShareCard.tsx`

Add social sharing functionality to the Fire Risk Quiz results:
- Generate a shareable card with the user's score and risk level
- Pre-written social copy: "My website scored [X] on Avorria's Fire Risk Quiz! 🔥"
- Share buttons for LinkedIn, Twitter, and copy-to-clipboard
- Uses Web Share API where available, fallback to direct URLs

**Integration**: Add to `FireRiskQuiz.tsx` result screen

---

### Enhancement C: Live Activity Indicator
**File**: `src/components/websites-we-fire/LiveActivityIndicator.tsx`

A playful social proof indicator near the teardown form:
- Shows "X people are viewing this page right now"
- Typing animation dots
- Randomized but realistic numbers (3-12 range)
- Subtle pulsing animation

**Integration**: Add above the teardown form in `WebsitesWeFire.tsx`

---

### Enhancement D: Cost of Inaction Timeline
**File**: `src/components/websites-we-fire/CostOfInactionTimeline.tsx`

A visual timeline below the Revenue Calculator showing cumulative impact:
- Month 1: Current state - £X lost
- Month 3: Competitors pull ahead
- Month 6: SEO rankings drop
- Month 12: Total annual loss £XXX,XXX

Features:
- Animated timeline with scroll-triggered reveal
- Each milestone animates in sequence
- Connects to Revenue Calculator values for personalization
- Dramatic visual treatment with red gradient

**Integration**: Add after the Revenue Calculator section

---

### Enhancement E: Archetype Comparison Modal
**File**: `src/components/websites-we-fire/ArchetypeComparisonModal.tsx`

A full-screen comparison modal when users click "See the Fix":
- Split-screen animation showing before and after
- Annotated callouts explaining each change (using existing archetype data)
- Smooth transition between states
- "Apply This Fix" CTA linking to contact

**Integration**: Add "See the Fix" button to each archetype card, wire up modal

---

### Enhancement F: Scroll-Triggered Explosion Animations
**File**: `src/components/websites-we-fire/ScrollExplosion.tsx`

Wrapper component for dramatic reveal animations:
- Numbers "explode" into view with particle burst
- Slight overshoot and settle (spring physics)
- Optional confetti/particle burst on completion
- Uses Framer Motion variants

**Integration**: Wrap stats and revenue calculator sections

---

### Enhancement G: Quiz Results Email Capture
**File**: `src/components/websites-we-fire/QuizResultsEmailCapture.tsx`

After quiz completion, offer to email results:
- Email input field on results screen
- "Send me a detailed breakdown" CTA
- Triggers backend function to send personalized email with score
- Follow-up sequence trigger via Supabase

**Dependencies**: Uses existing `send-newsletter` edge function pattern or creates new `send-quiz-results` function

---

### Enhancement H: Archetype Audio Narration (Optional)
**File**: `src/components/websites-we-fire/ArchetypeNarration.tsx`

Optional audio narration for each archetype:
- "Click to hear why this archetype gets fired"
- 15-30 second audio clips per archetype
- Play/pause controls with visual feedback
- Uses ElevenLabs API via existing edge function

**Integration**: Add to archetype cards (optional enhancement)

---

## File Changes Summary

### New Files to Create

```text
supabase/functions/generate-mockup-images/index.ts
src/components/websites-we-fire/SocialProofTicker.tsx
src/components/websites-we-fire/QuizShareCard.tsx
src/components/websites-we-fire/LiveActivityIndicator.tsx
src/components/websites-we-fire/CostOfInactionTimeline.tsx
src/components/websites-we-fire/ArchetypeComparisonModal.tsx
src/components/websites-we-fire/ScrollExplosion.tsx
src/components/websites-we-fire/QuizResultsEmailCapture.tsx
supabase/functions/send-quiz-results/index.ts (optional)
```

### Files to Modify

```text
src/components/websites-we-fire/index.tsx
├── Export new components

src/pages/WebsitesWeFire.tsx
├── Add SocialProofTicker after hero
├── Add LiveActivityIndicator near form
├── Add CostOfInactionTimeline after calculator
├── Integrate ArchetypeComparisonModal with archetype cards
├── Wrap stats with ScrollExplosion

src/components/websites-we-fire/FireRiskQuiz.tsx
├── Add QuizShareCard on results
├── Add QuizResultsEmailCapture option
```

---

## Implementation Order

**Phase 2A - Quick Wins (Immediate Impact):**
1. SocialProofTicker - adds credibility immediately
2. LiveActivityIndicator - creates urgency
3. ScrollExplosion - polish layer for existing elements

**Phase 2B - Core Features:**
4. QuizShareCard - viral potential
5. CostOfInactionTimeline - strengthens revenue calculator
6. ArchetypeComparisonModal - deeper engagement

**Phase 2C - Image Generation:**
7. Create `generate-mockup-images` edge function
8. Generate 5 archetype images with English text
9. Update image imports in WebsitesWeFire.tsx
10. Adjust hotspot positions if needed

**Phase 2D - Advanced Features:**
11. QuizResultsEmailCapture with email function
12. ArchetypeNarration (if desired)

---

## Technical Details

### Social Proof Ticker Animation
Uses CSS keyframes for infinite horizontal scroll:
```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Content is duplicated to create seamless loop.

### Quiz Share Card
Uses Web Share API with fallback:
```typescript
if (navigator.share) {
  await navigator.share({ title, text, url });
} else {
  // Fallback to social media URLs
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
}
```

### Mock-Up Image Generation
Edge function uses Lovable AI gateway:
```typescript
const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${lovableApiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash-image-preview",
    messages: [{ role: "user", content: detailedPrompt }],
    modalities: ["image", "text"],
  }),
});
```

### Email Capture Integration
Uses existing Resend setup (RESEND_API_KEY already configured):
```typescript
await resend.emails.send({
  from: "Avorria <noreply@avorria.com>",
  to: [userEmail],
  subject: "Your Website Fire Risk Score: [X]%",
  html: personalizedTemplate,
});
```

---

## Tracking Events to Add

| Event | Trigger | Data |
|-------|---------|------|
| `ticker_interaction` | Hover on ticker | `{action: 'pause'}` |
| `quiz_share_clicked` | Share button click | `{platform, score}` |
| `quiz_email_submitted` | Email capture submit | `{score, email_provided: true}` |
| `timeline_viewed` | Timeline scroll into view | `{annual_loss}` |
| `comparison_modal_opened` | "See the Fix" click | `{archetype_number}` |
| `image_generated` | Admin generates new image | `{archetype}` |

---

## Expected Outcomes

- **Engagement**: +25-40% time on page
- **Conversion**: +15-25% form submissions  
- **Sharing**: New viral coefficient from quiz sharing
- **Credibility**: Professional mock-ups with realistic English text
- **Urgency**: Live activity and timeline create FOMO

