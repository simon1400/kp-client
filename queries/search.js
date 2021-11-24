import { gql } from "@apollo/client";

const searchQuery = gql`
  query GetSearch($search: String) {
    categories(limit: 3, where: {title_contains: $search}) {
      title
      slug
    }
    produkties(limit: 3, where: {
      _or: [
        {title_contains: $search},
        {category: {title_contains: $search}},
        {brand: {title_contains: $search}}
      ]
    }) {
      title
      slug
      category {
        title
      }
      brand {
        title
      }
      images(limit: 1) {
        url
      }
      price
    }
    brands(limit: 3, where: {title_contains: $search}) {
      title
      slug
    }
    blogs (limit: 3, where: {
      _or: [
        {title_contains: $search},
        {content: $search}
      ]
    }) {
      title
      slug
      category{
        slug
      }
      image {
        url
      }
    }
  }
`

export default searchQuery
