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
      id
 			title
      add_title
      sub{
        icon {
          hash
        }
        title
        slug
      }
      content
      filterCategories: brands {
        title
        id
      }
      parameters {
        ...CategoryParameters
      }
      meta{
        title
        description
      }
      image {
        url
      }
    }
    brands(where: {slug:$slug}) {
      id
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
      meta{
        title
        description
      }
      image {
        url
      }
    }
    global {
      ...GlobalSettings
    }
    ${navQuery}
  }
`

export default categoryQuery
