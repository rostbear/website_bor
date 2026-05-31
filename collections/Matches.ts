import { CollectionConfig } from 'payload'

export const Matches: CollectionConfig = {
  slug: 'matches',
  admin: {
    useAsTitle: 'matchLabel',
    defaultColumns: ['matchDate', 'homeTeam', 'awayTeam', 'status'],
  },
  fields: [
    {
      name: 'matchLabel',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data) {
              return `${data.homeTeam || ''} vs ${data.awayTeam || ''}`
            }
            return ''
          },
        ],
      },
    },
    {
      name: 'homeTeam',
      type: 'text',
      required: true,
    },
    {
      name: 'awayTeam',
      type: 'text',
      required: true,
    },
    {
      name: 'matchDate',
      type: 'date',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Palestra Bojan Pavletič, Trieste',
    },
    {
      name: 'homeScore',
      type: 'number',
      admin: {
        description: 'Lasciare vuoto se la partita non è ancora terminata',
      },
    },
    {
      name: 'awayScore',
      type: 'number',
      admin: {
        description: 'Lasciare vuoto se la partita non è ancora terminata',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Programmata', value: 'Programmata' },
        { label: 'In corso', value: 'In corso' },
        { label: 'Terminata', value: 'Terminata' },
      ],
      defaultValue: 'Programmata',
    },
  ],
}
