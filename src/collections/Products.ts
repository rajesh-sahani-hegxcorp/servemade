import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'isStandalone', 'moqPieces'],
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'isStandalone',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check this for products that are NOT a variant of another product family (e.g. 5-CP Meal Tray is standalone, not a variant of Bagasse Round Plate).',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'moqPieces',
      type: 'number',
      required: false,
      defaultValue: null,
    },
    {
      name: 'variants',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'material',
          type: 'select',
          required: false,
          options: ['PLA', 'Bagasse', 'Cornstarch', 'Kraft Paper', 'Other'],
        },
        {
          name: 'sizeOz',
          type: 'number',
          required: false,
        },
        {
          name: 'compartmentCount',
          type: 'select',
          required: false,
          options: ['Plain', '2', '3', '4', '5'],
        },
        {
          name: 'shape',
          type: 'select',
          required: false,
          options: ['Round', 'Square'],
        },
        {
          name: 'wallType',
          type: 'select',
          required: false,
          options: ['Single Wall', 'Double Wall', 'Ripple Wall'],
        },
        {
          name: 'color',
          type: 'text',
          required: false,
        },
        {
          name: 'sku',
          type: 'text',
          required: false,
        },
        {
          name: 'certificationNote',
          type: 'text',
          required: false,
          admin: {
            description: "If AI-generated or unverified, prefix with '[DRAFT — verify]'",
          },
        },
      ],
    },
  ],
}
