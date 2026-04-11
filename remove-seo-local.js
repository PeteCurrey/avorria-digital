const fs = require('fs');

const path = './src/views/SEOServices.tsx';
let content = fs.readFileSync(path, 'utf8');

// The Local SEO Strip is lines 631-663 approx. We'll search for "SEO BY LOCATION" comment and replace the block
content = content.replace(/\{\/\* -- 12\. SEO BY LOCATION -- \*\/\}[\s\S]*?<\/SectionBand>/, "");

fs.writeFileSync(path, content, 'utf8');
console.log("Removed from SEOServices");
