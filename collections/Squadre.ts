import type { CollectionConfig } from 'payload'

export const Squadre: CollectionConfig = {
  slug: 'squadre',
  labels: {
    singular: 'Squadra',
    plural: 'Squadre',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'importance', 'season', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome della Squadra',
    },
    {
      name: 'season',
      type: 'text',
      required: true,
      label: 'Stagione (es. 2025/2026)',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Categoria (es. Prima Squadra, Under 19 Maschile)',
    },
    {
      name: 'importance',
      type: 'select',
      required: true,
      label: 'Livello di Importanza (Layout)',
      options: [
        { label: 'Primaria (Scheda Grande in alto)', value: 'primary' },
        { label: 'Secondaria (Schede Medie a 2 colonne)', value: 'secondary' },
        { label: 'Terziaria (Schede Piccole a 3 colonne)', value: 'tertiary' },
      ],
      defaultValue: 'tertiary',
      admin: {
        description: 'Seleziona quanto è importante la squadra per determinare come verrà mostrata.',
      }
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Ordine di visualizzazione',
      admin: {
        description: 'Ordina le squadre all\'interno della stessa importanza (es. 1 viene prima di 2).',
      }
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Immagine della Squadra',
    },
  ],
}
