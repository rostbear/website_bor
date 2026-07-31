import type { GlobalConfig } from 'payload'

export const Live: GlobalConfig = {
  slug: 'live-stream',
  label: {
    en: 'Live Stream',
    it: 'Diretta Live',
  },
  admin: {
    description: 'Impostazioni per la pagina Live del sito.',
  },
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: {
        en: 'Is Live Now?',
        it: 'C\'è una diretta in corso?',
      },
      defaultValue: false,
      admin: {
        description: 'Spunta questa casella se vuoi mostrare il video nella pagina Live.',
      }
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: {
        en: 'YouTube Live URL or Video ID',
        it: 'Link o ID del video YouTube (es. https://youtube.com/watch?v=...)',
      },
      admin: {
        description: 'Inserisci l\'URL del video YouTube.',
        condition: (data, siblingData) => {
          return siblingData.isActive;
        }
      }
    }
  ]
}
