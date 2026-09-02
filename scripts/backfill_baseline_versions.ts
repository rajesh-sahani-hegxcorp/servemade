import { getPayload } from 'payload'
import config from '../src/payload.config'

async function backfillBaselineVersions() {
  console.log('--- STARTING PAYLOAD BASELINE VERSION BACKFILL ---')
  const payload = await getPayload({ config })

  // 1. Backfill Categories (6 items)
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
  console.log(`Found ${categories.docs.length} base categories to version.`)

  for (const cat of categories.docs) {
    await payload.update({
      collection: 'categories',
      id: cat.id,
      data: {}, // No changes to existing fields
      draft: false, // Creates official published version snapshot in _categories_v
      overrideAccess: true,
    })
    console.log(`  ✓ Version created for category: ${cat.name} (ID: ${cat.id})`)
  }

  // 2. Backfill Products (25 items)
  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
  console.log(`\nFound ${products.docs.length} base products to version.`)

  for (const prod of products.docs) {
    await payload.update({
      collection: 'products',
      id: prod.id,
      data: {}, // No changes to existing fields
      draft: false, // Creates official published version snapshot in _products_v + 11 sub-tables
      overrideAccess: true,
    })
    console.log(`  ✓ Version created for product: ${prod.name} (ID: ${prod.id})`)
  }

  console.log('\n--- BACKFILL COMPLETE ---')
  process.exit(0)
}

backfillBaselineVersions().catch((err) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
