import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { News } from './collections/News'
import { Standings } from './collections/Standings'
import { Matches } from './collections/Matches'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // Opzionale: personalizzazioni dell'interfaccia admin
  },
  collections: [News, Standings, Matches, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '17f4ff065dd94c1b8f49d681015b06a7',
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
