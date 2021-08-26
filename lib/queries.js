import { gql } from "@apollo/client";

export const productsQuery = gql`
  query products {
    produkties {
      title
      slug
      price
      available
      code
      content
      images {
        url
        previewUrl
        formats
      }
      related {
        title
        slug
        price
      }
      brand {
        title
      }
      category {
        title
      }
    }
  }
`;
