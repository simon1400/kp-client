import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const SEARCH_API = "http://kp-maili-search.hardart.cz"
// const SEARCH_API = "http://89.221.216.23:7700"

const searchClient = instantMeiliSearch(
  SEARCH_API,
  "kjlahsfdiugkjsfhdlighsfduhoisdjf32893kjahds",
  {
    keepZeroFacets: true
  }
);

export default searchClient