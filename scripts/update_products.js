const fs = require('fs');
const path = require('path');

const prodPath = path.join(__dirname, '../src/data/products.ts');
const file = fs.readFileSync(prodPath, 'utf8');

const jsonPart = file.split('export const PRODUCTS: Product[] = ')[1].split('export function findProduct')[0].trim().replace(/;$/, '');
const products = eval(jsonPart);

// 1. Remove old placeholder products from biodegradable-containers:
// top-folding-pizza-box, 3-ply-corrugated-pizza-box, 3-ply-corrugated-garlic-bread-box, plain-rectangular-food-box, bagasse-rectangular-container
const removedSlugs = new Set([
  'top-folding-pizza-box',
  '3-ply-corrugated-pizza-box',
  '3-ply-corrugated-garlic-bread-box',
  'plain-rectangular-food-box',
  'bagasse-rectangular-container',
]);

const filteredProducts = products.filter(p => !removedSlugs.has(p.slug));

// 2. Define the 3 new/updated product families:
const roundBowlWithLid = {
  slug: "round-bowl-with-lid",
  name: "Round Bowl with Lid",
  categorySlug: "biodegradable-containers",
  categoryName: "Biodegradable Containers",
  variantType: "capacity",
  materials: ["Bagasse", "Cornstarch"],
  variants: [
    {
      size: "17 oz",
      dimension: "150 mm dia",
      capacityMl: 500,
      capacityOz: 17,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "25 oz",
      dimension: "170 mm dia",
      capacityMl: 750,
      capacityOz: 25,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "34 oz",
      dimension: "190 mm dia",
      capacityMl: 1000,
      capacityOz: 34,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "12 oz",
      dimension: "135 mm dia",
      capacityMl: 350,
      capacityOz: 12,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "15 oz",
      dimension: "145 mm dia",
      capacityMl: 450,
      capacityOz: 15,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "17 oz",
      dimension: "155 mm dia",
      capacityMl: 500,
      capacityOz: 17,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 50
    },
    {
      size: "22 oz",
      dimension: "165 mm dia",
      capacityMl: 650,
      capacityOz: 22,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 50
    }
  ],
  moqPieces: null,
  tagline: "Compostable round takeaway bowls with leak-resistant matching lids in bagasse and cornstarch.",
  summary: "Commercial-grade biodegradable round bowls engineered for takeaway meals, grain bowls, curries, and salads. Available in sugarcane bagasse and bio-based cornstarch with tight-fitting matching lids.",
  ratingLabel: "Top choice for poke, grain & noodle bowls",
  quickFacts: [
    { value: "TBD", label: "Minimum order" },
    { value: "2–3 weeks", label: "Production time" },
    { value: "500 / ctn", label: "Packed" },
    { value: "Yes", label: "Custom print" }
  ],
  sizes: [
    { label: "12 oz", note: "350 mL" },
    { label: "15 oz", note: "450 mL" },
    { label: "17 oz", note: "500 mL" },
    { label: "22 oz", note: "650 mL" },
    { label: "25 oz", note: "750 mL" },
    { label: "34 oz", note: "1000 mL" }
  ],
  baseMoq: 20000,
  moqUnit: "pieces",
  material: "Sugarcane Bagasse / Bio-based Cornstarch",
  printing: "Custom embossing or branded sleeve available",
  endOfLife: "100% Certified Compostable / Biodegradable",
  heatRating: "-20°C to 120°C (Microwave & freezer safe)",
  lidFit: "Matching snap-fit leak-resistant lids included",
  cartonPack: "500 units per carton (50 pcs x 10 pkts)",
  cartonVolume: "0.065 cbm / ctn",
  hsCode: "4823.70",
  leadTime: "2–3 weeks",
  shipsFrom: "Nhava Sheva (Mumbai), India",
  overview: [
    {
      heading: "Leak-resistant round profile with matching lids",
      body: "Engineered for hot soups, poke bowls, and saucy deliveries with secure lid closure preventing leaks during transport.",
      bullets: [
        "Available in renewable Sugarcane Bagasse and Cornstarch",
        "High sidewalls and reinforced rim for spill-free stacking",
        "100% biodegradable and compostable"
      ]
    },
    {
      heading: "Versatile temperature tolerance",
      body: "Safe for hot liquids and microwave reheating up to 120°C as well as freezer storage down to -20°C.",
      bullets: [
        "Oil and water resistant without synthetic plastic liners",
        "FDA and EN 13432 food contact approved",
        "Stackable nesting design minimizes storage footprint"
      ]
    }
  ],
  certifications: [
    { name: "FDA food-contact", note: "Food contact" },
    { name: "EN 13432", note: "Compostable" },
    { name: "ISO 9001", note: "Quality management" }
  ],
  faqs: [
    {
      question: "Are the lids included with the round bowls?",
      answer: "Yes, all orders include matching leak-resistant snap-fit lids designed specifically for each size."
    },
    {
      question: "What is the difference between Bagasse and Cornstarch options?",
      answer: "Sugarcane bagasse is made from upcycled sugarcane pulp and offers a natural textured matte finish, while cornstarch provides an ultra-smooth, lightweight bioplastic construction."
    }
  ],
  relatedSlugs: [
    "rectangle-container-with-lid",
    "meal-tray-with-lid",
    "kraft-paper-bowl-with-pet-lid"
  ],
  gallery: {
    type: "static",
    art: "bowl"
  }
};

