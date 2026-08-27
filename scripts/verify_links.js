const fs = require('fs');
const path = require('path');

// 1. Categories
const catFile = fs.readFileSync(path.join(__dirname, '../src/data/categories.ts'), 'utf8');
const catSlugs = [...catFile.matchAll(/href:\s*"([^"]+)"/g)].map(m => m[1]);

// 2. Products
const prodFile = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf8');
const jsonPart = prodFile.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);
const productRoutes = products.map(p => `/products/${p.slug}`);

// 3. Header links
const headerFile = fs.readFileSync(path.join(__dirname, '../src/components/layout/Header.tsx'), 'utf8');
const headerHrefs = [...headerFile.matchAll(/href:\s*"([^"]+)"/g)].map(m => m[1]);

// 4. Footer links
const siteFile = fs.readFileSync(path.join(__dirname, '../src/data/site.ts'), 'utf8');
const footerHrefs = [...siteFile.matchAll(/href:\s*"([^"]+)"/g)].map(m => m[1]);

console.log('=== VERIFYING LINK REFERENCES ===\n');

console.log('1. Categories in categories.ts:');
catSlugs.forEach(href => console.log('  ', href));

console.log('\n2. Products in products.ts (Total:', productRoutes.length, '):');
productRoutes.forEach(r => console.log('  ', r));

console.log('\n3. Header Category & Product links:');
headerHrefs.filter(h => h.startsWith('/categories/') || h.startsWith('/products/')).forEach(h => console.log('  ', h));

console.log('\n4. Footer Category & Product links:');
footerHrefs.filter(h => h.startsWith('/categories/') || h.startsWith('/products/')).forEach(h => console.log('  ', h));

// Verify that every product has categorySlug matching a category href
console.log('\n5. Product -> Category slug match check:');
const validCatSlugs = new Set(catSlugs.map(h => h.replace('/categories/', '')));
let matchErrors = 0;
products.forEach(p => {
  if (!validCatSlugs.has(p.categorySlug)) {
    console.log(`  ❌ Product ${p.slug} has invalid categorySlug: "${p.categorySlug}"`);
    matchErrors++;
  }
});
if (matchErrors === 0) {
  console.log('  ✅ All', products.length, 'products map 1:1 to a valid category slug in categories.ts.');
}
