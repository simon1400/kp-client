import { gql } from "@apollo/client";

import { CATEGORY_PRODUCTS } from './fragments'

const productsQuery = gql`
  ${CATEGORY_PRODUCTS}
  query GetProducts(
    $slug: String!,
    $brandId: [ID],
    $categoryId: [ID],
    $param: [ID],
    $sort: String = "published_at:asc",
    $offset: Int,
    $limit: Int
  ) {
    produkties(start: $offset, limit: $limit, sort: $sort, where: { _or: [
      {brand: { id: $brandId }},
      {values: { id: $param }}
      {category: { id: $categoryId }}
    ], category: {slug: $slug}}) {
      ...CategoryProducts
    }
    produktiesConnection(where: { _or: [
      {brand: { id: $brandId }},
      {values: { id: $param }},
      {category: { id: $categoryId }}
    ], category: {slug:$slug}}) {
      aggregate{
        count
      }
    }
  }
`

export default productsQuery
