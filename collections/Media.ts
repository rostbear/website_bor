import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Immagine',
    plural: 'Media (Immagini)',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    staticURL: '/media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
