const fs = require('fs');
const path = require('path');

const prodPath = path.join(__dirname, '../src/data/products.ts');
const file = fs.readFileSync(prodPath, 'utf8');

const jsonPart = file
  .split('export const PRODUCTS: Product[] = ')[1]
  .split('export function findProduct')[0]
  .trim()
  .replace(/;$/, '');

const products = eval(jsonPart);

// Write to products.json in project root and in src/data/products.json
const rootJsonPath = path.join(__dirname, '../products.json');
const dataJsonPath = path.join(__dirname, '../src/data/products.json');

const formattedJson = JSON.stringify(products, null, 2);

fs.writeFileSync(rootJsonPath, formattedJson, 'utf8');
fs.writeFileSync(dataJsonPath, formattedJson, 'utf8');

console.log(`Successfully exported ${products.length} products to:`);
console.log(`- ${rootJsonPath}`);
console.log(`- ${dataJsonPath}`);
