import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const blogItemQuery = gql`
  query BlogItem($slug: String!) {
    blogs(where: {slug:$slug}) {
      title
      slug
      content
      add_title
      add_content
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

export default blogItemQuery
