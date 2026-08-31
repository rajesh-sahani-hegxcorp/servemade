import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
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
      name: 'stats',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
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
