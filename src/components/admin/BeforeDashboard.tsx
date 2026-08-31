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
    badgeColor: 'green' | 'blue' | 'amber'
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
        badgeColor: 'green' as const,
        editUrl: `/admin/collections/products/${p.id}`,
        updatedAt: p.updatedAt,
      })),
      ...categoriesRes.docs.map((c: any) => ({
        id: c.id,
        title: c.name,
        type: 'Category' as const,
        badgeColor: 'blue' as const,
        editUrl: `/admin/collections/categories/${c.id}`,
        updatedAt: c.updatedAt,
      })),
    ]

    if (homepageDoc?.updatedAt) {
      combinedDocs.push({
        id: 'homepage',
        title: 'Homepage Global',
        type: 'Global' as const,
        badgeColor: 'amber' as const,
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
            <span className="servemade-dashboard-hero__badge-dot" />
            Servemade Management Hub
          </div>
          <h1 className="servemade-dashboard-hero__title">Welcome to Servemade Admin</h1>
          <p className="servemade-dashboard-hero__desc">
            Manage your certified compostable product catalogue, variants, category structures, and live website content from one central workspace.
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

      {/* 3. Primary Navigation Cards (Catalogue, Categories, Homepage with Hero Status) */}
      <div className="servemade-dashboard-cards">
        <Link href="/admin/collections/products" className="servemade-dash-card">
          <div className="servemade-dash-card__header">
            <div className="servemade-dash-card__icon-wrap servemade-dash-card__icon-wrap--green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <span className="servemade-dash-card__pill">{productsCount} Products</span>
          </div>
          <h3 className="servemade-dash-card__title">Product Catalogue</h3>
          <p className="servemade-dash-card__text">
            Update specifications, variant matrices, MOQ tiers, certifications &amp; FAQs.
          </p>
          <span className="servemade-dash-card__action">
            Manage Products <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>

        <Link href="/admin/collections/categories" className="servemade-dash-card">
          <div className="servemade-dash-card__header">
            <div className="servemade-dash-card__icon-wrap servemade-dash-card__icon-wrap--blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
            </div>
            <span className="servemade-dash-card__pill">{categoriesCount} Categories</span>
          </div>
          <h3 className="servemade-dash-card__title">Product Categories</h3>
          <p className="servemade-dash-card__text">
            Organize Biodegradable Tableware, Paper Cups, Containers, Bags &amp; Cutlery.
          </p>
          <span className="servemade-dash-card__action">
            Manage Categories <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>

        <Link href="/admin/globals/homepage" className="servemade-dash-card">
          <div className="servemade-dash-card__header">
            <div className="servemade-dash-card__icon-wrap servemade-dash-card__icon-wrap--amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="servemade-dash-card__pill">Global</span>
          </div>
          <h3 className="servemade-dash-card__title">Homepage Content</h3>
          <p className="servemade-dash-card__text">
            Customize hero copy, trust badges, stats, client testimonials &amp; CTA sections.
          </p>

          {/* Status Preview Line */}
          <div className="servemade-hero-status">
            {heroHeading ? (
              <span className="servemade-hero-status__badge servemade-hero-status__badge--set">
                Hero: ✓ Set ({heroHeading.length > 28 ? `${heroHeading.slice(0, 28)}…` : heroHeading})
              </span>
            ) : (
              <span className="servemade-hero-status__badge servemade-hero-status__badge--unset">
                Hero: ○ Not configured
              </span>
            )}
          </div>

          <span className="servemade-dash-card__action" style={{ marginTop: '0.75rem' }}>
            Edit Homepage <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>
      </div>

      {/* 4. Secondary Widgets: Needs Attention & Recent Activity */}
      <div className="servemade-dashboard-grid-2">
        {/* Needs Attention Widget */}
        <div className="servemade-dash-card servemade-dash-card--attention">
          <div className="servemade-dash-card__header">
            <div className="servemade-dash-card__icon-wrap servemade-dash-card__icon-wrap--red">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <span className="servemade-dash-card__pill servemade-dash-card__pill--warning">
              Needs Attention
            </span>
          </div>

          <h3 className="servemade-dash-card__title">Catalogue Health &amp; Pending Items</h3>
          
          <div className="servemade-attention-section">
            <div className="servemade-attention-header">
              <span className="servemade-attention-tag">
                {EXCLUDED_PRODUCTS.length} Excluded from Live Site
              </span>
            </div>
            <ul className="servemade-attention-list">
              {EXCLUDED_PRODUCTS.map((prod) => (
                <li key={prod.slug} className="servemade-attention-item">
                  <div className="servemade-attention-item__main">
                    <span className="servemade-attention-item__name">{prod.name}</span>
                    <span className="servemade-attention-item__note">{prod.note}</span>
                  </div>
                  <span className="servemade-attention-badge">Not in Payload</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="servemade-attention-section" style={{ marginTop: '0.85rem' }}>
            <div className="servemade-attention-header">
              <span className="servemade-attention-tag">
                {missingImagesCount} Products Missing Photos
              </span>
            </div>
            <p className="servemade-attention-desc">
              All {missingImagesCount} active products currently render stylized vector illustrations. Upload photographic media to display real photography.
            </p>
            <Link
              href="/admin/collections/products"
              className="servemade-attention-link"
            >
              View Products Collection →
            </Link>
          </div>
        </div>

        {/* Recent Activity Widget */}
        <div className="servemade-dash-card">
          <div className="servemade-dash-card__header">
            <div className="servemade-dash-card__icon-wrap servemade-dash-card__icon-wrap--purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="servemade-dash-card__pill">Recent Activity</span>
          </div>

          <h3 className="servemade-dash-card__title">Recently Updated Content</h3>
          
          <div className="servemade-recent-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.editUrl}
                  className="servemade-recent-item"
                >
                  <div className="servemade-recent-item__left">
                    <span className={`servemade-search-badge servemade-search-badge--${item.type.toLowerCase()}`}>
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

          <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
            <Link href="/admin/collections/products" className="servemade-dash-card__action">
              View All Catalogue Items <span className="servemade-dash-card__arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
