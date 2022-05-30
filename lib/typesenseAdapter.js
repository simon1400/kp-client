import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.TYPESENSE_SEARCH_ONLY_API_KEY, // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: process.env.TYPESENSE_PROTOCOL,
    },
  ],
  enableCors: true,
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  collectionSpecificSearchParameters: {
    "categoryProducts": {
      query_by: "category,brand,categorySlug,brandsSlug",
    },
    "produkties": {
      query_by: "title,category,brand,categorySlug,brandsSlug"
    },
    "categories": {
      query_by: "title"
    },
    "brands": {
      query_by: "title"
    },
    "blogs": {
      query_by: "title"
    }
  }
});

export const searchClient = typesenseAdapter.searchClient;