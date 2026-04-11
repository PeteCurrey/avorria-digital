const fs = require('fs');
const glob = require('glob');

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

const files = walk('./src');
const links = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/href=["']\/[^"']*["']/g);
  if (matches) {
    for (const match of matches) {
      links.add(match.replace(/href=["']|["']/g, ''));
    }
  }
}

console.log(Array.from(links).sort().join('\n'));
