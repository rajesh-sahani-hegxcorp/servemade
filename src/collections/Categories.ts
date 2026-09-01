import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  versions: {
    drafts: true,
  },
  admin: {
    group: 'Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'displayOrder', 'art', 'moq'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/categories/${data?.slug || ''}?preview=true`,
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
  hooks: {
    beforeValidate: [
      async ({ data, operation, originalDoc }) => {
        if (operation === 'update' && data?.slug && originalDoc?.slug && data.slug !== originalDoc.slug) {
          throw new ValidationError({
            errors: [
              {
                message: 'Slug cannot be changed after creation. Edit the display name instead.',
                path: 'slug',
              },
            ],
          })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      access: {
        update: () => false,
      },
      admin: {
        description: 'Unique URL identifier. Locked after creation.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: false,
    },
    {
      name: 'art',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'text',
      required: false,
    },
    {
      name: 'moq',
      type: 'text',
      required: false,
    },
  ],
}
