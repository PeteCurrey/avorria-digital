

## Content Studio Enhancement & Admin Premium Polish

### What you asked for
1. Full-size image preview (clickable to expand from the cropped rectangle)
2. Option to replace an image or input a custom prompt
3. Image style options (realistic photo vs. illustrative/abstract)
4. Avorria logo watermark on every generated image (pink dot, lightweight font)
5. Clearer path to link social accounts from Content Studio
6. Overall admin dashboard premium polish — more corporate, grown-up feel

---

### Implementation Plan

#### 1. Image Lightbox & Management (ContentStudio.tsx)
- Add a full-screen modal/dialog that opens when clicking any generated image, showing it at full resolution
- Add action buttons on each image card: **Replace Image** (re-generates with same or new prompt), **Custom Prompt** (text input for a bespoke image prompt)
- Add an **Image Style** selector before generation with options:
  - **Photographic** — realistic stock-photo style environments
  - **Illustrative** — clean vector/abstract marketing graphics (current default)
  - **3D Render** — modern 3D objects and scenes
- Pass the selected style to the `generate-image` edge function prompt

#### 2. Avorria Watermark on Generated Images (Edge Function)
- Update `supabase/functions/generate-image/index.ts` to composite the Avorria logo watermark onto every generated image before uploading to storage
- Use the image editing capability of the AI model: after generating the base image, make a second call with the instruction to add "Avorria." text (with the pink dot) in the bottom-right corner, semi-transparent
- This keeps it server-side so every image stored already has the branding baked in

#### 3. Social Account Linking UX (ContentStudio.tsx)
- Replace the current banner with a more prominent, interactive social accounts status bar showing connected/disconnected state per platform
- The "Set up" button will programmatically navigate to `/admin?tab=integrations` with the Social category pre-selected (using URL params or a custom event)
- Show green checkmarks next to platforms that are already configured in `seo_integrations`

#### 4. Admin Dashboard Premium Polish
Changes across `AdminLayout.tsx`, `AdminSidebar.tsx`, and key admin components:

**Sidebar:**
- Replace the gradient text "Avorria" with the proper `AnimatedLogo` component (pink dot, lightweight font) for brand consistency
- Refine spacing, add subtle divider lines between sections

**Top Bar (AdminLayout):**
- Add a subtle frosted-glass effect with refined border treatment
- Tighter, more corporate typography

**Content Cards & Panels:**
- More refined card borders (thinner, subtler)
- Consistent use of the accent gradient on interactive elements
- Better empty-state illustrations
- Tighter spacing and smaller text for a data-dense, enterprise feel

---

### Files to modify
| File | Changes |
|------|---------|
| `src/components/admin/ContentStudio.tsx` | Image lightbox dialog, replace/custom-prompt buttons, image style selector, social status bar |
| `supabase/functions/generate-image/index.ts` | Add watermark via second AI call, accept `imageStyle` parameter |
| `src/components/admin/AdminSidebar.tsx` | Use `AnimatedLogo` component, refine typography |
| `src/components/admin/AdminLayout.tsx` | Premium top-bar polish |

