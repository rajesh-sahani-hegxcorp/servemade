import React from 'react'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <div
      className="graphic-logo"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxHeight: '36px',
      }}
    >
      <Image
        src="/brand/servemade-logo.png"
        alt="Servemade Admin"
        width={180}
        height={28}
        priority
        style={{
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <span
        style={{
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: '#2E8B57',
          textTransform: 'uppercase',
          paddingLeft: '6px',
          borderLeft: '1.5px solid #E3E8E6',
          lineHeight: 1,
        }}
      >
        Admin
      </span>
    </div>
  )
}
