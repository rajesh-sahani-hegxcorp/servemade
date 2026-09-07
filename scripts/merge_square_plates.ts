import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const squarePlateProduct = {
  slug: "bagasse-square-plate",
  name: "Bagasse Square Plate",
  categorySlug: "plates-bowls",
  categoryName: "Biodegradable Products",
  variantType: "dimension",
  compartmentOptions: ["3-Compartment", "4-Compartment", "5-Compartment"],
  variants: [
    {
      size: "9 in",
      dimension: "9 in square",
      compartmentOption: "3-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 1000,
      qtyPerPkt: 25
    },
    {
      size: "4 Compartment",
      dimension: "4-compartment meal tray",
      compartmentOption: "4-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 500,
      qtyPerPkt: 25
    },
    {
      size: "5 Compartment",
      dimension: "5-compartment thali tray",
      compartmentOption: "5-Compartment",
      capacityMl: null,
      capacityOz: null,
      qtyPerBox: 500,
      qtyPerPkt: 25
    }
  ],
  moqPieces: null,
  tagline: "Rigid, compartmented square bagasse plates and meal trays for catered events and portioned dining.",
  summary: "Heavy-duty sugarcane bagasse square plates and meal trays molded with elevated dividing barriers. Available in 3-Compartment, 4-Compartment, and 5-Compartment thali layouts to keep sauces, sides, and curries cleanly separated.",
  ratingLabel: "Top pick for multi-dish dining & thali service",
  quickFacts: [
    {
      value: "TBD",
      label: "Minimum order"
    },
    {
      value: "2–3 weeks",
      label: "Production time"
    },
    {
      value: "500–1000 / ctn",
      label: "Packed"
    },
    {
      value: "Yes",
      label: "Custom print"
    }
  ],
  sizes: [
    {
      label: "9 in",
      note: "3-CP square"
    },
    {
      label: "4-CP",
      note: "Multi-dish tray"
    },
    {
      label: "5-CP",
      note: "Thali meal tray"
    }
  ],
  baseMoq: 20000,
  moqUnit: "pieces",
  material: "100% biodegradable sugarcane bagasse",
  printing: "Custom branding available on rim",
  endOfLife: "100% commercially compostable",
  cartonPack: "500–1,000 units per carton",
  hsCode: "4823.70",
  leadTime: "2–3 weeks",
  shipsFrom: "Nhava Sheva (Mumbai), India",
  overview: [
    {
      heading: "Partitioned square & thali configurations",
      body: "Engineered with deep wells and rigid divider barriers to hold main dishes, breads, and gravies without liquid crossover or structural bending.",
      bullets: [
        "3-Compartment: 9-inch square format for combo platters",
        "4-Compartment: Executive lunch and catering tray layout",
        "5-Compartment: Authentic multi-course thali service",
        "100% plant-based compostable sugarcane fiber"
      ]
    },
    {
      heading: "Cut-resistant & heavy-load stability",
      body: "High-density molded fibers provide cut resistance and superior rigidity compared to standard paper plates.",
      bullets: [
        "Leakproof and naturally oil resistant",
        "Microwave safe up to 120°C and freezer safe",
        "Rigid rim construction for one-handed carrying"
      ]
    }
  ],
  certifications: [
    {
      name: "FDA food-contact",
      note: "Direct food contact"
    },
    {
      name: "EN 13432",
      note: "Industrial compostable"
    }
  ],
  faqs: [
    {
      question: "Do gravies leak between sections?",
      answer: "No, molded internal divider ridges effectively prevent sauces and liquids from crossing over."
    },
    {
      question: "Are these plates microwave and freezer safe?",
      answer: "Yes, they are safe for reheating in microwaves up to 120°C and can be used for freezer storage."
    }
  ],
  relatedSlugs: [
    "bagasse-round-plate",
    "bagasse-round-bowl"
  ],
  gallery: {
    type: "static",
    art: "plate"
  }
}

