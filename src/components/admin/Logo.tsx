import React from 'react'

export const Logo: React.FC = () => {
  return (
    <svg
      className="graphic-logo"
      viewBox="0 0 210 38"
      height="38"
      width="210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
      }}
    >
      {/* Serve Made Green Rounded Leaf Badge */}
      <rect width="36" height="36" rx="9" fill="#2E8B57" y="1" />
      <path d="M11 26c0-7.8 4.8-12.6 14.4-14.4-1.8 10.2-6.6 14.4-14.4 14.4Z" fill="#ffffff" />

      {/* Brand Text "Serve Made" */}
      <text
        x="48"
        y="21"
        fill="var(--theme-text, #1e252b)"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        Serve Made
      </text>

      {/* Sub-label "ADMIN PANEL" */}
      <text
        x="48"
        y="33"
        fill="#2E8B57"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        ADMIN PANEL
      </text>
    </svg>
  )
}