const rectangleContainerWithLid = {
  slug: "rectangle-container-with-lid",
  name: "Rectangle Container with Lid",
  categorySlug: "biodegradable-containers",
  categoryName: "Biodegradable Containers",
  variantType: "capacity",
  materials: ["Bagasse", "Cornstarch"],
  variants: [
    {
      size: "17 oz",
      dimension: "rectangular",
      capacityMl: 500,
      capacityOz: 17,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "22 oz",
      dimension: "rectangular",
      capacityMl: 650,
      capacityOz: 22,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "25 oz",
      dimension: "rectangular",
      capacityMl: 750,
      capacityOz: 25,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "34 oz",
      dimension: "rectangular",
      capacityMl: 1000,
      capacityOz: 34,
      material: "Bagasse",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "17 oz",
      dimension: "rectangular",
      capacityMl: 500,
      capacityOz: 17,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "22 oz",
      dimension: "rectangular",
      capacityMl: 650,
      capacityOz: 22,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 125
    },
    {
      size: "25 oz",
      dimension: "rectangular",
      capacityMl: 750,
      capacityOz: 25,
      material: "Cornstarch",
      qtyPerBox: 500,
      qtyPerPkt: 125
    }
  ],
  moqPieces: null,
  tagline: "Sustainable rectangular meal containers with secure matching lids in bagasse and cornstarch.",
  summary: "Sustainable rectangular meal containers molded from sugarcane bagasse and cornstarch. Ideal for pasta, curries, rice bowls, and cloud kitchen delivery packaging with secure leak-resistant lids.",
  ratingLabel: "Popular takeaway food container",
  quickFacts: [
    { value: "TBD", label: "Minimum order" },
    { value: "2–3 weeks", label: "Production time" },
    { value: "500 / ctn", label: "Packed" },
    { value: "Yes", label: "Custom print" }
  ],
  sizes: [
    { label: "17 oz", note: "500 mL" },
    { label: "22 oz", note: "650 mL" },
    { label: "25 oz", note: "750 mL" },
    { label: "34 oz", note: "1000 mL" }
  ],
  baseMoq: 20000,
  moqUnit: "pieces",
  material: "Sugarcane Bagasse / Bio-based Cornstarch",
  printing: "Custom embossing or branded sleeve",
  endOfLife: "100% compostable",
  heatRating: "-20°C to 120°C (Microwave & freezer safe)",
  lidFit: "Matching secure stackable lid included",
  cartonPack: "500 units per carton",
  hsCode: "4823.70",
  leadTime: "2–3 weeks",
  shipsFrom: "Nhava Sheva (Mumbai), India",
  overview: [
    {
      heading: "Leak-resistant rectangular profile",
      body: "High sidewalls and reinforced rim ensure secure stacking and reliable closure for takeaway deliveries.",
      bullets: [
        "Available in Bagasse (17oz, 22oz, 25oz, 34oz) and Cornstarch (17oz, 22oz, 25oz)",
        "Oil resistant up to 120°C",
        "100% certified compostable and plastic-free"
      ]
    },
    {
      heading: "Rigid construction for heavy food delivery",
      body: "Sturdy engineered sidewalls prevent bowing or collapsing when stacked inside thermal courier bags.",
      bullets: [
        "Microwave and freezer safe (-20°C to 120°C)",
        "Tight lid seal prevents saucy spills",
        "Standard carton packing of 500 units per box"
      ]
    }
  ],
  certifications: [
    { name: "FDA food-contact", note: "Food contact" },
    { name: "EN 13432", note: "Compostable" }
  ],
  faqs: [
    {
      question: "Can these containers be frozen and reheated?",
      answer: "Yes, safe from -20°C in the freezer up to 120°C in the microwave."
    },
    {
      question: "Are matching lids included in the box?",
      answer: "Yes, matching stackable lids are supplied with each carton order."
    }
  ],
  relatedSlugs: [
    "round-bowl-with-lid",
    "meal-tray-with-lid",
    "bagasse-clamshell"
  ],
  gallery: {
    type: "static",
    art: "box"
  }
};

