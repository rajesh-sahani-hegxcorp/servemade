import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'displayOrder'],
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
  ],
}
