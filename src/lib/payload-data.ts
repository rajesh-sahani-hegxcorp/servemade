import { getPayload } from 'payload'
import config from '@/payload.config'
import type {
  Product,
  ProductCategory,
  ProductVariant,
  ProductSize,
  OverviewColumn,
  CertRef,
  QuickFact,
  Faq,
  ProductGallery,
  ProductArtType,
} from '@/types'

/**
 * Maps a raw Payload Category document into the application's ProductCategory type.
 */
function mapCategory(doc: any): ProductCategory {
  let description = ''
  if (typeof doc.description === 'string') {
    description = doc.description
  } else if (doc.description && typeof doc.description === 'object') {
    description = doc.description?.root?.children?.[0]?.children?.[0]?.text || ''
  }

  const category: ProductCategory = {
    art: (doc.art || 'plate') as ProductArtType,
    name: doc.name || '',
    href: `/categories/${doc.slug}`,
    description: description || '',
  }

  if (doc.moq) category.moq = doc.moq
  if (doc.image) category.image = doc.image

  return category
}

/**
 * Maps a raw Payload Product document into the application's Product type.
 */
function mapProduct(doc: any): Product {
  const category = typeof doc.category === 'object' ? doc.category : null

  // Flatten colors array if present
  const colors: string[] | undefined = doc.colors?.length
    ? doc.colors.map((c: any) => (typeof c === 'string' ? c : c.color)).filter(Boolean)
    : undefined

  // Flatten relatedSlugs array
  const relatedSlugs: string[] = doc.relatedSlugs?.length
    ? doc.relatedSlugs.map((r: any) => (typeof r === 'string' ? r : r.slug)).filter(Boolean)
    : []

  // Overview with flattened bullets
  const overview: OverviewColumn[] = doc.overview?.length
    ? doc.overview.map((o: any) => ({
        heading: o.heading || '',
        body: o.body || '',
        bullets: o.bullets?.length
          ? o.bullets.map((b: any) => (typeof b === 'string' ? b : b.bullet)).filter(Boolean)
          : [],
      }))
    : []

  // Reconstruct gallery
  const galleryType = doc.gallery?.type || (doc.galleryType as string)
  const galleryArt = (doc.gallery?.art || doc.galleryArt || 'plate') as ProductArtType
  const gallery: ProductGallery = galleryType === 'cup' ? { type: 'cup' } : { type: 'static', art: galleryArt }

  // Quick facts
  const quickFacts: QuickFact[] | undefined = doc.quickFacts?.length
    ? doc.quickFacts.map((q: any) => ({ value: q.value || '', label: q.label || '' }))
    : undefined

  // Sizes
  const sizes: ProductSize[] = doc.sizes?.length
    ? doc.sizes.map((s: any) => ({ label: s.label || '', note: s.note || '' }))
    : []

  // Certifications
  const certifications: CertRef[] = doc.certifications?.length
    ? doc.certifications.map((c: any) => ({ name: c.name || '', note: c.note || '' }))
    : []

  // FAQs
  const faqs: Faq[] = doc.faqs?.length
    ? doc.faqs.map((f: any) => ({ question: f.question || '', answer: f.answer || '' }))
    : []

  // Variants (omits fields not part of the ProductVariant type)
  const variants: ProductVariant[] = doc.variants?.length
    ? doc.variants.map((v: any) => {
        const item: ProductVariant = {
          size: v.size || '',
          dimension: v.dimension ?? null,
          capacityMl: v.capacityMl != null ? Number(v.capacityMl) : null,
          capacityOz: v.capacityOz != null ? Number(v.capacityOz) : null,
          qtyPerBox: v.qtyPerBox != null ? Number(v.qtyPerBox) : null,
          qtyPerPkt: v.qtyPerPkt != null ? Number(v.qtyPerPkt) : null,
        }
        if (v.material) item.material = v.material
        if (v.shape) item.shape = v.shape
        if (v.compartments != null) item.compartments = Number(v.compartments)
        if (v.compartmentOption) item.compartmentOption = v.compartmentOption
        return item
      })
    : []

  const product: Product = {
    slug: doc.slug,
    name: doc.name,
    categorySlug: category?.slug || '',
    categoryName: category?.name || '',
    variantType: doc.variantType || 'capacity',
    variants,
    moqPieces: doc.moqPieces != null ? Number(doc.moqPieces) : null,
    tagline: doc.tagline || '',
    summary: doc.summary || '',
    ratingLabel: doc.ratingLabel || '',
    sizes,
    baseMoq: doc.baseMoq != null ? Number(doc.baseMoq) : 50000,
    moqUnit: doc.moqUnit || 'pieces',
    material: doc.material || '',
    printing: doc.printing || '',
    endOfLife: doc.endOfLife || '',
    leadTime: doc.leadTime || '',
    shipsFrom: doc.shipsFrom || '',
    overview,
    certifications,
    faqs,
    relatedSlugs,
    gallery,
  }

  if (doc.materials?.length) product.materials = doc.materials
  if (colors?.length) product.colors = colors
  if (quickFacts?.length) product.quickFacts = quickFacts
  if (doc.heatRating) product.heatRating = doc.heatRating
  if (doc.lidFit) product.lidFit = doc.lidFit
  if (doc.cartonPack) product.cartonPack = doc.cartonPack
  if (doc.cartonVolume) product.cartonVolume = doc.cartonVolume
  if (doc.hsCode) product.hsCode = doc.hsCode

  return product
}