const mealTrayWithLid = {
  slug: "meal-tray-with-lid",
  name: "Meal Tray with Lid",
  categorySlug: "biodegradable-containers",
  categoryName: "Biodegradable Containers",
  variantType: "dimension",
  variants: [
    {
      size: "2 Compartment",
      dimension: "Round",
      compartments: 2,
      shape: "Round",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 250,
      qtyPerPkt: 50
    },
    {
      size: "2 Compartment",
      dimension: "Rectangle",
      compartments: 2,
      shape: "Rectangle",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 250,
      qtyPerPkt: 50
    },
    {
      size: "3 Compartment",
      dimension: null,
      compartments: 3,
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 250,
      qtyPerPkt: 50
    },
    {
      size: "4 Compartment",
      dimension: null,
      compartments: 4,
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 250,
      qtyPerPkt: 50
    },
    {
      size: "5 Compartment",
      dimension: null,
      compartments: 5,
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 250,
      qtyPerPkt: 50
    }
  ],
  moqPieces: null,
  tagline: "Multi-compartment biodegradable meal trays with secure matching lids for portioned catering and deliveries.",
  summary: "Heavy-duty compostable multi-compartment meal trays with matching snap-lock lids. Engineered for catered meals, combo platters, bento deliveries, and cafeteria food services without flavour crossover.",
  ratingLabel: "Ideal for combo meals, bento & institutional catering",
  quickFacts: [
    { value: "TBD", label: "Minimum order" },
    { value: "2–3 weeks", label: "Production time" },
    { value: "250 / ctn", label: "Packed" },
    { value: "Yes", label: "Custom print" }
  ],
  sizes: [
    { label: "2 Compartment", note: "Round or Rectangle" },
    { label: "3 Compartment", note: "Combo meal" },
    { label: "4 Compartment", note: "Executive lunch" },
    { label: "5 Compartment", note: "Full course bento" }
  ],
  baseMoq: 20000,
  moqUnit: "pieces",
  material: "100% Biodegradable Sugarcane Bagasse",
  printing: "Custom embossing or branded sleeve available",
  endOfLife: "100% Certified Compostable",
  heatRating: "-20°C to 120°C (Oil & water resistant)",
  lidFit: "Tight snap-on clear/compostable lid included",
  cartonPack: "250 units per carton (50 pcs x 5 pkts)",
  hsCode: "4823.70",
  leadTime: "2–3 weeks",
  shipsFrom: "Nhava Sheva (Mumbai), India",
  overview: [
    {
      heading: "Complete separation for portioned meals",
      body: "Deep divider walls isolate gravies, mains, breads, and sides, ensuring clean presentation with zero flavor crossover during courier transit.",
      bullets: [
        "Available in 2, 3, 4, and 5 compartment layouts",
        "2 compartment available in Round and Rectangle formats",
        "3, 4, and 5 compartment engineered for multi-course catering"
      ]
    },
    {
      heading: "Rigid structural rim & lid integration",
      body: "Constructed with a perimeter channel locking into the matching lid to prevent leaks and maintain structural integrity when stacked high.",
      bullets: [
        "Matching tight-fitting lids included",
        "Microwaveable and freezer safe up to 120°C",
        "100% plastic-free, tree-free upcycled sugarcane bagasse"
      ]
    }
  ],
  certifications: [
    { name: "FDA food-contact", note: "Food contact" },
    { name: "EN 13432", note: "Compostable" },
    { name: "ISO 9001", note: "Quality management" }
  ],
  faqs: [
    {
      question: "Do the divider walls seal against the lid?",
      answer: "Yes, the interior compartment dividers align with the lid contours to minimize sauce spillover between sections."
    },
    {
      question: "Which layouts are available?",
      answer: "We offer 2-compartment (in Round and Rectangle shapes), plus 3-compartment, 4-compartment, and 5-compartment formats."
    }
  ],
  relatedSlugs: [
    "rectangle-container-with-lid",
    "round-bowl-with-lid",
    "bagasse-clamshell"
  ],
  gallery: {
    type: "static",
    art: "box"
  }
};

// Insert the 3 new products into the catalogue
filteredProducts.push(roundBowlWithLid, rectangleContainerWithLid, mealTrayWithLid);

// 3. Clean up relatedSlugs across all products to ensure no broken references
const validSlugs = new Set(filteredProducts.map(p => p.slug));

filteredProducts.forEach(p => {
  p.relatedSlugs = (p.relatedSlugs || []).map(s => {
    if (s === 'bagasse-rectangular-container' || s === 'plain-rectangular-food-box') return 'rectangle-container-with-lid';
    if (s === 'top-folding-pizza-box' || s === '3-ply-corrugated-pizza-box' || s === '3-ply-corrugated-garlic-bread-box') return 'round-bowl-with-lid';
    return s;
  }).filter(s => validSlugs.has(s) && s !== p.slug);
  // dedupe
  p.relatedSlugs = [...new Set(p.relatedSlugs)];
});

const output = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(filteredProducts, null, 2)};

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
console.log('Successfully updated products.ts! Total products:', filteredProducts.length);
