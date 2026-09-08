import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyDescription',
      label: 'Company Description',
      type: 'textarea',
      defaultValue:
        'Serve Made is an India-based B2B exporter of certified compostable food packaging — bagasse tableware, paper cups, takeaway boxes, bags, cutlery and straws — serving importers, distributors and food-service groups across the GCC and beyond.',
      admin: {
        description: 'Paragraph describing the company shown under the footer logo',
      },
    },
    {
      name: 'columns',
      label: 'Navigation Columns (Non-Products)',
      type: 'array',
      admin: {
        description:
          'Footer link columns for Company, Get Started, etc. (Note: The Products column is automatically generated from live Categories).',
      },
      defaultValue: [
        {
          heading: 'Company',
          links: [
            { label: 'Why us', href: '/why-serve-made' },
            { label: 'Sustainability', href: '/sustainability' },
            { label: 'Resources', href: '/resources' },
          ],
        },
        {
          heading: 'Get started',
          links: [
            { label: 'Request a quote', href: '/quote' },
            { label: 'Ask for samples', href: '/samples' },
            { label: 'Download catalogue', href: '/resources/catalogue' },
          ],
        },
      ],
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
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
      ],
    },
    {
      name: 'legalLinks',
      label: 'Legal Links',
      type: 'array',
      admin: {
        description: 'Legal & compliance links rendered in the footer bottom bar',
      },
      defaultValue: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
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
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      admin: {
        description: 'Optional social profile links (e.g. LinkedIn, Instagram)',
      },
      defaultValue: [],
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
