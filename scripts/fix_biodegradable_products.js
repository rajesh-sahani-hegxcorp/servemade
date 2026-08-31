const fs = require('fs');
const path = require('path');

const prodPath = path.join(__dirname, '../src/data/products.ts');
const file = fs.readFileSync(prodPath, 'utf8');

const jsonPart = file.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);

// 1. Remove separate bagasse-square-bowl so we have a single unified "Bagasse Bowl" product
const filtered = products.filter(p => p.slug !== 'bagasse-square-bowl');

// 2. Update bagasse-round-bowl to be the unified Bagasse Bowl product with Round and Square variants
const bowl = filtered.find(p => p.slug === 'bagasse-round-bowl');
if (bowl) {
  bowl.name = "Bagasse Bowl";
  bowl.categorySlug = "biodegradable-products";
  bowl.categoryName = "Biodegradable Products";
  bowl.shapeOptions = ["Round", "Square"];
  bowl.variants = [
    {
      size: "6 oz",
      dimension: "round",
      shape: "Round",
      capacityMl: 180,
      capacityOz: 6,
      qtyPerBox: 1000,
      qtyPerPkt: 50
    },
    {
      size: "8 oz",
      dimension: "round",
      shape: "Round",
      capacityMl: 240,
      capacityOz: 8,
      qtyPerBox: 1000,
      qtyPerPkt: 50
    },
    {
      size: "12 oz",
      dimension: "round",
      shape: "Round",
      capacityMl: 350,
      capacityOz: 12,
      qtyPerBox: 1000,
      qtyPerPkt: 50
    },
    {
      size: "4 oz",
      dimension: "square",
      shape: "Square",
      capacityMl: 120,
      capacityOz: 4,
      qtyPerBox: 1000,
      qtyPerPkt: 50
    }
  ];
  bowl.sizes = [
    { label: "4 oz", note: "Square" },
    { label: "6 oz", note: "Round" },
    { label: "8 oz", note: "Round" },
    { label: "12 oz", note: "Round" }
  ];
  bowl.tagline = "Certified compostable sugarcane bagasse bowls in Round and Square formats.";
  bowl.summary = "Molded sugarcane bagasse bowls crafted from upcycled plant fibres. Available in classic Round (6oz, 8oz, 12oz) and compact Square (4oz) shapes for soups, sides, and desserts.";
}

// 3. Ensure all other products in Biodegradable Products category have categorySlug: "biodegradable-products"
const bioProductsSlugs = new Set([
  'bagasse-round-bowl',
  'bagasse-round-plate',
  'bagasse-3-compartment-square-plate',
  'bagasse-3-compartment-combo-meal-plate',
  'bagasse-4-compartment-meal-tray',
  'bagasse-5-compartment-meal-tray'
]);

filtered.forEach(p => {
  if (bioProductsSlugs.has(p.slug)) {
    p.categorySlug = 'biodegradable-products';
    p.categoryName = 'Biodegradable Products';
  }
});

// 4. Clean up relatedSlugs
const validSlugs = new Set(filtered.map(p => p.slug));
filtered.forEach(p => {
  p.relatedSlugs = (p.relatedSlugs || []).map(s => {
    if (s === 'bagasse-square-bowl') return 'bagasse-round-bowl';
    if (s === 'bagasse-3-compartment-round-plate' || s === 'bagasse-4-compartment-round-plate') return 'bagasse-round-plate';
    return s;
  }).filter(s => validSlugs.has(s) && s !== p.slug);
  p.relatedSlugs = [...new Set(p.relatedSlugs)];
});

const output = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(filtered, null, 2)};

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductsByCategory(categorySlug: string): Product[] {
  const normalized = categorySlug === "plates-bowls" ? "biodegradable-products" : categorySlug;
  return PRODUCTS.filter((p) => p.categorySlug === normalized || p.categorySlug === categorySlug);
}

export function resolveRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs.map(findProduct).filter((p): p is Product => Boolean(p));
}
`;

fs.writeFileSync(prodPath, output, 'utf8');
console.log('Successfully updated products.ts! Total products:', filtered.length);
