
# Admin Panel & Client Portal Enhancement Plan

## Executive Summary

This plan addresses the gaps in the admin panel for client management and ensures a complete workflow from creating clients to testing their client portal experience. The key enhancements include a new Clients management tab, better sidebar organization, URL-based screenshot capture preparation, and impersonation capability for testing.

---

## Current State Issues

1. **No way to create clients** - The admin has `ClientProjectsManager` but no `ClientsManager` to actually create client accounts
2. **Projects require clients** - Cannot create projects without first having clients in the dropdown
3. **Asset upload requires projects** - Cannot upload before/after screenshots without first having projects
4. **No impersonation from admin** - Cannot easily test what a specific client sees
5. **Sidebar is crowded** - 11 items in the Dashboard section alone

---

## Implementation Plan

### Phase 1: Create Clients Manager Component

**File: `src/components/admin/ClientsManager.tsx`** (New)

A comprehensive client management component with:
- CRUD operations for clients
- Fields: Name, Industry, Services (multi-select), Status (onboarding/live/at-risk/paused), Monthly Value, Notes
- **Link to User Account** - Dropdown to associate client with an existing auth user (via `owner_id`)
- Quick stats showing client counts by status
- Search and filter capabilities
- Edit/Delete actions on each row

**Technical Details:**
- Uses existing `useClients`, `useCreateClient`, `useUpdateClient`, `useDeleteClient` hooks
- Adds lookup to `profiles` table to populate user dropdown
- Links `owner_id` to enable portal access

---

### Phase 2: Add Clients Tab to Admin

**File: `src/pages/Admin.tsx`**

- Add new case `"clients"` in `renderContent()` switch
- Import and render `<ClientsManager />`
- Update `getPageTitle()` and `getPageSubtitle()` for the clients tab

**File: `src/components/admin/AdminSidebar.tsx`**

Reorganize sidebar into logical groups:
```text
CLIENTS & PROJECTS
  - Clients (NEW - primary entry point)
  - Projects (Studio blueprints)
  - Client Projects (active work)
  - Assets
  - Invoicing

LEADS & SALES
  - Leads
  - Audits

CONTENT & MARKETING
  - Case Studies
  - Testimonials
  - Client Logos
  - Content Studio
  - Content Calendar
  - Newsletter Builder

SEO & PERFORMANCE
  - Landing Pages
  - Performance
  - SEO Dashboard
  - Sitemap Manager

ANALYTICS & REPORTS
  - Analytics
  - Reports
  - Analytics Connections

SYSTEM
  - Integrations
  - Settings
```

This reordering puts client management first (where workflows start) and groups related functions together.

---

### Phase 3: Add User Profile Lookup Hook

**File: `src/hooks/useProfiles.ts`** (New)

```typescript
export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .order('email');
      if (error) throw error;
      return data;
    },
  });
}
```

This enables the ClientsManager to show a dropdown of registered users that can be assigned as client owners.

---

### Phase 4: Add Admin-to-Client Impersonation Link

**File: `src/components/admin/ClientsManager.tsx`**

Add a "View as Client" button on each client row that:
1. Sets the `impersonatedClient` in auth context
2. Navigates to `/client`

**File: `src/hooks/useAuth.tsx`**

Ensure `setImpersonatedClient` supports setting by client name and that the client portal uses this for display and demo purposes.

---

### Phase 5: Screenshot URL Input Field

**File: `src/components/admin/AssetManager.tsx`**

Add alternative input method for screenshots:
- "Capture from URL" button that opens a dialog
- Input fields for:
  - Before URL (e.g., web.archive.org or current staging)
  - After URL (live site)
  - Screenshot service integration (future: screenshotmonster API)
- For now, manual file upload remains primary method
- Add "Tip" text explaining users can use ScreenshotMonster or similar to capture and download, then upload here

---

### Phase 6: Enhance Asset Manager with Better UX

**File: `src/components/admin/AssetManager.tsx`**

Improvements:
- Auto-select project when only one exists for a client
- Show client name in project dropdown for clarity
- Add "Bulk Upload" option for multiple screenshots
- Group assets by type (Screenshots, Wireframes, Documents) with collapsible sections
- Add drag-and-drop support for file uploads

---

## Database Considerations

No schema changes required - all necessary tables exist:
- `clients` table has `owner_id` to link to users
- `profiles` table exists for user lookup
- `client_projects` table links projects to clients
- `project_assets` table has all required asset types

---

## Workflow After Implementation

1. **Create Client** (Admin > Clients tab)
   - Add client name, industry, services
   - Optionally link to an existing user account (owner_id)

2. **Create Client Project** (Admin > Client Projects tab)
   - Select client from dropdown
   - Add project name, type, URLs

3. **Upload Assets** (Admin > Assets tab)
   - Select project
   - Upload before/after screenshots, proposals, wireframes

4. **Create Invoices** (Admin > Invoicing tab)
   - Select client and optionally project
   - Add amount, due date

5. **Test Client View** (From Clients tab)
   - Click "View as Client" on any client row
   - See exactly what they see in the portal

---

## File Changes Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/components/admin/ClientsManager.tsx` | Create | New component for managing clients |
| `src/hooks/useProfiles.ts` | Create | Fetch user profiles for owner dropdown |
| `src/pages/Admin.tsx` | Modify | Add clients case, import ClientsManager |
| `src/components/admin/AdminSidebar.tsx` | Modify | Reorganize navigation with better grouping |
| `src/components/admin/AssetManager.tsx` | Modify | Add URL input field, improve UX |

---

## Technical Notes

- The `clients.owner_id` field links to `profiles.id` which is the same as `auth.users.id`
- When a user logs in with the `client` role, their user ID is matched to `client_projects.user_id` and `invoices.user_id`
- The current flow requires the client to have a user account to see their data
- The `impersonatedClient` in useAuth is for demo/testing purposes only

---

## Testing Checklist

After implementation:
1. Create a new client in Admin > Clients
2. Link the client to a user account (or create a mock user)
3. Create a project for that client
4. Upload before/after screenshots to the project
5. Create an invoice for the client
6. Click "View as Client" to verify portal shows all data
7. Log in as the actual client user to verify RLS policies work
