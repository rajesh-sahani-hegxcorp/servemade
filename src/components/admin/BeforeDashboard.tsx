import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { QuickSearch, type SearchItem } from './QuickSearch'

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Recently'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 30) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (diffDay > 1) return `${diffDay}d ago`
  if (diffDay === 1) return 'Yesterday'
  if (diffHour > 1) return `${diffHour}h ago`
  if (diffHour === 1) return '1h ago'
  if (diffMin > 1) return `${diffMin}m ago`
  return 'Just now'
}

export const BeforeDashboard = async () => {
  let productsCount = 25
  let categoriesCount = 6
  let missingImagesCount = 0
  let heroHeading = ''
  let searchItems: SearchItem[] = []
  let recentActivities: Array<{
    id: string | number
    title: string
    type: 'Product' | 'Category' | 'Global'
    editUrl: string
    updatedAt: string
    timeFormatted: string
  }> = []

  // Excluded Products List (pending category placement decision)
  const EXCLUDED_PRODUCTS = [
    {
      name: 'Kraft Boat Tray',
      slug: 'kraft-boat-tray',
      inPayload: false,
      note: 'Pending category placement decision',
    },
    {
      name: 'Bagasse Clamshell',
      slug: 'bagasse-clamshell',
      inPayload: false,
      note: 'Pending category placement decision',
    },
    {
      name: 'Kraft Paper Bowl with PET Lid',
      slug: 'kraft-paper-bowl-with-pet-lid',
      inPayload: false,
      note: 'Pending category placement decision',
    },
  ]

  try {
    const payload = await getPayload({ config })

    const [productsRes, categoriesRes, homepageDoc] = await Promise.all([
      payload.find({
        collection: 'products',
        limit: 100,
        depth: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'categories',
        limit: 50,
        depth: 0,
        overrideAccess: true,
      }),
      payload.findGlobal({
        slug: 'homepage',
        overrideAccess: true,
      }),
    ])

    productsCount = productsRes.docs.length
    categoriesCount = categoriesRes.docs.length

    // 1. Missing images count
    missingImagesCount = productsRes.docs.filter(
      (p: any) => !p.images || (Array.isArray(p.images) && p.images.length === 0)
    ).length

    // 2. Homepage hero status
    heroHeading = homepageDoc?.hero?.heading || ''

    // 3. Search items for QuickSearch
    const pItems: SearchItem[] = productsRes.docs.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      type: 'product',
      editUrl: `/admin/collections/products/${p.id}`,
      subtitle: p.material || p.tagline,
    }))

    const cItems: SearchItem[] = categoriesRes.docs.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      type: 'category',
      editUrl: `/admin/collections/categories/${c.id}`,
      subtitle: `/categories/${c.slug}`,
    }))

    searchItems = [
      ...pItems,
      ...cItems,
      {
        id: 'homepage-global',
        name: 'Homepage Content',
        slug: 'homepage',
        type: 'global',
        editUrl: '/admin/globals/homepage',
        subtitle: 'Hero, badges, testimonials',
      },
    ]

    // 4. Recent Activities (top 5 sorted by updatedAt)
    const combinedDocs: any[] = [
      ...productsRes.docs.map((p: any) => ({
        id: p.id,
        title: p.name,
        type: 'Product' as const,
        editUrl: `/admin/collections/products/${p.id}`,
        updatedAt: p.updatedAt,
      })),
      ...categoriesRes.docs.map((c: any) => ({
        id: c.id,
        title: c.name,
        type: 'Category' as const,
        editUrl: `/admin/collections/categories/${c.id}`,
        updatedAt: c.updatedAt,
      })),
    ]

    if (homepageDoc?.updatedAt) {
      combinedDocs.push({
        id: 'homepage',
        title: 'Homepage Global',
        type: 'Global' as const,
        editUrl: '/admin/globals/homepage',
        updatedAt: homepageDoc.updatedAt,
      })
    }

    combinedDocs.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )

    recentActivities = combinedDocs.slice(0, 5).map((doc) => ({
      ...doc,
      timeFormatted: formatRelativeTime(doc.updatedAt),
    }))
  } catch (err) {
    console.error('Failed to load dashboard statistics:', err)
  }

  return (
    <div className="servemade-dashboard-hero">
      {/* 1. Quick Search Bar */}
      <QuickSearch items={searchItems} />

      {/* 2. Welcome Banner Header */}
      <div className="servemade-dashboard-hero__top">
        <div className="servemade-dashboard-hero__intro">
          <div className="servemade-dashboard-hero__badge">
            <span className="servemade-status-dot servemade-status-dot--green" />
            Servemade Management Hub
          </div>
          <h1 className="servemade-dashboard-hero__title">Welcome to Servemade Admin</h1>
          <p className="servemade-dashboard-hero__desc">
            Manage your certified compostable product catalogue, category structures, and live website content from one central workspace.
          </p>
        </div>

        <div className="servemade-dashboard-hero__actions">
          <Link href="/admin/collections/products/create" className="servemade-action-btn servemade-action-btn--primary">
            <span className="servemade-action-btn__icon">+</span>
            <span>New Product</span>
          </Link>
          <Link href="/admin/collections/categories/create" className="servemade-action-btn servemade-action-btn--secondary">
            <span className="servemade-action-btn__icon">+</span>
            <span>New Category</span>
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="servemade-action-btn servemade-action-btn--ghost">
            <span>View Live Site</span>
            <span className="servemade-action-btn__arrow">↗</span>
          </a>
        </div>
      </div>

      {/* 3. PRIMARY FOCUS: Catalogue Health & Pending Items */}
      <div className="servemade-health-panel">
        <div className="servemade-health-panel__header">
          <div className="servemade-health-panel__title-group">
            <div className="servemade-health-panel__icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <h2 className="servemade-health-panel__title">Catalogue Health &amp; Pending Items</h2>
              <p className="servemade-health-panel__subtitle">Action items requiring review and updates</p>
            </div>
          </div>
          <span className="servemade-status-badge servemade-status-badge--amber">
            <span className="servemade-status-dot servemade-status-dot--amber" />
            <span>{EXCLUDED_PRODUCTS.length} Pending reviews</span>
          </span>
        </div>

        <div className="servemade-health-panel__grid">
          {/* Excluded Products Section */}
          <div className="servemade-health-card">
            <div className="servemade-health-card__top">
              <span className="servemade-health-card__heading">Excluded Products</span>
              <span className="servemade-status-badge servemade-status-badge--amber">
                <span className="servemade-status-dot servemade-status-dot--amber" />
                <span>{EXCLUDED_PRODUCTS.length} Not in live navigation</span>
              </span>
            </div>
            <p className="servemade-health-card__desc">
              These items exist in product data but are pending category placement:
            </p>
            <ul className="servemade-attention-list">
              {EXCLUDED_PRODUCTS.map((prod) => (
                <li key={prod.slug} className="servemade-attention-item">
                  <div className="servemade-attention-item__main">
                    <span className="servemade-attention-item__name">{prod.name}</span>
                    <span className="servemade-attention-item__note">{prod.note}</span>
                  </div>
                  <span className="servemade-status-badge servemade-status-badge--grey">Not in Payload</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Photos / Photography Section */}
          <div className="servemade-health-card">
            <div className="servemade-health-card__top">
              <span className="servemade-health-card__heading">Photography &amp; Media</span>
              {missingImagesCount > 0 ? (
                <span className="servemade-status-badge servemade-status-badge--amber">
                  <span className="servemade-status-dot servemade-status-dot--amber" />
                  <span>{missingImagesCount} Products using vector artwork</span>
                </span>
              ) : (
                <span className="servemade-status-badge servemade-status-badge--green">
                  <span className="servemade-status-dot servemade-status-dot--green" />
                  <span>All products photographed</span>
                </span>
              )}
            </div>
            <p className="servemade-health-card__desc">
              All {missingImagesCount} active products currently render fallback vector illustrations. Upload real photographic media to replace artwork.
            </p>
            <div className="servemade-health-card__action">
              <Link href="/admin/collections/products" className="servemade-link-btn">
                View Products Collection →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECONDARY FOCUS: 3 Navigation Shortcut Cards */}
      <div className="servemade-dashboard-cards">
        {/* Products Shortcut Card */}
        <Link href="/admin/collections/products" className="servemade-dash-card">
          <div className="servemade-dash-card__top">
            <div className="servemade-dash-card__stat">
              <span className="servemade-dash-card__count">{productsCount}</span>
              <span className="servemade-dash-card__count-label">Products</span>
            </div>
            <span className="servemade-status-badge servemade-status-badge--green">
              <span className="servemade-status-dot servemade-status-dot--green" />
              <span>Active</span>
            </span>
          </div>
          <h3 className="servemade-dash-card__title">Product Catalogue</h3>
          <p className="servemade-dash-card__text">
            Update specifications, variant matrices, MOQ tiers, certifications &amp; FAQs.
          </p>
          <span className="servemade-dash-card__action">
            Manage Products <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>

        {/* Categories Shortcut Card */}
        <Link href="/admin/collections/categories" className="servemade-dash-card">
          <div className="servemade-dash-card__top">
            <div className="servemade-dash-card__stat">
              <span className="servemade-dash-card__count">{categoriesCount}</span>
              <span className="servemade-dash-card__count-label">Categories</span>
            </div>
            <span className="servemade-status-badge servemade-status-badge--green">
              <span className="servemade-status-dot servemade-status-dot--green" />
              <span>Live</span>
            </span>
          </div>
          <h3 className="servemade-dash-card__title">Product Categories</h3>
          <p className="servemade-dash-card__text">
            Organize tableware, cups, containers, bags &amp; cutlery structures.
          </p>
          <span className="servemade-dash-card__action">
            Manage Categories <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>

        {/* Homepage Shortcut Card */}
        <Link href="/admin/globals/homepage" className="servemade-dash-card">
          <div className="servemade-dash-card__top">
            <div className="servemade-dash-card__stat">
              <span className="servemade-dash-card__count">Global</span>
              <span className="servemade-dash-card__count-label">Content</span>
            </div>
            {heroHeading ? (
              <span className="servemade-status-badge servemade-status-badge--green">
                <span className="servemade-status-dot servemade-status-dot--green" />
                <span>Hero configured</span>
              </span>
            ) : (
              <span className="servemade-status-badge servemade-status-badge--amber">
                <span className="servemade-status-dot servemade-status-dot--amber" />
                <span>Hero not configured</span>
              </span>
            )}
          </div>
          <h3 className="servemade-dash-card__title">Homepage Content</h3>
          <p className="servemade-dash-card__text">
            Customize hero copy, trust badges, stats, client testimonials &amp; CTA sections.
          </p>
          <span className="servemade-dash-card__action">
            Edit Homepage <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>
      </div>

      {/* 5. Recent Activity Panel */}
      <div className="servemade-recent-panel">
        <div className="servemade-recent-panel__header">
          <div className="servemade-recent-panel__title-wrap">
            <span className="servemade-status-dot servemade-status-dot--grey" />
            <h3 className="servemade-recent-panel__title">Recently Updated Content</h3>
          </div>
          <Link href="/admin/collections/products" className="servemade-dash-card__action">
            View All Catalogue Items <span className="servemade-dash-card__arrow">→</span>
          </Link>
        </div>

        <div className="servemade-recent-list">
          {recentActivities.length > 0 ? (
            recentActivities.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.editUrl}
                className="servemade-recent-item"
              >
                <div className="servemade-recent-item__left">
                  <span className="servemade-type-badge">
                    {item.type}
                  </span>
                  <span className="servemade-recent-item__title">{item.title}</span>
                </div>
                <span className="servemade-recent-item__time">{item.timeFormatted}</span>
              </Link>
            ))
          ) : (
            <p className="servemade-attention-desc">No recent document updates found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
