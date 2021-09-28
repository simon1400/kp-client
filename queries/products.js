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
    productsCategory: produkties(
      start: $offset,
      limit: $limit,
      sort: $sort,
      where: {
        _or: [
          {
            brand: {
              id: $brandId
            }
          },
          {
            values: {
              id: $param
            }
          }
        ],
        category: {
          slug: $slug
        }
      }) {
      ...CategoryProducts
    }
    productsBrand: produkties(
      start: $offset,
      limit: $limit,
      sort: $sort,
      where: {
        _or: [
          {
            category: {
              id: $categoryId
            }
          },
          {
            values: {
              id: $param
            }
          }
        ],
        brand: {
          slug: $slug
        }
      }) {
      ...CategoryProducts
    }
    productsCatCount: produktiesConnection(where: {
      _or: [
        {brand: { id: $brandId }},
        {values: { id: $param }}
      ],
      category: {
        slug: $slug
      }
    }) {
      aggregate{
        count
      }
    }
    productsBrandCount: produktiesConnection(where: {
      _or: [
        {category: { id: $categoryId }},
        {values: { id: $param }}
      ],
      brand: {
        slug: $slug
      }
    }) {
      aggregate{
        count
      }
    }

  }
`

export default productsQuery
