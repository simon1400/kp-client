import { gql } from "@apollo/client";
import navQuery from './nav'

const articlesCategory = gql`
   query getCategory($slug: String!) {
    categoryArticles(filters: {slug: {eq:$slug}}) {
      data{
        attributes{
          title
          articles (sort: "createdAt:desc") {
            data{
              attributes{
                title,
                slug
                content
                image {
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          meta {
            title
            description
          }
        }
        
      }
    }
    global {
      data{
        attributes{
          title_footer
          phone
          email
          address
          copyright
          endTitle
        }
      }
    }
    ${navQuery}
  }
`

export default articlesCategory
