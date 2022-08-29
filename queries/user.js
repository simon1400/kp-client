import { gql } from "@apollo/client";
import navQuery from './nav'

const userQuery = gql`
  query user {
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

export default userQuery
