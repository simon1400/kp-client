import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const homepageQuery = gql`
  query {
    homepage {
      title,
      subtitle
      image {
        url
        previewUrl
        formats
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
            url
            previewUrl
            formats
          }
        }
      }
      partners {
        url
        previewUrl
        formats
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
