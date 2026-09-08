import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'announcementText',
      label: 'Shipping / Announcement Text',
      type: 'text',
      defaultValue: 'Ships from Nhava Sheva, India — GCC ports in 5–9 days',
      admin: {
        description: 'Text shown in the top utility bar above the header',
      },
    },
    {
      name: 'primaryNav',
      label: 'Primary Navigation',
      type: 'array',
      admin: {
        description: 'Main navigation menu items in the header',
      },
      defaultValue: [
        { label: 'Products', href: '/products' },
        { label: 'Industries', href: '#industries' },
        { label: 'Sustainability', href: '#sustainability' },
        { label: 'Resources', href: '#resources' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'quoteButtonText',
      label: 'Quote Button Text',
      type: 'text',
      defaultValue: 'My quote',
      admin: {
        description: 'Label for the quote cart count pill button',
      },
    },
    {
      name: 'ctaButtonText',
      label: 'CTA Button Text',
      type: 'text',
      defaultValue: 'Get a quote',
      admin: {
        description: 'Label for the main action button in the header',
      },
    },
    {
      name: 'megaMenuBanner',
      label: 'Mega Menu Promo Banner',
      type: 'group',
      admin: {
        description: 'Promo banner shown at the bottom of the Products mega menu dropdown',
      },
      fields: [
        {
          name: 'text',
          label: 'Banner Text',
          type: 'text',
          defaultValue: 'Need custom sizing, shapes, or private-label embossing?',
        },
        {
          name: 'linkText',
          label: 'Link Text',
          type: 'text',
          defaultValue: 'Explore Custom & Private Label →',
        },
        {
          name: 'linkUrl',
          label: 'Link URL',
          type: 'text',
          defaultValue: '/custom-packaging',
        },
      ],
    },
  ],
}
