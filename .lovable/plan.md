

## Make Case Studies 100% Database-Driven

### Problem
The Case Studies page currently merges two data sources: the database (managed via admin panel) and a hardcoded static file (`src/data/caseStudies.ts`). This means:

- 6 static "Confidential" case studies with placeholder images (`/placeholder.svg`) are showing alongside real DB entries -- these are the cards with no images
- You cannot edit or remove them from the admin panel because they are not in the database
- The detail page also falls back to static data, creating inconsistency

The database already has 8 published case studies with real content. The static file is redundant.

### Changes

#### 1. Update Case Studies Listing Page (`src/pages/CaseStudies.tsx`)
- Remove the static data import and the merge logic that combines DB + static entries
- Source all case studies exclusively from the database via `useCaseStudiesPublic()`
- Build filter options dynamically from the database results (sectors, services, years) instead of from the static file
- Add a loading state while data is being fetched
- The `filteredCases` memo currently references `caseStudies` from the merge -- update it to use the DB-only list

#### 2. Update Case Study Detail Page (`src/pages/CaseStudyDetail.tsx`)
- Remove the static fallback (`getCaseStudyBySlug`) so the page only loads from the database
- Remove the `getRelatedCaseStudies` static helper -- fetch related projects from DB instead by querying for slugs in `relatedSlugs`
- Keep the loading and 404 states as they are

#### 3. Clean Up Static Data File (`src/data/caseStudies.ts`)
- Keep the file for its TypeScript interfaces (`CaseStudy`, `CaseMetric`, `CaseQuote`, `CaseTimelineStep`) which are used by multiple components
- Remove the hardcoded `caseStudies` array and all helper functions (`getCaseStudyBySlug`, `getFeaturedCaseStudies`, `getRelatedCaseStudies`)
- Remove the static `filterOptions` export
- Remove the image imports that are no longer needed

### Result
- Every case study on the front end comes from the database
- Every case study can be edited, unpublished, or deleted from the admin panel
- No more placeholder-image cards appearing on the page
- Filter options reflect what is actually in the database

### Files Modified
- `src/pages/CaseStudies.tsx` -- remove static merge, use DB only
- `src/pages/CaseStudyDetail.tsx` -- remove static fallback
- `src/data/caseStudies.ts` -- keep interfaces, remove hardcoded data

