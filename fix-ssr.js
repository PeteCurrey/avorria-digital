const fs = require('fs');
const glob = require('glob'); // Use basic fs recursive instead if glob not installed

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = dir + '/' + file;
    if (fs.statSync(path).isDirectory()) {
      walk(path, fileList);
    } else if (path.endsWith('.tsx') || path.endsWith('.ts')) {
      fileList.push(path);
    }
  }
  return fileList;
}

const views = walk('./src/views');

let totalReplaced = 0;

for (const file of views) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace opacity: 0 in initial framer motion objects
  // Like `initial={{ opacity: 0, y: 20 }}` -> `initial={{ opacity: 1, y: 0 }}`
  content = content.replace(/initial=\{\{\s*opacity:\s*0\s*([^}]*)\}\}/g, (match, p1) => {
    let replacedExtras = p1.replace(/y:\s*-?\d+/, 'y: 0').replace(/x:\s*-?\d+/, 'x: 0');
    return `initial={{ opacity: 1${replacedExtras}}}`;
  });
  
  // also handle standard whileInView or animate if needed, but only `initial` causes SSR issues.
  // Wait, if next.js renders opacity: 1, and whileInView has opacity: 1, it won't animate from 0.
  // The user prioritises SSR visibility over scroll animations! "no opacity:0 or transform:translateY inline styles on text content"
  // So replacing initial opacity 0 with 1 is exactly the right fix.

  // Also remove SEOHead blocks since it's now handled in page.tsx
  content = content.replace(/<SEOHead[\s\S]*?<\/SEOHead>/g, '');
  content = content.replace(/import SEOHead from ["']@\/components\/seo\/SEOHead["'];?/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Updated ${totalReplaced} files for SSR & SEOHead compliance.`);