/**
 * Fetch all Category documents from Payload and return formatted ProductCategory objects.
 */
export async function getAllCategories(): Promise<ProductCategory[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'displayOrder',
    depth: 0,
    overrideAccess: true,
  })

  return res.docs.map(mapCategory)
}

/**
 * Fetch all Product documents from Payload (with populated category relation)
 * and return formatted Product objects.
 */
export async function getAllProducts(): Promise<Product[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'products',
    limit: 500,
    depth: 1,
    overrideAccess: true,
  })

  return res.docs.map(mapProduct)
}

/**
 * Find a single product by its URL slug.
 */
export async function findProduct(
  slug: string,
  options?: { draft?: boolean }
): Promise<Product | undefined> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
    draft: options?.draft,
    overrideAccess: true,
  })

  if (!res.docs.length) return undefined
  return mapProduct(res.docs[0])
}

/**
 * Find a single category by its URL slug.
 */
export async function findCategory(
  slug: string,
  options?: { draft?: boolean }
): Promise<ProductCategory | undefined> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 0,
    draft: options?.draft,
    overrideAccess: true,
  })

  if (!res.docs.length) return undefined
  return mapCategory(res.docs[0])
}

/**
 * Find all products belonging to a specific category slug.
 */
export async function findProductsByCategory(categorySlug: string): Promise<Product[]> {
  const payload = await getPayload({ config })

  // Find the category document ID first for optimal relation query
  const catRes = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: categorySlug },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (!catRes.docs.length) return []
  const categoryDoc = catRes.docs[0]

  const res = await payload.find({
    collection: 'products',
    where: {
      category: { equals: categoryDoc.id },
    },
    limit: 500,
    depth: 1,
    overrideAccess: true,
  })

  return res.docs.map(mapProduct)
}

/**
 * Resolve related product objects from a product's relatedSlugs array.
 */
export async function resolveRelatedProducts(product: Product): Promise<Product[]> {
  if (!product.relatedSlugs?.length) return []

  const results = await Promise.all(product.relatedSlugs.map((slug) => findProduct(slug)))
  return results.filter((p): p is Product => Boolean(p))
}

/**
 * Fetch Homepage global document from Payload.
 */
export async function getHomepage(options?: { draft?: boolean }): Promise<any> {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'homepage',
    draft: options?.draft,
    overrideAccess: true,
  })
}
