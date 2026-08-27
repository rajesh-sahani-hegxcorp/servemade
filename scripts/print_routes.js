const fs = require('fs');
const path = require('path');

const catFile = fs.readFileSync(path.join(__dirname, '../src/data/categories.ts'), 'utf8');
const catNames = [...catFile.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
const catHrefs = [...catFile.matchAll(/href:\s*"([^"]+)"/g)].map(m => m[1]);

const prodFile = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf8');
const jsonPart = prodFile.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);

console.log('=== FULL STATIC ROUTE CROSS-CHECK ===\n');

console.log('1. Category Static Routes (6):');
catHrefs.forEach((href, i) => {
  const catSlug = href.replace('/categories/', '');
  const catProds = products.filter(p => p.categorySlug === catSlug);
  console.log(`  • ${href} ("${catNames[i]}") -> ${catProds.length} products`);
});

console.log(`\n2. Product Static Routes (${products.length}):`);
products.forEach((p, i) => {
  console.log(`  • /products/${p.slug} -> "${p.name}" [categorySlug: ${p.categorySlug}]`);
});
