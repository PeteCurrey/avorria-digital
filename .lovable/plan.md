
# Fix: Invalid Date Syntax Error in Client Projects

## Problem Identified

When creating a client project in the admin dashboard, if the date fields (Start Date, Target Launch Date) are left empty, they are submitted as empty strings `""` to the database. PostgreSQL rejects empty strings for DATE type columns - it expects either a valid date format (`YYYY-MM-DD`) or `null`.

**Database Error:**
```
invalid input syntax for type date: ""
```

---

## Root Cause

In `ClientProjectsManager.tsx`, the form state initializes date fields as empty strings:

```javascript
const [formData, setFormData] = useState({
  // ...
  start_date: "",           // Empty string
  target_launch_date: "",   // Empty string
});
```

When `handleSubmit` runs, these empty strings are passed directly to Supabase:

```javascript
await createProject.mutateAsync({
  ...formData,  // Includes start_date: "" and target_launch_date: ""
  user_id,
});
```

---

## Solution

Convert empty strings to `null` before sending to the database. This is a common pattern when dealing with optional date fields from HTML form inputs.

### Changes to `ClientProjectsManager.tsx`

Update the `handleSubmit` function to sanitize date fields:

```javascript
const handleSubmit = async () => {
  if (!formData.client_id || !formData.name) return;

  const client = clients?.find(c => c.id === formData.client_id);
  const user_id = client?.owner_id || "";

  // Sanitize data: convert empty strings to undefined for optional fields
  const sanitizedData = {
    ...formData,
    description: formData.description || undefined,
    live_url: formData.live_url || undefined,
    staging_url: formData.staging_url || undefined,
    start_date: formData.start_date || undefined,
    target_launch_date: formData.target_launch_date || undefined,
  };

  if (editingProject) {
    await updateProject.mutateAsync({
      id: editingProject,
      updates: sanitizedData,
    });
  } else {
    await createProject.mutateAsync({
      ...sanitizedData,
      user_id,
    });
  }

  resetForm();
  setIsCreateOpen(false);
};
```

**Why `undefined` instead of `null`?**
When Supabase receives `undefined`, it omits that field from the insert/update, allowing the database default (which is `null` for these columns) to apply. This is cleaner than explicitly passing `null`.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/admin/ClientProjectsManager.tsx` | Sanitize form data in `handleSubmit` to convert empty strings to `undefined` for optional fields |

---

## Testing

After the fix:
1. Go to `/admin?tab=projects`
2. Click "Add Project"
3. Fill in required fields (Client, Project Name)
4. Leave date fields empty
5. Click "Create Project"
6. Project should be created successfully without date validation error
