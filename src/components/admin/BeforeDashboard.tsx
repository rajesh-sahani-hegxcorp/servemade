import React from 'react'
import Link from 'next/link'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className="servemade-dashboard-hero">
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
            <span className="servemade-dash-card__pill">25 Products</span>
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
            <span className="servemade-dash-card__pill">6 Categories</span>
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
          <span className="servemade-dash-card__action">
            Edit Homepage <span className="servemade-dash-card__arrow">→</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
