

## Fix: Add Sign Out and Sign In Buttons to the Unauthorized Page

### Problem
When a non-admin user navigates to `/admin`, they get redirected to `/unauthorized`. That page only offers "Go Home" and "Contact Support" -- there is no way to sign out and sign back in with the correct credentials. The user is effectively locked out.

### Solution
Add a "Sign Out and Sign In" button to the Unauthorized page that:
1. Signs the current user out
2. Redirects them to the login page (with a `returnTo` parameter pointing back to `/admin` so they land in the right place after logging in)

Also show a subtle message indicating they are currently signed in (displaying their email), so they understand why they are seeing the page.

### Changes

**File: `src/pages/Unauthorized.tsx`**

- Import `useAuth` hook and `useNavigate` from react-router-dom
- Display the current user's email: "Signed in as user@example.com"
- Add a "Sign Out and Sign In" button that calls `signOut()` then navigates to `/auth/login?returnTo=/admin`
- Keep the existing "Go Home" and "Contact Support" buttons
- Add a `LogOut` icon from lucide-react for the new button

### Technical Detail

The button handler will be:
```typescript
const handleSignOutAndLogin = async () => {
  await signOut();
  navigate("/auth/login?returnTo=/admin");
};
```

This is a single-file change with no database or backend modifications needed.

