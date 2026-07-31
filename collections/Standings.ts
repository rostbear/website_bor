import { CollectionConfig } from 'payload'

export const Standings: CollectionConfig = {
  slug: 'standings',
  labels: {
    singular: 'Squadra in Classifica',
    plural: 'Classifica',
  },
  admin: {
    useAsTitle: 'teamName',
    defaultColumns: ['teamName', 'points', 'won', 'lost'],
  },
  fields: [
    {
      name: 'position',
      type: 'number',
      required: true,
      label: 'Posizione (es. 1, 2, 3)',
      defaultValue: 1,
      admin: { hidden: true }
    },
    {
      name: 'teamName',
      type: 'text',
      required: true,
      unique: true,
      label: 'Squadra',
    },
    {
      name: 'points',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Punti',
    },
    {
      name: 'won',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Vinte',
    },
    {
      name: 'lost',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Perse',
    },
    {
      name: 'played',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Partite Giocate',
      admin: { hidden: true }
    },
    {
      name: 'pointsMade',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Canestri Fatti',
      admin: { hidden: true }
    },
    {
      name: 'pointsAgainst',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Canestri Subiti',
      admin: { hidden: true }
    },
  ],
}
