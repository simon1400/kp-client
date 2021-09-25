import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

import {
  CATEGORY_PARAMETERS,
  CATEGORY_PRODUCTS,
  GLOBAL_SETTINGS
} from './fragments'

const categoryQuery = gql`
  ${CATEGORY_PARAMETERS}
  ${CATEGORY_PRODUCTS}
  ${GLOBAL_SETTINGS}
  query GetCategory(
    $slug: String!,
    $brandId: [ID],
    $categoryId: [ID],
    $param: [ID],
    $sort: String = "published_at:asc",
    $offset: Int,
    $limit: Int
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
      products(start: $offset, limit: $limit, sort: $sort, where: { _or: [
        {brand: { id: $brandId }},
        {values: { id: $param }}
      ]}) {
        ...CategoryProducts
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
      products(start: $offset, limit: $limit, sort: $sort, where: { _or: [
        {category: { id: $categoryId }},
        {values: { id: $param }}
      ]}) {
        ...CategoryProducts
      }
    }
    global {
      ...GlobalSettings
    }
    ${navQuery}
  }
`

export default categoryQuery
