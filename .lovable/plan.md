

## Team Members Management & Website Content Admin

### What you asked for
1. Enhance About page team cards with images, LinkedIn links, and contact info
2. Manage team members from the admin panel (add, edit, delete)
3. A "Website Management" section in admin to manage internal website content (pages, team, etc.)
4. Verify existing content management tools (landing pages, resources) work properly

---

### Plan

#### 1. Database: `team_members` table
Create a new table with columns: `id`, `full_name`, `title`, `bio`, `initials`, `photo_url`, `linkedin_url`, `email`, `phone`, `display_order`, `is_published`, `created_at`, `updated_at`. RLS policies for staff CRUD and public SELECT on published members.

#### 2. Admin: Team Members Manager (`src/components/admin/TeamMembersManager.tsx`)
A CRUD interface (matching the pattern of `TestimonialsTab` / `ResourcesManager`) with:
- Table listing all team members with edit/delete actions
- Dialog form for add/edit with fields: name, title, bio, initials, photo upload (to `client-logos` bucket or a new `team-photos` bucket), LinkedIn URL, email, phone, display order, published toggle
- Image upload using the existing `ImageUploader` component

#### 3. About page: Dynamic team cards
- Replace the hardcoded `team` array with a `useTeamMembers()` hook that fetches from the database
- Enhance each card with: clickable photo/avatar, LinkedIn icon link, email link
- Fallback to initials circle if no photo is uploaded

#### 4. Admin sidebar: "Website" section
Add a new nav section called **"Website"** in `AdminSidebar.tsx` with:
- **Team Members** (tab: `team-members`) -- the new manager
- **Resources** (move from Content & Marketing, since these are website pages)
- **Case Studies** (already exists, keep in Content & Marketing too or move)

This groups internal website content management together.

#### 5. Wire up in Admin.tsx
- Import `TeamMembersManager`, add `case "team-members"` to the switch
- Add title/subtitle entries for the new tab

---

### Files to create
| File | Purpose |
|------|---------|
| `src/components/admin/TeamMembersManager.tsx` | CRUD admin component |
| `src/hooks/useTeamMembers.ts` | React Query hook for team_members table |

### Files to modify
| File | Changes |
|------|---------|
| `src/pages/About.tsx` | Fetch team from DB, enhance cards with photo/LinkedIn/email |
| `src/pages/Admin.tsx` | Add team-members tab case |
| `src/components/admin/AdminSidebar.tsx` | Add "Website" section with Team Members link |

### Database migration
- Create `team_members` table with RLS
- Create `team-photos` storage bucket (public)

