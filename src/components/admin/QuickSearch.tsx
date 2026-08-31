'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export interface SearchItem {
  id: string | number
  name: string
  slug: string
  type: 'product' | 'category' | 'global'
  editUrl: string
  subtitle?: string
}

interface Props {
  items: SearchItem[]
}

export const QuickSearch: React.FC<Props> = ({ items }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const input = document.getElementById('admin-quick-search') as HTMLInputElement
        if (input) {
          input.focus()
          setIsOpen(true)
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredItems = query.trim()
    ? items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.slug.toLowerCase().includes(query.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 8)
    : []

  return (
    <div className="servemade-search-container" ref={containerRef}>
      <div className="servemade-search-bar">
        <svg
          className="servemade-search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          id="admin-quick-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Quick search products, categories, pages... (Cmd + K)"
          className="servemade-search-input"
          autoComplete="off"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="servemade-search-clear"
          >
            ✕
          </button>
        ) : (
          <span className="servemade-search-kbd">⌘K</span>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="servemade-search-dropdown">
          {filteredItems.length > 0 ? (
            <div className="servemade-search-results">
              {filteredItems.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.editUrl}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className="servemade-search-result-item"
                >
                  <div className="servemade-search-result-left">
                    <span className={`servemade-search-badge servemade-search-badge--${item.type}`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className="servemade-search-result-name">{item.name}</span>
                  </div>
                  {item.subtitle && <span className="servemade-search-result-sub">{item.subtitle}</span>}
                  <span className="servemade-search-result-arrow">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="servemade-search-empty">
              No products or categories found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
