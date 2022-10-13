import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const SEARCH_API = "https://kp-maili-search.hardart.cz"
// const SEARCH_API = "http://89.221.216.23:7700"

const searchClient = instantMeiliSearch(
  SEARCH_API,
  "sdfgsdfghfgjghsghdfhgdfhgdh",
  {
    placeholderSearch: false,
    keepZeroFacets: true
  }
);



export default searchClient