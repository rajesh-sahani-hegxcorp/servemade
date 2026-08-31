import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'isStandalone', 'hasFlyout', 'moqPieces'],
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
      name: 'hasFlyout',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Enable this for products that show a hover flyout submenu in the mega menu (products with a two-step or genuine branching selector). Should only be true for a small, specific set of products.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'tagline',
      type: 'text',
      required: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: false,
    },
    {
      name: 'ratingLabel',
      type: 'text',
      required: false,
    },
    {
      name: 'material',
      type: 'text',
      required: false,
      admin: {
        description: 'Descriptive material string, e.g. "Sugarcane Bagasse"',
      },
    },
    {
      name: 'materials',
      type: 'select',
      hasMany: true,
      required: false,
      options: ['Bagasse', 'Cornstarch', 'Kraft Paper', 'PLA', 'Other'],
    },
    {
      name: 'printing',
      type: 'text',
      required: false,
    },
    {
      name: 'endOfLife',
      type: 'text',
      required: false,
    },
    {
      name: 'heatRating',
      type: 'text',
      required: false,
    },
    {
      name: 'lidFit',
      type: 'text',
      required: false,
    },
    {
      name: 'cartonPack',
      type: 'text',
      required: false,
    },
    {
      name: 'cartonVolume',
      type: 'text',
      required: false,
    },
    {
      name: 'hsCode',
      type: 'text',
      required: false,
    },
    {
      name: 'leadTime',
      type: 'text',
      required: false,
    },
    {
      name: 'shipsFrom',
      type: 'text',
      required: false,
    },
    {
      name: 'baseMoq',
      type: 'number',
      required: false,
    },
    {
      name: 'moqUnit',
      type: 'select',
      required: false,
      options: ['pieces', 'packs'],
    },
    {
      name: 'colors',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'color',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'variantType',
      type: 'select',
      required: false,
      options: ['capacity', 'dimension'],
    },
    {
      name: 'gallery',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: false,
          options: ['static', 'cup'],
        },
        {
          name: 'art',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'quickFacts',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: false,
        },
        {
          name: 'label',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'sizes',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
        },
        {
          name: 'note',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'overview',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
        },
        {
          name: 'body',
          type: 'textarea',
          required: false,
        },
        {
          name: 'bullets',
          type: 'array',
          required: false,
          fields: [
            {
              name: 'bullet',
              type: 'text',
              required: false,
            },
          ],
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
          required: false,
        },
        {
          name: 'note',
          type: 'text',
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
          required: false,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: false,
        },
      ],
    },
    {
      name: 'relatedSlugs',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'slug',
          type: 'text',
          required: false,
        },
      ],
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
    },
    {
      name: 'variants',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'size',
          type: 'text',
          required: false,
        },
        {
          name: 'dimension',
          type: 'text',
          required: false,
        },
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
          name: 'capacityMl',
          type: 'number',
          required: false,
        },
        {
          name: 'capacityOz',
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
          name: 'compartmentOption',
          type: 'text',
          required: false,
        },
        {
          name: 'compartments',
          type: 'number',
          required: false,
        },
        {
          name: 'shape',
          type: 'select',
          required: false,
          options: ['Round', 'Square', 'Rectangle'],
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
          name: 'qtyPerBox',
          type: 'number',
          required: false,
        },
        {
          name: 'qtyPerPkt',
          type: 'number',
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
