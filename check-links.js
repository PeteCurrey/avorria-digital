const fs = require('fs');
const glob = require('glob');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, fileList);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allTsx = walk('./src');
const linkMap = {};

for (const file of allTsx) {
  const content = fs.readFileSync(file, 'utf8');
  // Match href="/..." or href='/...'
  const matches = content.match(/href=["'](\/[^"']*)["']/g);
  if (matches) {
    for (const match of matches) {
      const link = match.replace(/href=["']|["']/g, '');
      if (!linkMap[link]) linkMap[link] = [];
      linkMap[link].push(file);
    }
  }
}

// Let's check which routes in linkMap actually exist in src/app
const existingRoutes = [];
function readRoutes(dir, baseRoute = '') {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('(')) {
        readRoutes(fullPath, baseRoute + '/' + file);
      } else {
        readRoutes(fullPath, baseRoute); // group folder
      }
    } else if (file === 'page.tsx') {
      existingRoutes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
}
readRoutes('./src/app');

console.log("ROUTES FOUND IN APP:", existingRoutes.sort().join(", "));

const deadLinks = [];
for (const link of Object.keys(linkMap)) {
  // strip query strings
  let cleanLink = link.split('?')[0].split('#')[0];
  if (cleanLink.endsWith('/') && cleanLink !== '/') cleanLink = cleanLink.slice(0, -1);
  
  // ignore external absolute urls, or api routes if exist, or dynamic routes
  if (cleanLink.startsWith('http')) continue;
  
  // Exact match check (doesn't handle dynamic routes perfectly, but good enough for a rough list)
  // Dynamic routes in Next.js look like /services/seo -> matches /services/[slug]
  
  // We will just print all unique links and their files to manually inspect.
  console.log(`\nLINK: ${link} (${linkMap[link].length} occurrences)`);
  console.log(`FILES: ${Array.from(new Set(linkMap[link])).join('\n  ')}`);
}
