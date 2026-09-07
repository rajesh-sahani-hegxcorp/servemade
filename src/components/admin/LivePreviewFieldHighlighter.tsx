'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Custom Admin component that:
 * 1. Mounts an "Inspect" toggle button into the Live Preview toolbar controls.
 * 2. Manages Inspect mode state and communicates it to the Live Preview iframe.
 * 3. Listens for `servemade-field-hover` postMessage events and visually highlights
 *    the corresponding Payload form field when Inspect mode is ON.
 */
export const LivePreviewFieldHighlighter: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [inspectEnabled, setInspectEnabled] = useState(false)
  const inspectEnabledRef = useRef(false)
  const [toolbarTarget, setToolbarTarget] = useState<HTMLElement | null>(null)

  inspectEnabledRef.current = inspectEnabled

  useEffect(() => {
    let currentHighlightedEl: HTMLElement | null = null

    // Inject highlight style in Admin document head
    const styleId = 'servemade-field-highlighter-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .servemade-live-preview-highlighted {
          outline: 2px solid #2E8B57 !important;
          outline-offset: 3px !important;
          background-color: rgba(46, 139, 87, 0.05) !important;
          border-radius: 8px !important;
          box-shadow: 0 0 0 4px rgba(46, 139, 87, 0.18) !important;
          transition: outline 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
        }
      `
      document.head.appendChild(style)
    }

    // Observer to find Live Preview toolbar controls container
    const findToolbar = () => {
      const el = document.querySelector('.live-preview-toolbar-controls') as HTMLElement | null
      setToolbarTarget(el)
    }

    findToolbar()
    const observer = new MutationObserver(findToolbar)
    observer.observe(document.body, { childList: true, subtree: true })

    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      if (!data) return

      // Respond to handshake request from iframe
      if (data.type === 'servemade-request-inspect-mode') {
        const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
        iframes.forEach((iframe) => {
          try {
            iframe.contentWindow?.postMessage(
              {
                type: 'servemade-inspect-mode',
                enabled: inspectEnabledRef.current,
              },
              '*'
            )
          } catch {}
        })
        return
      }

      if (data.type !== 'servemade-field-hover') return

      // Clear previous highlight
      if (currentHighlightedEl) {
        currentHighlightedEl.classList.remove('servemade-live-preview-highlighted')
        currentHighlightedEl = null
      }

      // If inspect mode is off, ignore hover events
      if (!inspectEnabledRef.current) return

      const fieldPath = data.fieldPath
      if (!fieldPath || typeof fieldPath !== 'string') return

      // Locate matching field element in the Admin DOM
      const target =
        document.getElementById(`field-${fieldPath}`) ||
        document.querySelector(`[name="${fieldPath}"]`) ||
        document.querySelector(`[name^="${fieldPath}."]`) ||
        document.querySelector(`[id^="field-${fieldPath}"]`) ||
        document.querySelector(`label[for="field-${fieldPath}"]`) ||
        document.querySelector(`.field-type__${fieldPath}`) ||
        document.querySelector(`.field-name-${fieldPath}`)

      if (target) {
        const container =
          (target.closest('.field-type') as HTMLElement) ||
          (target.closest('.field-wrapper') as HTMLElement) ||
          (target.parentElement as HTMLElement) ||
          (target as HTMLElement)

        container.classList.add('servemade-live-preview-highlighted')
        currentHighlightedEl = container

        try {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        } catch {
          // Ignore unsupported scroll options in older environments
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      observer.disconnect()
      window.removeEventListener('message', handleMessage)
      if (currentHighlightedEl) {
        currentHighlightedEl.classList.remove('servemade-live-preview-highlighted')
      }
    }
  }, [])

  const toggleInspect = () => {
    const nextState = !inspectEnabled
    setInspectEnabled(nextState)
    inspectEnabledRef.current = nextState

    // Broadcast to all iframes
    const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
    iframes.forEach((iframe) => {
      try {
        iframe.contentWindow?.postMessage(
          {
            type: 'servemade-inspect-mode',
            enabled: nextState,
          },
          '*'
        )
      } catch {}
    })

    // If turned off, remove highlight from any field in DOM
    if (!nextState) {
      document.querySelectorAll('.servemade-live-preview-highlighted').forEach((el) => {
        el.classList.remove('servemade-live-preview-highlighted')
      })
    }
  }

  return (
    <>
      {children}
      {toolbarTarget &&
        createPortal(
          <button
            type="button"
            id="servemade-inspect-toggle"
            onClick={toggleInspect}
            aria-pressed={inspectEnabled}
            title={
              inspectEnabled
                ? 'Inspect mode: ON (Hover over preview to highlight form fields)'
                : 'Inspect mode: OFF (Click to enable hover-to-highlight)'
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              background: inspectEnabled ? '#2E8B57' : 'rgba(255, 255, 255, 0.05)',
              color: inspectEnabled ? '#FFFFFF' : 'inherit',
              border: inspectEnabled ? '1px solid #2E8B57' : '1px solid rgba(128, 128, 128, 0.3)',
              boxShadow: inspectEnabled ? '0 0 8px rgba(46, 139, 87, 0.45)' : 'none',
              userSelect: 'none',
              lineHeight: 1.4,
              marginRight: '4px',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="7" />
              <line x1="12" y1="1" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="1" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="23" y2="12" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            <span>Inspect</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: inspectEnabled ? '#A3E635' : 'rgba(128, 128, 128, 0.5)',
                display: 'inline-block',
                transition: 'background-color 0.15s ease-in-out',
              }}
            />
          </button>,
          toolbarTarget
        )}
    </>
  )
}
