import { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Notizia',
    plural: 'Notizie',
  },
  admin: {
    useAsTitle: 'title_it',
    defaultColumns: ['title_it', 'title_sl', 'category', 'publishDate'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title_it',
          type: 'text',
          required: true,
          label: 'Titolo (Italiano)',
        },
        {
          name: 'title_sl',
          type: 'text',
          required: true,
          label: 'Titolo (Sloveno)',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data && data.title_it) {
              return data.title_it
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            if (value) {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            return value
          },
        ],
      },
    },

    {
      name: 'content_it',
      type: 'richText',
      required: true,
      label: 'Contenuto (Italiano)',
    },
    {
      name: 'content_sl',
      type: 'richText',
      required: true,
      label: 'Contenuto (Sloveno)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Prima Squadra', value: 'Prima Squadra' },
        { label: 'Giovanili', value: 'Giovanili' },
        { label: 'Società', value: 'Società' },
        { label: 'Minibasket', value: 'Minibasket' },
      ],
      defaultValue: 'Prima Squadra',
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
