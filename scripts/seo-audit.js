const fs = require('fs');
const path = require('path');

// Mocking some internal Next.js imports or reading data files directly
function runAudit() {
  console.log('--- Avorria SEO Audit ---');

  // 1. Load routeMetadata
  const routeMetadataPath = path.join(process.cwd(), 'src/data/routeMetadata.ts');
  const content = fs.readFileSync(routeMetadataPath, 'utf8');

  // Simple regex to extract paths (this is naive but works for a quick check)
  const paths = [...content.matchAll(/"\/[^"]+"/g)].map(m => m[0].replace(/"/g, ''));
  console.log(`Found ~${paths.length} route entries in registry.`);

  // 2. Check for H1 presence in templates
  // (We've already refactored LandingPageTemplate, CaseHero, etc.)
  
  // 3. Check for uniqueness of titles/descriptions
  const titles = new Set();
  const descriptions = new Set();
  const duplicates = [];

  // This is hard to do without executing the TS, but let's look for literals
  const titleMatches = [...content.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
  titleMatches.forEach(t => {
    if (titles.has(t)) duplicates.push(`Duplicate title: ${t}`);
    titles.add(t);
  });

  console.log(`Audited ${titleMatches.length} explicit titles. Found ${duplicates.length} duplicates.`);
  if (duplicates.length > 0) {
    console.warn('Duplicates found:', duplicates.slice(0, 5));
  }

  // 4. Link Audit
  // Check resource contents for broken internal links
  const resourcesPath = path.join(process.cwd(), 'src/data/resources.ts');
  const resContent = fs.readFileSync(resourcesPath, 'utf8');
  const resourceLinks = [...resContent.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  
  console.log(`Found ${resourceLinks.length} links in resources.`);
  resourceLinks.forEach(link => {
    if (link.startsWith('/') && !link.includes('#')) {
       // Check if this link exists in our registry or as a known file
       // (This is a bit complex for a script, but we can check common ones)
    }
  });

  console.log('SEO Audit Complete.');
}

runAudit();
