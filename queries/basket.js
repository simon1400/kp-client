import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const basketQuery = gql`
  query GetBasket($slug: String!) {
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

export default basketQuery
