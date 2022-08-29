import { gql } from "@apollo/client";
import navQuery from './nav'

const notFoundQuery = gql`
  query {
    global {
      data{
        attributes{
          title_footer
          phone
          email
          address
          copyright
          nf_title
          nf_content
        }
      }
      
    }
    ${navQuery}
  }
`

export default notFoundQuery
