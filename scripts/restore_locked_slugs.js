const fs = require('fs');
const path = require('path');

// 1. Update src/data/categories.ts
const catPath = path.join(__dirname, '../src/data/categories.ts');
let catCode = fs.readFileSync(catPath, 'utf8');
catCode = catCode.replace(
  /href:\s*"\/categories\/biodegradable-products"/g,
  'href: "/categories/plates-bowls"'
);
fs.writeFileSync(catPath, catCode, 'utf8');

// 2. Update src/data/site.ts
const sitePath = path.join(__dirname, '../src/data/site.ts');
let siteCode = fs.readFileSync(sitePath, 'utf8');
siteCode = siteCode.replace(
  /href:\s*"\/categories\/biodegradable-products"/g,
  'href: "/categories/plates-bowls"'
);
fs.writeFileSync(sitePath, siteCode, 'utf8');

// 3. Update src/components/layout/Header.tsx
const headerPath = path.join(__dirname, '../src/components/layout/Header.tsx');
let headerCode = fs.readFileSync(headerPath, 'utf8');
headerCode = headerCode.replace(
  /href:\s*"\/categories\/biodegradable-products"/g,
  'href: "/categories/plates-bowls"'
);
fs.writeFileSync(headerPath, headerCode, 'utf8');

// 4. Update src/components/product/ProductCatalogueExplorer.tsx
const explorerPath = path.join(__dirname, '../src/components/product/ProductCatalogueExplorer.tsx');
let explorerCode = fs.readFileSync(explorerPath, 'utf8');
explorerCode = explorerCode.replace(
  /slug:\s*"biodegradable-products"/g,
  'slug: "plates-bowls"'
);
fs.writeFileSync(explorerPath, explorerCode, 'utf8');

// 5. Update src/data/products.ts to set categorySlug: "plates-bowls" for Biodegradable Products
const prodPath = path.join(__dirname, '../src/data/products.ts');
const prodCode = fs.readFileSync(prodPath, 'utf8');
const jsonPart = prodCode.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);

const bioSlugs = new Set([
  'bagasse-round-bowl',
  'bagasse-round-plate',
  'bagasse-3-compartment-square-plate',
  'bagasse-3-compartment-combo-meal-plate',
  'bagasse-4-compartment-meal-tray',
  'bagasse-5-compartment-meal-tray'
]);

products.forEach(p => {
  if (bioSlugs.has(p.slug)) {
    p.categorySlug = 'plates-bowls';
    p.categoryName = 'Biodegradable Products';
  }
});

const updatedProdCode = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

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
fs.writeFileSync(prodPath, updatedProdCode, 'utf8');

// 6. Clean up next.config.mjs redirects
const configPath = path.join(__dirname, '../next.config.mjs');
let configCode = fs.readFileSync(configPath, 'utf8');
// remove plates-bowls redirect if present, ensure old product redirects are intact
const cleanConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.servemade.example" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/why-verdano",
        destination: "/why-serve-made",
        permanent: true,
      },
      {
        source: "/products/bagasse-square-bowl",
        destination: "/products/bagasse-round-bowl",
        permanent: true,
      },
      {
        source: "/products/bagasse-rectangular-container",
        destination: "/products/rectangle-container-with-lid",
        permanent: true,
      },
      {
        source: "/products/bagasse-3-compartment-round-plate",
        destination: "/products/bagasse-round-plate",
        permanent: true,
      },
      {
        source: "/products/bagasse-4-compartment-round-plate",
        destination: "/products/bagasse-round-plate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
`;
fs.writeFileSync(configPath, cleanConfig, 'utf8');

console.log('Restored locked slugs across all files successfully!');
