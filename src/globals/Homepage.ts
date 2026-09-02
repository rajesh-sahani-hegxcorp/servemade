import type { GlobalConfig } from 'payload'
import { generatePreviewPath } from '@/lib/preview'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
    },
  },
  admin: {
    group: 'Website',
    livePreview: {
      url: () => generatePreviewPath({ path: '/' }),
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'ctaText',
          type: 'text',
          required: false,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'customBranding',
      type: 'group',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: false,
        },
        {
          name: 'heading',
          type: 'text',
          required: false,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'bullets',
          type: 'array',
          required: false,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          required: false,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'resources',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          required: false,
        },
        {
          name: 'linkUrl',
          type: 'text',
          required: false,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Download', value: 'download' },
            { label: 'File', value: 'file' },
            { label: 'Recycle', value: 'recycle' },
          ],
          required: false,
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'authorPhoto',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: false,
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
        },
        {
          name: 'text',
          type: 'textarea',
          required: false,
        },
        {
          name: 'buttonText',
          type: 'text',
          required: false,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
