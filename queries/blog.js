import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const blogQuery = gql`
  query {
    blogs {
      title,
      slug
      content
      image {
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
    }
    ${navQuery}
  }
`

export default blogQuery
