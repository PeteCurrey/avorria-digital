
# Client Portal Web Design Showcase & Admin Client Management Enhancement

## Overview

This plan implements a comprehensive web design showcase system for the client portal, allowing you to display before/after screenshots of client websites, plus enhanced admin functionality to create and manage client login credentials.

---

## Current State Analysis

### What Already Exists
- **Client Portal** at `/client/*` with projects list and detail views
- **BeforeAfterSliderMulti** component for displaying screenshot comparisons
- **project_assets** table with `screenshot_before` and `screenshot_after` asset types
- **AssetManager** in admin panel with URL capture preparation (ScreenshotMonster workflow)
- **profiles** and **user_roles** tables for authentication
- **clients** table with `owner_id` linking to profiles

### Current Gap
The system structure is mostly in place, but:
1. Client invite/credential creation is manual (no streamlined workflow)
2. Before/after pairs need better pairing logic (currently position-based)
3. No project timeline/progress visualization
4. No design stage feedback mechanism

---

## Implementation Plan

### Phase 1: Enhanced Before/After Asset Management

**1.1 Add `pair_id` field to project_assets table**

Add a new column to link before/after screenshots as explicit pairs:

```sql
ALTER TABLE project_assets 
ADD COLUMN pair_id TEXT;

COMMENT ON COLUMN project_assets.pair_id IS 
'Groups before/after screenshots into pairs (e.g., "homepage", "about-page")';
```

**1.2 Update AssetManager upload dialog**

When uploading a `screenshot_before` or `screenshot_after`:
- Show a "Page/Section Name" field (e.g., "Homepage", "About Page", "Contact")
- This becomes the `pair_id` and also sets the `title`
- Display existing pair names as suggestions

**1.3 Add "Paired Screenshots" view in AssetManager**

- Grid view showing before/after pairs side-by-side
- Quick preview of how pairs will look in client portal
- Drag-to-reorder functionality for pair ordering

---

### Phase 2: Admin Client Credential Management

**2.1 Add "Invite Client" button to ClientsManager**

When a client doesn't have a linked user (`owner_id` is null):
- Show "Invite Client" button in the actions menu
- Opens dialog to enter client's email address
- Two options:
  - **Send Magic Link** (uses Supabase magic link auth)
  - **Set Temporary Password** (creates account with temp password)

**2.2 Create client invitation edge function**

Create `supabase/functions/invite-client/index.ts`:
- Accepts `email`, `client_id`, `full_name`
- Creates user via Supabase Admin API (using service role key)
- Assigns "client" role to user_roles
- Links the new user to the client record via `owner_id`
- Returns temporary password or magic link URL

**2.3 Update ClientsManager UI**

Add to the clients table row actions:
- "Invite Client" - when no linked user
- "Resend Invite" - when user exists but hasn't logged in
- "Reset Password" - triggers password reset email
- "View as Client" - existing impersonation (already works)

---

### Phase 3: Enhanced Client Portal Project Detail

**3.1 Improve ClientProjectDetail screenshots tab**

Update the pairing logic to use `pair_id`:
- Group assets by `pair_id` for proper pairing
- Fall back to position-based pairing if no `pair_id`
- Show page labels from `pair_id` in the slider navigation

**3.2 Add project progress timeline**

New component showing project milestones:
- Discovery
- Wireframes
- Design Concepts
- Development
- Review
- Launch

Current status highlighted, with dates for completed stages.

**3.3 Add quick feedback mechanism**

Allow clients to leave comments on individual assets:
- Simple comment form on screenshot view
- Comments stored in `project_asset_comments` table (new)
- Admin receives notification of new comments

---

### Phase 4: Project Showcase Page Enhancements

**4.1 Add design revision history**

New component showing design evolution:
- Timeline of uploaded screenshots with dates
- Clients can see how their website transformed over time

**4.2 Add live site comparison**

For launched projects with `live_url`:
- "Compare to Live" button
- Opens modal showing screenshot vs current live site (iframe)

---

## Technical Details

### Database Changes

```sql
-- 1. Add pair_id to project_assets
ALTER TABLE project_assets 
ADD COLUMN pair_id TEXT;

-- 2. Create project_asset_comments table for client feedback
CREATE TABLE project_asset_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES project_assets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_asset_comments ENABLE ROW LEVEL SECURITY;

-- Policies: Users can see comments on their project assets
CREATE POLICY "Users can view comments on their project assets"
  ON project_asset_comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_assets pa
      JOIN client_projects cp ON pa.project_id = cp.id
      WHERE pa.id = project_asset_comments.asset_id
      AND cp.user_id = auth.uid()
    )
  );

-- Users can create comments
CREATE POLICY "Users can create comments"
  ON project_asset_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### New Files to Create

1. **`supabase/functions/invite-client/index.ts`** - Client invitation edge function
2. **`src/components/admin/ClientInviteDialog.tsx`** - Invite/credential dialog
3. **`src/components/client/ProjectTimeline.tsx`** - Visual project progress
4. **`src/hooks/useAssetComments.ts`** - Comments hook
5. **`src/components/client/AssetCommentForm.tsx`** - Comment form component

### Files to Modify

1. **`src/components/admin/ClientsManager.tsx`**
   - Add invite/credential management actions
   - Import and use ClientInviteDialog

2. **`src/components/admin/AssetManager.tsx`**
   - Add pair_id field to upload form
   - Add paired screenshots grid view

3. **`src/pages/client/ClientProjectDetail.tsx`**
   - Update pairing logic to use pair_id
   - Add project timeline component
   - Add comment functionality

4. **`src/hooks/useProjectAssets.ts`**
   - Add pair_id to types
   - Add query hook for paired assets

---

## User Experience Flow

### Admin Creating Client Access

1. Admin creates client in Clients tab
2. Admin creates project linked to client
3. Admin uploads before/after screenshots with page names
4. Admin clicks "Invite Client" from client actions
5. Admin enters client's email
6. System creates account, assigns role, sends invite email
7. Client receives email with login instructions

### Client Viewing Their Project

1. Client logs in at `/auth/login`
2. Redirected to `/client` (overview)
3. Clicks "Projects" in navigation
4. Sees their web design project(s)
5. Clicks project to view details
6. Sees timeline, before/after slider, documents
7. Can leave feedback comments on designs

---

## Implementation Priority

| Priority | Feature | Effort |
|----------|---------|--------|
| 1 | Client invite/credential creation | Medium |
| 2 | Pair ID for before/after screenshots | Low |
| 3 | Enhanced pairing logic in client portal | Low |
| 4 | Project timeline component | Medium |
| 5 | Asset comments system | Medium |
| 6 | Design revision history | Low |

---

## Security Considerations

- **Edge function** uses service role key for user creation (stored as secret)
- **RLS policies** ensure clients only see their own data
- **Password requirements** enforced at account creation
- **Magic link** preferred for simpler, more secure onboarding

---

## Expected Outcome

After implementation:
- You can create a client, upload before/after screenshots, and invite them with a single workflow
- Clients see a polished project view with interactive before/after comparison
- Proper pairing ensures Homepage Before matches Homepage After
- Feedback loop allows clients to comment directly on designs
- Project timeline gives clients visibility into progress
