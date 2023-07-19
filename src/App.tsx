import { InstantMeiliSearchInstance, instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { InstantSearch, SearchBox, Hits, Index } from 'react-instantsearch-hooks-web';

interface InstantSearchRequest {
  indexName: string
}

const MEILI_HOST = import.meta.env.VITE_MEILISEARCH_HOST
const MEILI_SEARCH_KEY = import.meta.env.VITE_MEILISEARCH_SEARCH_KEY

const meilisearchClient = instantMeiliSearch(MEILI_HOST, MEILI_SEARCH_KEY)

const indexName = 'movies'

const getFeaturedIndexName = (indexName: string) => `featured-${indexName}`

// const instantSearchClient: InstantMeiliSearchInstance = {
//   ...meilisearchClient,
//   search(requests: Array<InstantSearchRequest>) {
//     const allRequests = requests.reduce((acc, request) => {
//       const all: Array<InstantSearchRequest> = acc
//       all.push(request)
//       all.push({
//         ...request,
//         indexName: getFeaturedIndexName(request.indexName)
//       })
//       return all
//     }, [] as Array<InstantSearchRequest>)

//     console.log('Added an additional request to featured-* for each index')
//     console.log(allRequests)

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
//     return meilisearchClient.search(allRequests)
//   },
// };

const instantSearchClient = meilisearchClient

const App = () => (
  <div>
    <h1>Hello React</h1>
    <InstantSearch searchClient={instantSearchClient}>
      <SearchBox />
      <h2>Featured</h2>
      <Index indexName='featured-movies'>
        <Hits />
      </Index>
      <h2>Other results</h2>
      <Index indexName='movies'>
        <Hits />
      </Index>
    </InstantSearch>
  </div>
);

export default App;
