// Load environment
import 'dotenv/config'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './helpers'
import movies from './movies.json' assert { type: 'json' }
import promotedMovies from './featured_movies.json' assert { type: 'json' }

import type { Movie, PromotedMovie } from '../types'

const credentials = {
  host: process.env.MEILISEARCH_HOST ,
  apiKey: process.env.MEILISEARCH_ADMIN_KEY 
}

const INDEX_NAME = 'movies'
const PROMOTED_INDEX_NAME = `promoted-${INDEX_NAME}`

const searchableAttributes = [
  'title', 'overview', 'genre', 'release_date'
]

const displayedAttributes = [
  'id', 'title', 'overview', 'genre', 'poster', 'release_date'
]

const filterableAttributes = [
  ''
]

const rankingRules = [
  ''
]

const sortableAttributes = [
  ''
]


const setup = async () => {
  console.log('🚀 Seeding your Meilisearch instance')

  if (!credentials.host) {
    console.error('Missing `MEILISEARCH_HOST` environment variable')
    process.exit(1)
  }
  if (!credentials.apiKey) {
    console.error('Missing `MEILISEARCH_ADMIN_API_KEY` environment variable')
    process.exit(1)
  }

  const client = new MeiliSearch(credentials)
  console.log(`Using Meilisearch host: ${credentials.host}\nAdmin API key: ${credentials.apiKey}`)

  console.log(`Adding searchable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateSearchableAttributes(searchableAttributes)
  console.log(`Adding searchable attributes to \`${PROMOTED_INDEX_NAME}\``)
  await client.index(PROMOTED_INDEX_NAME).updateSearchableAttributes(['keywords'])

  console.log(`Adding displayed attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateDisplayedAttributes(displayedAttributes)
  console.log(`Adding displayed attributes to \`${PROMOTED_INDEX_NAME}\``)
  await client.index(PROMOTED_INDEX_NAME).updateDisplayedAttributes(displayedAttributes)

  // console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).updateFilterableAttributes(filterableAttributes)
  // console.log(`Adding filterable attributes to \`${FEATURED_INDEX_NAME}\``)
  // await client.index(FEATURED_INDEX_NAME).updateFilterableAttributes(filterableAttributes)

  // console.log(`Adding ranking rules to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).updateRankingRules(rankingRules)
  // console.log(`Adding ranking rules to \`${FEATURED_INDEX_NAME}\``)
  // await client.index(FEATURED_INDEX_NAME).updateRankingRules(rankingRules)

  // console.log(`Adding sortable attributes to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).updateSortableAttributes(sortableAttributes)
  // console.log(`Adding sortable attributes to \`${FEATURED_INDEX_NAME}\``)
  // await client.index(FEATURED_INDEX_NAME).updateSortableAttributes(sortableAttributes)

  console.log(`Adding documents to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).addDocuments(movies as Array<Movie>)
  console.log(`Adding documents to \`${PROMOTED_INDEX_NAME}\``)
  await client.index(PROMOTED_INDEX_NAME).addDocuments(promotedMovies as Array<PromotedMovie>)

  await watchTasks(client, INDEX_NAME)
  await watchTasks(client, PROMOTED_INDEX_NAME)
}

await setup()
