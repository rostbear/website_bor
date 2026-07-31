import { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsor',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Sponsor',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      label: 'URL Sito Web (opzionale)',
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      label: 'Ordine di visualizzazione (opzionale)',
    }
  ],
}
