import { CollectionConfig } from 'payload'

export const Standings: CollectionConfig = {
  slug: 'standings',
  admin: {
    useAsTitle: 'teamName',
    defaultColumns: ['teamName', 'points', 'played', 'won', 'lost'],
  },
  fields: [
    {
      name: 'teamName',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'points',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'played',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'won',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'lost',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'pointsMade',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Canestri Fatti',
    },
    {
      name: 'pointsAgainst',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Canestri Subiti',
    },
  ],
}
