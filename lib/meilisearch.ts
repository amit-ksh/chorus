import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

export const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST_URL,
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY
);
