import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

import {
  CATEGORY_PARAMETERS,
  GLOBAL_SETTINGS
} from './fragments'

const categoryQuery = gql`
  ${CATEGORY_PARAMETERS}
  ${GLOBAL_SETTINGS}
  query GetCategory(
    $slug: String!
  ) {
    categories(where: { slug: $slug }) {
 			title
      add_title
      content
      filterCategories: brands {
        title
        id
      }
      parameters {
        ...CategoryParameters
      }
    }
    brands(where: {slug:$slug}) {
 			title
      add_title
      content
      filterCategories: categories {
        title
        id
      }
      parameters {
        ...CategoryParameters
      }
    }
    global {
      ...GlobalSettings
    }
    ${navQuery}
  }
`

export default categoryQuery
