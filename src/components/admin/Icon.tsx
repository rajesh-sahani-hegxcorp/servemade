import React from 'react'

export const Icon: React.FC = () => {
  return (
    <svg
      className="graphic-icon"
      viewBox="0 0 30 30"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    >
      <rect width="30" height="30" rx="8" fill="#2E8B57" />
      <path d="M9 21c0-6.5 4-10.5 12-12-1.5 8.5-5.5 12-12 12Z" fill="#ffffff" />
    </svg>
  )
}
