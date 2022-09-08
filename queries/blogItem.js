import { gql } from "@apollo/client";
import navQuery from './nav'

const blogItemQuery = gql`
  query BlogItem($slug: String!) {
    articles(filters: {slug:{eq:$slug}}) {
      data{
        attributes{
          title
          slug
          content
          add_title
          add_content
          image {
            data{
              attributes{
                url
              }
            }
          }
          child(sort: "position:desc"){
            data{
              attributes{
                title
                slug
              }
            }
          }
          cta{
            text
            link
          }
          meta{
            title
            description
          }
          iframe
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
          endTitle
          copyright
        }
      }
    }
    ${navQuery}
  }
`

export default blogItemQuery
