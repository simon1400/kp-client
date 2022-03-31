import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const homepageQuery = gql`
  query {
    homepage {
      title,
      subtitle
      image {
        hash
      },
      Button {
        text,
        link
      },
      products {
        brand,
        text,
        button {
          text
          link
        }
        products {
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
      }
      articles {
        title
        text
        article {
          slug
          category {
            slug
          }
        }
      }
      logo_company {
        image {
          hash
        }
        brands {
          slug
        }
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

export default homepageQuery
