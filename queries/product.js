import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const productQuery = gql`
  query GetProduct($slug: String!) {
    produkties(where: {slug:$slug}) {
      id
      title
      price
      code
      slug
      content
      guid
      images {
        hash
      }
      relateds {
        title,
        slug,
        price,
        brand {
          title
        },
        images {
          hash
        }
      }
      brand {
  			title
        slug
      }
      category {
  			title
        slug
      }
      Variants {
  			nazev
        price
        id
      }
      meta{
        title
        description
      }
    }
    global {
      title_footer
      phone
      email
      address
      copyright
      ${bannerQuery}
    }
    ${navQuery}
  }
`

export default productQuery
