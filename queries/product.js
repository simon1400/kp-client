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
      images {
        url
        formats
      }
      relateds {
        title,
        slug,
        price,
        brand {
          title
        },
        images {
          url
        }
      }
      brand {
  			title
        slug
      }
      Variants {
  			nazev
        price
        id
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
