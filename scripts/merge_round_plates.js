const fs = require('fs');
const path = require('path');

const prodPath = path.join(__dirname, '../src/data/products.ts');
const file = fs.readFileSync(prodPath, 'utf8');

const jsonPart = file.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);

// 1. Find and update bagasse-round-plate
const roundPlate = products.find(p => p.slug === 'bagasse-round-plate');
if (roundPlate) {
  roundPlate.compartmentOptions = ["Plain", "3-Compartment", "4-Compartment"];
  roundPlate.variants = [
    {
      size: "6 in",
      dimension: "6 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "7 in",
      dimension: "7 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "9 in",
      dimension: "9 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 500,
      qtyPerPkt: 25
    },
    {
      size: "10 in",
      dimension: "10 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 500,
      qtyPerPkt: 25
    },
    {
      size: "11 in",
      dimension: "11 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "12 in",
      dimension: "12 in diameter",
      compartmentOption: "Plain",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 500,
      qtyPerPkt: 25
    },
    {
      size: "9 in",
      dimension: "9 in diameter",
      compartmentOption: "3-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "10 in",
      dimension: "10 in diameter",
      compartmentOption: "3-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "11 in",
      dimension: "11 in diameter",
      compartmentOption: "4-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 800,
      qtyPerPkt: 25
    },
    {
      size: "12 in",
      dimension: "12 in diameter",
      compartmentOption: "4-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 600,
      qtyPerPkt: 25
    }
  ];

  roundPlate.sizes = [
    { label: "6 in", note: "Plain" },
    { label: "7 in", note: "Plain" },
    { label: "9 in", note: "Plain or 3-CP" },
    { label: "10 in", note: "Plain or 3-CP" },
    { label: "11 in", note: "Plain or 4-CP" },
    { label: "12 in", note: "Plain or 4-CP" }
  ];

  roundPlate.summary = "Comprehensive range of compostable round dinner plates molded from 100% sugarcane pulp. Available in classic Plain, 3-Compartment, and 4-Compartment layouts that will not bend or buckle under heavy meals.";

  roundPlate.overview = [
    {
      heading: "Plain and partitioned round layouts",
      body: "Available in full classic open round dinnerware as well as 3-compartment and 4-compartment divided configurations for portion-separated meals.",
      bullets: [
        "Plain: 6, 7, 9, 10, 11, and 12-inch diameter sizes",
        "3-Compartment: 9 and 10-inch diameter options",
        "4-Compartment: 11 and 12-inch banquet diameter options",
        "Cut and oil resistant upcycled sugarcane bagasse"
      ]
    },
    {
      heading: "Heavy-duty structural rigidity",
      body: "High-density molded fibers provide cut resistance and superior rigidity compared to standard paper plates.",
      bullets: [
        "Naturally grease and moisture resistant",
        "Certified compostable across global standards",
        "Freezer and microwave safe up to 120°C"
      ]
    }
  ];
}

// 2. Remove bagasse-3-compartment-round-plate and bagasse-4-compartment-round-plate
const removeSlugs = new Set([
  'bagasse-3-compartment-round-plate',
  'bagasse-4-compartment-round-plate'
]);

const updatedProducts = products.filter(p => !removeSlugs.has(p.slug));

// 3. Clean up relatedSlugs
const validSlugs = new Set(updatedProducts.map(p => p.slug));
updatedProducts.forEach(p => {
  p.relatedSlugs = (p.relatedSlugs || []).map(s => {
    if (s === 'bagasse-3-compartment-round-plate' || s === 'bagasse-4-compartment-round-plate') {
      return 'bagasse-round-plate';
    }
    return s;
  }).filter(s => validSlugs.has(s) && s !== p.slug);
  p.relatedSlugs = [...new Set(p.relatedSlugs)];
});

const output = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(updatedProducts, null, 2)};

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function resolveRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs.map(findProduct).filter((p): p is Product => Boolean(p));
}
`;

fs.writeFileSync(prodPath, output, 'utf8');
console.log('Successfully merged round plates in products.ts! Total products:', updatedProducts.length);
