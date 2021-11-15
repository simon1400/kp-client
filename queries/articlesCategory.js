import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const articlesCategory = gql`
  query getCategory($slug: String!) {
    categoryArticles(where: {slug: $slug}) {
      title
      articles{
        title,
        slug
        content
        image {
          url
          previewUrl
          formats
        }
      }
      meta {
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
    }
    ${navQuery}
  }
`

export default articlesCategory
