import type { CollectionConfig } from 'payload'

export const Contributi: CollectionConfig = {
  slug: 'contributi',
  labels: {
    singular: 'Contributo',
    plural: 'Contributi',
  },
  admin: {
    useAsTitle: 'ente',
    defaultColumns: ['year', 'ente', 'importo'],
  },
  access: {
    read: () => true, // Tutti possono leggere
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Anno di incasso',
      admin: {
        description: 'Es. 2024',
      }
    },
    {
      name: 'ente',
      type: 'text',
      required: true,
      label: 'Soggetto Erogante',
      admin: {
        description: 'L\'ente che ha erogato il contributo (es. Regione, Presidenza del Consiglio, ecc.)'
      }
    },
    {
      name: 'causale',
      type: 'text',
      required: true,
      label: 'Causale / Natura del contributo',
    },
    {
      name: 'importo',
      type: 'text',
      required: true,
      label: 'Somma Incassata',
      admin: {
        description: 'Formattare come testo (es. €3.780,16)'
      }
    }
  ],
}