async function run() {
  const removedSlugs = new Set([
    'bagasse-3-compartment-square-plate',
    'bagasse-3-compartment-combo-meal-plate',
    'bagasse-4-compartment-meal-tray',
    'bagasse-5-compartment-meal-tray'
  ])

  // 1. Update src/data/products.ts
  const prodPath = path.join(__dirname, '../src/data/products.ts')
  const prodCode = fs.readFileSync(prodPath, 'utf8')
  const parts = prodCode.split('export const PRODUCTS: Product[] = ')
  const jsonPart = (parts[1] || '').split('export function findProduct')[0]?.trim().replace(/;$/, '') || '[]'
  const products = eval(jsonPart)

  const updatedProducts = products.filter((p: any) => !removedSlugs.has(p.slug) && p.slug !== 'bagasse-square-plate')
  updatedProducts.push(squarePlateProduct)

  // Update relatedSlugs across all products
  const validSlugs = new Set(updatedProducts.map((p: any) => p.slug))
  updatedProducts.forEach((p: any) => {
    p.relatedSlugs = (p.relatedSlugs || []).map((s: string) => {
      if (removedSlugs.has(s)) return 'bagasse-square-plate'
      return s
    }).filter((s: string) => validSlugs.has(s) && s !== p.slug)
    p.relatedSlugs = [...new Set(p.relatedSlugs)]
  })

  const newProdTs = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(updatedProducts, null, 2)};

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
`
  fs.writeFileSync(prodPath, newProdTs, 'utf8')
  console.log('Updated src/data/products.ts. Total products:', updatedProducts.length)

  // 2. Update src/data/products.json if exists
  const jsonPath = path.join(__dirname, '../src/data/products.json')
  if (fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify(updatedProducts, null, 2), 'utf8')
    console.log('Updated src/data/products.json')
  }
  const rootJsonPath = path.join(__dirname, '../products.json')
  if (fs.existsSync(rootJsonPath)) {
    fs.writeFileSync(rootJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf8')
    console.log('Updated root products.json')
  }

  // 3. Update Payload CMS Database
  console.log('Connecting to Payload CMS DB...')
  const payload = await getPayload({ config })

  // Find Category for plates-bowls
  const catRes = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'plates-bowls' } },
    overrideAccess: true,
  })
  const categoryId = catRes.docs[0]?.id || 5

  // Delete old products in Payload
  for (const slug of Array.from(removedSlugs)) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      overrideAccess: true,
    })
    for (const doc of existing.docs) {
      await payload.delete({
        collection: 'products',
        id: doc.id,
        overrideAccess: true,
      })
      console.log(`Deleted old product from Payload: ${slug} (ID: ${doc.id})`)
    }
  }

  // Check if bagasse-square-plate exists in Payload
  const existingSquare = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'bagasse-square-plate' } },
    overrideAccess: true,
  })

  const payloadDocData: any = {
    name: squarePlateProduct.name,
    slug: squarePlateProduct.slug,
    category: categoryId,
    variantType: squarePlateProduct.variantType,
    tagline: squarePlateProduct.tagline,
    summary: squarePlateProduct.summary,
    ratingLabel: squarePlateProduct.ratingLabel,
    baseMoq: squarePlateProduct.baseMoq,
    moqUnit: squarePlateProduct.moqUnit,
    material: squarePlateProduct.material,
    printing: squarePlateProduct.printing,
    endOfLife: squarePlateProduct.endOfLife,
    cartonPack: squarePlateProduct.cartonPack,
    hsCode: squarePlateProduct.hsCode,
    leadTime: squarePlateProduct.leadTime,
    shipsFrom: squarePlateProduct.shipsFrom,
    quickFacts: squarePlateProduct.quickFacts,
    sizes: squarePlateProduct.sizes,
    overview: squarePlateProduct.overview.map(o => ({
      heading: o.heading,
      body: o.body,
      bullets: o.bullets.map(b => ({ bullet: b }))
    })),
    certifications: squarePlateProduct.certifications,
    faqs: squarePlateProduct.faqs,
    relatedSlugs: squarePlateProduct.relatedSlugs.map(s => ({ slug: s })),
    gallery: squarePlateProduct.gallery,
    variants: squarePlateProduct.variants.map(v => ({
      size: v.size,
      dimension: v.dimension,
      compartmentOption: v.compartmentOption,
      qtyPerBox: v.qtyPerBox,
      qtyPerPkt: v.qtyPerPkt,
    })),
  }

  if (existingSquare.docs.length > 0) {
    await payload.update({
      collection: 'products',
      id: existingSquare.docs[0].id,
      data: payloadDocData,
      overrideAccess: true,
    })
    console.log(`Updated bagasse-square-plate in Payload (ID: ${existingSquare.docs[0].id})`)
  } else {
    const created = await payload.create({
      collection: 'products',
      data: payloadDocData,
      overrideAccess: true,
    })
    console.log(`Created bagasse-square-plate in Payload (ID: ${created.id})`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
