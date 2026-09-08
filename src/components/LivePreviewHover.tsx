'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * Shared hover listener for Live Preview.
 * When Inspect mode is ON in the admin parent toolbar, hovering any element
 * with `data-field-path` sends a postMessage to highlight the corresponding form field.
 * When Inspect mode is OFF (default), hover events are disabled.
 */
export function LivePreviewHover() {
  const [inspectEnabled, setInspectEnabled] = useState(false)
  const currentFieldPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Only activate when loaded inside an iframe (Live Preview)
    if (typeof window === 'undefined' || window.self === window.top) {
      return
    }

    const handleParentMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'servemade-inspect-mode') {
        setInspectEnabled(Boolean(event.data.enabled))
      }
    }

    window.addEventListener('message', handleParentMessage)

    // Request initial inspect mode state from admin parent window
    window.parent.postMessage({ type: 'servemade-request-inspect-mode' }, '*')

    return () => {
      window.removeEventListener('message', handleParentMessage)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || window.self === window.top) {
      return
    }

    const cursorStyleId = 'servemade-inspect-cursor-style'

    if (!inspectEnabled) {
      // Remove crosshair styling if present
      const existingStyle = document.getElementById(cursorStyleId)
      if (existingStyle) {
        existingStyle.remove()
      }

      // Clear any active highlight when inspect mode is turned off
      if (currentFieldPathRef.current) {
        currentFieldPathRef.current = null
        window.parent.postMessage(
          {
            type: 'servemade-field-hover',
            fieldPath: null,
          },
          '*'
        )
      }
      return
    }

    // Inject crosshair cursor style when inspect mode is active
    if (!document.getElementById(cursorStyleId)) {
      const style = document.createElement('style')
      style.id = cursorStyleId
      style.textContent = `
        body {
          cursor: crosshair !important;
        }
        [data-field-path] {
          cursor: crosshair !important;
        }
      `
      document.head.appendChild(style)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const fieldEl = target?.closest?.('[data-field-path]') as HTMLElement | null
      const fieldPath = fieldEl?.getAttribute('data-field-path') || null

      if (fieldPath !== currentFieldPathRef.current) {
        currentFieldPathRef.current = fieldPath
        window.parent.postMessage(
          {
            type: 'servemade-field-hover',
            fieldPath,
          },
          '*'
        )
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const fieldEl = target?.closest?.('[data-field-path]') as HTMLElement | null
      if (fieldEl) {
        const related = e.relatedTarget as HTMLElement | null
        const nextFieldEl = related?.closest?.('[data-field-path]') as HTMLElement | null
        const nextPath = nextFieldEl?.getAttribute('data-field-path') || null

        if (nextPath !== currentFieldPathRef.current) {
          currentFieldPathRef.current = nextPath
          window.parent.postMessage(
            {
              type: 'servemade-field-hover',
              fieldPath: nextPath,
            },
            '*'
          )
        }
      }
    }

    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      const existingStyle = document.getElementById(cursorStyleId)
      if (existingStyle) {
        existingStyle.remove()
      }
      if (currentFieldPathRef.current) {
        currentFieldPathRef.current = null
        window.parent.postMessage(
          {
            type: 'servemade-field-hover',
            fieldPath: null,
          },
          '*'
        )
      }
    }
  }, [inspectEnabled])

  return null
}
