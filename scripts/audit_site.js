const fs = require('fs');
const path = require('path');

console.log('=== SERVMADE CATALOGUE & SITE AUDIT ===\n');

// 1. Load Categories
const catFile = fs.readFileSync(path.join(__dirname, '../src/data/categories.ts'), 'utf8');
console.log('--- 1. CATEGORIES CHECK ---');
const catNames = [...catFile.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`Live categories in categories.ts (${catNames.length}):`);
catNames.forEach((c, i) => console.log(`  ${i+1}. ${c}`));

// 2. Load Products
const prodFile = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf8');
const jsonPart = prodFile.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);
console.log(`\n--- 2. PRODUCTS AUDIT (TOTAL: ${products.length} Product Families) ---`);

// Breakdown by category
const byCat = {};
products.forEach(p => {
  byCat[p.categoryName] = byCat[p.categoryName] || [];
  byCat[p.categoryName].push(p);
});

Object.keys(byCat).forEach(cat => {
  console.log(`\nCategory: [${cat}] (${byCat[cat].length} products):`);
  byCat[cat].forEach(p => {
    const sizeStr = p.sizes ? p.sizes.map(s => s.label).join(', ') : 'N/A';
    const moqStr = p.moqPieces ? `${p.moqPieces} pcs` : 'TBD (null)';
    const colorStr = p.colors ? `[Colors: ${p.colors.join(', ')}]` : '';
    console.log(`  • ${p.name} (slug: ${p.slug}) | Sizes: ${sizeStr} | MOQ: ${moqStr} ${colorStr}`);
  });
});

// 3. Check for forbidden strings across src/
console.log('\n--- 3. FORBIDDEN STRINGS SCAN (Chuk, Ecolate, Cornstarch, Tissue Rolls in visible src/) ---');
const forbiddenTerms = ['chuk', 'ecolate', 'cornstarch', 'jrt-tissue', 'hrt-tissue', 'Table ware'];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const srcFiles = walkDir(path.join(__dirname, '../src'));
let forbiddenFound = 0;

srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  forbiddenTerms.forEach(term => {
    // Case insensitive match
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      console.log(`  ⚠️ Found "${term}" (${matches.length}x) in ${path.relative(path.join(__dirname, '..'), f)}`);
      forbiddenFound += matches.length;
    }
  });
});

if (forbiddenFound === 0) {
  console.log('  ✅ Clean! Zero forbidden brand terms or removed items found in src/.');
}

// 4. Verify Related Slugs
console.log('\n--- 4. RELATED SLUGS INTEGRITY CHECK ---');
const allSlugs = new Set(products.map(p => p.slug));
let brokenRelated = 0;
products.forEach(p => {
  (p.relatedSlugs || []).forEach(rel => {
    if (!allSlugs.has(rel)) {
      console.log(`  ❌ Broken related slug "${rel}" in product "${p.slug}"`);
      brokenRelated++;
    }
  });
});
if (brokenRelated === 0) {
  console.log('  ✅ All relatedSlugs resolve to valid active products.');
}

console.log('\n=== AUDIT COMPLETE ===');
